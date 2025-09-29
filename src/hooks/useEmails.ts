import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { emailApi, type EmailApiParams } from '../services/emailApi'
import type { Email } from '../types/email'
import { emailApi, type EmailApiParams } from '../services/emailApi'

export const useEmails = (params: EmailApiParams) => {
  return useQuery({
    queryKey: ['emails', params],
    queryFn: () => emailApi.getEmails(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  })
}

export const useEmail = (id: string) => {
  return useQuery({
    queryKey: ['email', id],
    queryFn: () => emailApi.getEmail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Email> }) =>
      emailApi.updateEmail(id, updates),
    onSuccess: (updatedEmail) => {
      // Update the email in the cache
      queryClient.setQueryData(['email', updatedEmail.id], updatedEmail)

      // Update the email in any emails list queries
      queryClient.setQueriesData({ queryKey: ['emails'] }, (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          emails: oldData.emails.map((email: Email) =>
            email.id === updatedEmail.id ? updatedEmail : email
          ),
        }
      })
    },
  })
}

export const useSearchEmails = (query: string, pagination: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ['search', query, pagination],
    queryFn: () => emailApi.searchEmails(query, pagination),
    enabled: query.length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  })
}