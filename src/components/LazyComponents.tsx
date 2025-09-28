import React, { Suspense } from 'react';
import { Skeleton } from './ui/skeleton';

// Lazy load heavy components
export const LazyAcquisitionChart = React.lazy(() => 
  import('./AcquisitionChart').then(module => ({ default: module.AcquisitionChart }))
);

export const LazyTrafficSourceChart = React.lazy(() => 
  import('./TrafficSourceChart').then(module => ({ default: module.TrafficSourceChart }))
);

export const LazyContactsList = React.lazy(() => 
  import('./ContactsList').then(module => ({ default: module.ContactsList }))
);

// Loading skeletons
export function ChartSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function ContactsListSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <Skeleton className="h-6 w-24 mb-4" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

// Wrapper components with suspense
export function SuspenseChart({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      {children}
    </Suspense>
  );
}

export function SuspenseContactsList({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ContactsListSkeleton />}>
      {children}
    </Suspense>
  );
}