import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from './ui/pagination';
import { Search, RefreshCw, Mail, Building, User, Calendar, AlertCircle } from 'lucide-react';
import { useDebounce } from './hooks/useDebounce';
import { useContacts, useBackgroundRefetch } from './api/queries';
import { Skeleton } from './ui/skeleton';
import { ErrorBoundary } from './ErrorBoundary';

const ITEMS_PER_PAGE = 10;

export const ContactsList = React.memo(function ContactsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { refetchContacts } = useBackgroundRefetch();

  // Build query parameters
  const queryParams = useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };

    if (debouncedSearchTerm) {
      params.search = debouncedSearchTerm;
    }
    
    if (sourceFilter !== 'all') {
      params.source = sourceFilter;
    }
    
    if (subscriptionFilter !== 'all') {
      params.isSubscribed = subscriptionFilter === 'subscribed';
    }

    return params;
  }, [currentPage, debouncedSearchTerm, sourceFilter, subscriptionFilter]);

  // Fetch contacts with React Query
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  } = useContacts(queryParams);

  const contacts = data?.data || [];
  const pagination = data?.pagination;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleSourceFilterChange = useCallback((value: string) => {
    setSourceFilter(value);
    setCurrentPage(1);
  }, []);

  const handleSubscriptionFilterChange = useCallback((value: string) => {
    setSubscriptionFilter(value);
    setCurrentPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
    refetchContacts();
  }, [refetch, refetchContacts]);

  const getSubscriptionBadgeVariant = (isSubscribed: boolean) => {
    return isSubscribed ? 'default' : 'secondary';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading && !data) {
    return <ContactsListSkeleton />;
  }

  if (isError) {
    return (
        <Card className="border border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="text-center" role="alert">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Failed to load contacts</h3>
                  <p className="text-red-600 text-sm mb-4">
                    {error?.message || 'An unexpected error occurred while fetching contacts.'}
                  </p>
                  <Button 
                    onClick={handleRefresh} 
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    );
  }

  return (
    <ErrorBoundary>
      <Card className="border border-gray-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} className="text-blue-600" />
              Email Contacts
              {pagination && (
                <Badge variant="secondary" className="ml-2">
                  {pagination.total}
                </Badge>
              )}
            </CardTitle>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={isFetching}
              aria-label="Refresh contacts list"
            >
              <RefreshCw size={16} className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                size={18} 
                aria-hidden="true"
              />
              <Input
                placeholder="Search contacts by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
                aria-label="Search contacts"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={sourceFilter} onValueChange={handleSourceFilterChange}>
                <SelectTrigger className="w-full sm:w-40" aria-label="Filter by source">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="email">Email Campaign</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subscriptionFilter} onValueChange={handleSubscriptionFilterChange}>
                <SelectTrigger className="w-full sm:w-36" aria-label="Filter by subscription status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="subscribed">Subscribed</SelectItem>
                  <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

      <CardContent>
        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600 flex items-center justify-between">
          <span>
            Showing {contacts.length} of {pagination?.total || 0} contacts
          </span>
          {isFetching && (
            <span className="flex items-center gap-1 text-blue-600">
              <RefreshCw size={12} className="animate-spin" />
              Updating...
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Company</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Title</TableHead>
                <TableHead className="font-semibold">Source</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Last Engagement</TableHead>
                <TableHead className="font-semibold hidden xl:table-cell">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow 
                  key={contact.id} 
                  className="hover:bg-gray-50 transition-colors"
                  tabIndex={0}
                  role="button"
                  aria-label={`Contact: ${contact.firstName} ${contact.lastName}`}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div 
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <User size={18} className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">
                          {contact.firstName} {contact.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 truncate">
                          <Mail size={12} aria-hidden="true" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      {contact.company && <Building size={12} className="text-gray-400" aria-hidden="true" />}
                      <span className="truncate" title={contact.company || 'No company'}>
                        {contact.company || '-'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    <span className="truncate" title={contact.title || 'No title'}>
                      {contact.title || '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize text-xs">
                      {contact.source || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getSubscriptionBadgeVariant(contact.isSubscribed)}
                      className="text-xs"
                    >
                      {contact.isSubscribed ? 'Subscribed' : 'Unsubscribed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar size={12} aria-hidden="true" />
                      <time dateTime={contact.lastEngagement}>
                        {contact.lastEngagement ? formatDate(contact.lastEngagement) : 'Never'}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-sm text-gray-600">
                    <time dateTime={contact.createdAt}>
                      {formatDate(contact.createdAt)}
                    </time>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {contacts.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {searchTerm || sourceFilter !== 'all' || subscriptionFilter !== 'all' ? (
                  <AlertCircle size={24} className="text-gray-400" />
                ) : (
                  <Mail size={24} className="text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">
                  {searchTerm || sourceFilter !== 'all' || subscriptionFilter !== 'all' 
                    ? 'No contacts match your filters' 
                    : 'No contacts found'
                  }
                </p>
                {(searchTerm || sourceFilter !== 'all' || subscriptionFilter !== 'all') && (
                  <p className="text-sm text-gray-500">
                    Try adjusting your search terms or filters
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Page {currentPage} of {pagination.totalPages}
            </div>
            <nav aria-label="Contacts pagination" className="order-1 sm:order-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-gray-100'}
                      aria-disabled={currentPage === 1}
                      tabIndex={currentPage === 1 ? -1 : 0}
                      size="default"
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={pageNum === currentPage}
                          className="cursor-pointer hover:bg-gray-100"
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={pageNum === currentPage ? 'page' : undefined}
                          size="default"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(pagination.totalPages, currentPage + 1))}
                      className={currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-gray-100'}
                      aria-disabled={currentPage === pagination.totalPages}
                      tabIndex={currentPage === pagination.totalPages ? -1 : 0}
                      size="default"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </nav>
          </div>
        )}
      </CardContent>
    </Card>
    </ErrorBoundary>
  );
});

function ContactsListSkeleton() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Skeleton className="h-10 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-48 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}