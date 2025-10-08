import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { apiClient, type EmailContact } from "../components/api/client";

// Query keys for consistent caching
export const queryKeys = {
  contacts: (params?: any) => ['contacts', params] as const,
  contact: (id: string) => ['contact', id] as const,
} as const;

// Contacts queries
export function useContacts(params: {
  page?: number;
  limit?: number;
  search?: string;
  source?: string;
  isSubscribed?: boolean;
} = {}) {
  return useQuery({
    queryKey: queryKeys.contacts(params),
    queryFn: () => apiClient.getContacts(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useContact(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.contact(id),
    queryFn: () => apiClient.getContact(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Mutations
export function useCreateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (contact: Partial<EmailContact>) => apiClient.createContact(contact),
    onSuccess: () => {
      // Invalidate and refetch contacts list
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, contact }: { id: string; contact: Partial<EmailContact> }) =>
      apiClient.updateContact(id, contact),
    onSuccess: (data, variables) => {
      // Update the contact in cache
      queryClient.setQueryData(queryKeys.contact(variables.id), data);
      // Invalidate contacts list
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteContact(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.contact(id) });
      // Invalidate contacts list
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

// Background refetching hook
export function useBackgroundRefetch() {
  const queryClient = useQueryClient();

  const refetchContacts = () => {
    queryClient.invalidateQueries({ queryKey: ['contacts'] });
  };

  return { refetchContacts };
}