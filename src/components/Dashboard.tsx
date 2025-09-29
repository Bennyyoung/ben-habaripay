import React, { useMemo } from 'react';
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react';
import { Layout } from './Layout';
import { Sidebar } from './Sidebar';
import { MetricCard } from './MetricCard';
import { BudgetPlatform } from './BudgetPlatform';
import { TimeFilter } from './TimeFilter';
import {
  LazyAcquisitionChart,
  LazyTrafficSourceChart,
  LazyContactsList,
  SuspenseChart,
  SuspenseContactsList
} from './LazyComponents';

// Memoized metric cards to prevent unnecessary re-renders
const MemoizedMetricCards = React.memo(function MemoizedMetricCards() {
  const metrics = useMemo(() => [
    {
      id: 'total-spend',
      title: "Total Spend",
      value: "$8,765",
      previous: "$15,234",
      progress: "+4.35%",
      isPositive: true,
      icon: <DollarSign size={24} aria-hidden="true" />,
      description: "Marketing campaign spending"
    },
    {
      id: 'visitors',
      title: "Visitors",
      value: "14,321",
      previous: "12,843",
      progress: "+11.01%",
      isPositive: true,
      icon: <Users size={24} aria-hidden="true" />,
      description: "Website unique visitors"
    },
    {
      id: 'acquisition',
      title: "Acquisition",
      value: "1,023",
      previous: "833",
      progress: "+15.03%",
      isPositive: true,
      icon: <Target size={24} aria-hidden="true" />,
      description: "New customer acquisitions"
    },
    {
      id: 'revenue',
      title: "Revenue",
      value: "$18,765",
      previous: "$15,832",
      progress: "+18.5%",
      isPositive: true,
      icon: <TrendingUp size={24} aria-hidden="true" />,
      description: "Total revenue generated"
    }
  ], []);

  return (
    <section aria-labelledby="metrics-heading" className="mb-6">
      <h2 id="metrics-heading" className="sr-only">Key Performance Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            previous={metric.previous}
            progress={metric.progress}
            isPositive={metric.isPositive}
            icon={metric.icon}
            aria-label={`${metric.title}: ${metric.value}, ${metric.progress} change, ${metric.description}`}
          />
        ))}
      </div>
    </section>
  );
});

export function Dashboard() {
  return (
    <Layout
      sidebar={<Sidebar />}
      title="Marketing Dashboard"
      description="Monitor your marketing performance and metrics"
    >
      {/* Page Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
        <TimeFilter />
      </div>

      {/* Metrics Grid */}
      <MemoizedMetricCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <SuspenseChart>
          <LazyAcquisitionChart />
        </SuspenseChart>

        <SuspenseChart>
          <LazyTrafficSourceChart />
        </SuspenseChart>
      </div>

      {/* Budget Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <BudgetPlatform />
        <div className="hidden lg:block"></div> {/* Empty space to maintain grid layout */}
      </div>

      {/* Contacts List */}
      <SuspenseContactsList>
        <LazyContactsList />
      </SuspenseContactsList>
    </Layout>
  );
}