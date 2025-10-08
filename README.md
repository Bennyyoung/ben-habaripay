# Marketing Dashboard

A modern marketing analytics dashboard built with React, TypeScript, and Tailwind CSS. Features real-time data fetching, advanced filtering, pagination, and comprehensive caching strategies.

## Features

- **Authentication**: Token-based authentication with localStorage persistence
- **Data Management**: Real-time data fetching with TanStack Query (React Query)
- **Search & Filtering**: Debounced search, multi-dimensional filtering
- **Pagination**: Client-side pagination with URL state management
- **Performance**: Lazy loading, memoization, background refetching
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## API Integration

The application integrates with the email list API at `http://email-list-api-3.onrender.com` for contact management.

### Data Fetching Strategy

**Library Choice: TanStack Query (React Query)**
- Chosen for its excellent caching, background refetching, and optimistic updates
- Provides built-in loading states, error handling, and request deduplication
- Supports advanced features like infinite queries and mutations

**Caching Strategy:**
- **Stale Time**: 5 minutes - Data remains fresh without refetching
- **Cache Time**: 10 minutes - Data stays in memory for quick access
- **Background Refetch**: Disabled on window focus, enabled on reconnect
- **Query Key Strategy**: Structured keys for selective cache invalidation

## Pagination Approach

**Client-Side Pagination** was chosen for this implementation:

**Why Client-Side?**
- Better user experience with instant filtering and sorting
- Reduced server load for smaller datasets
- Simpler implementation with the existing API structure
- Maintains scroll position and selection state

**Implementation:**
- API handles pagination parameters (`page`, `limit`)
- Client maintains current page state
- Filters reset pagination to page 1
- Previous data is kept during loading for smooth transitions

**Trade-offs:**
- ✅ Instant response to filters
- ✅ Better UX for browsing
- ❌ Initial load time for large datasets
- ❌ Memory usage grows with data size

*For large datasets (>10k records), server-side pagination would be preferred.*

## Performance Optimizations

### 1. Component Optimizations
- **React.memo**: Prevents unnecessary re-renders of expensive components (MetricCards, ContactsList)
- **useCallback**: Memoizes event handlers to prevent child re-renders
- **useMemo**: Caches computed values like filtered data and query parameters
- **Error Boundaries**: Isolate component failures to prevent cascade errors

### 2. Loading Strategies
- **Lazy Loading**: Charts and data tables load on demand with React.lazy()
- **Code Splitting**: Component-based splitting reduces initial bundle size
- **Skeleton Loading**: Improves perceived performance during data fetching
- **Progressive Enhancement**: Core functionality loads first, enhancements follow

### 3. Data Fetching
- **Debounced Search**: 300ms delay reduces API calls and improves UX
- **Request Deduplication**: TanStack Query prevents duplicate requests automatically
- **Background Refetching**: Updates data without interrupting user interactions
- **Intelligent Retry**: Exponential backoff with conditional retry logic
- **Placeholder Data**: keepPreviousData prevents loading states during pagination

### 4. Caching Strategy
- **Multi-level Caching**: TanStack Query cache + browser localStorage
- **Smart Invalidation**: Targeted cache updates on mutations preserve unrelated data
- **Stale-While-Revalidate**: Shows cached data while fetching updates in background
- **Garbage Collection**: Automatic cleanup of unused cached data after 10 minutes

### 5. UX Performance
- **Optimistic Updates**: Immediate UI feedback for user actions
- **Focus Management**: Maintains accessibility during dynamic content changes
- **Responsive Images**: Proper loading states and fallbacks
- **Keyboard Navigation**: Full keyboard accessibility with proper focus indicators

## Architecture Decisions

### State Management
- **TanStack Query** for server state (API data, caching)
- **React Context** for authentication state
- **Local useState** for UI state (filters, modals)

### Error Handling
- Retry logic with exponential backoff
- Graceful degradation for network failures  
- User-friendly error messages
- Fallback UI components

### TypeScript Integration
- Strict type checking enabled
- API response types defined
- Generic query hooks for type safety
- Interface segregation for better maintainability

## Accessibility Features

### Screen Reader Support
- **Semantic HTML**: Proper use of headings, landmarks, and ARIA roles
- **ARIA Labels**: Descriptive labels for interactive elements and dynamic content
- **Live Regions**: aria-live announcements for status updates and data changes
- **Alternative Text**: Meaningful descriptions for icons and visual indicators

### Keyboard Navigation
- **Tab Order**: Logical focus flow through interactive elements
- **Keyboard Shortcuts**: Escape key handling for modals and overlays
- **Focus Management**: Proper focus trapping and restoration
- **Skip Links**: Easy navigation for screen reader users

### Visual Accessibility
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Indicators**: Clear visual focus states for all interactive elements
- **Responsive Design**: Content reflows properly at all zoom levels up to 200%
- **Motion Preferences**: Respects user's reduced motion preferences

### Error Handling
- **Error Boundaries**: Graceful failure handling with recovery options
- **Form Validation**: Clear error messages with proper associations
- **Loading States**: Accessible loading indicators and skeleton screens
- **Status Updates**: Non-intrusive notifications for system status

## Assumptions

1. **API Reliability**: The email list API is generally stable with occasional network issues handled gracefully
2. **Data Size**: Optimized for datasets under 10k records (client-side pagination approach)
3. **Browser Support**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+) with ES6+ support
4. **Network**: Decent network conditions for background refetching, with offline handling
5. **User Behavior**: Users typically filter/search rather than browse all data sequentially
6. **Accessibility**: Users may rely on screen readers or keyboard navigation
7. **Device Usage**: Primary desktop usage with mobile/tablet responsive support
8. **Data Freshness**: 5-minute stale time is acceptable for marketing dashboard data

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Login with demo credentials:
   - Email: `demo@brutalism.com`
   - Password: `demo123`

## Tech Stack

- **React 18** with TypeScript
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library
- **React Hook Form** for form handling
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── api/           # API client and query hooks
│   ├── ui/            # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   └── ...            # Feature-specific components
├── styles/            # Global styles and Tailwind config
└── App.tsx           # Main application component
```