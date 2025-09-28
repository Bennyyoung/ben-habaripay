import { Card, CardContent } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  previous: string;
  progress: string;
  isPositive: boolean;
  icon?: React.ReactNode;
  'aria-label'?: string;
}

export function MetricCard({ 
  title, 
  value, 
  previous, 
  progress, 
  isPositive, 
  icon,
  'aria-label': ariaLabel
}: MetricCardProps) {
  return (
    <Card 
      className="border border-gray-200 hover:shadow-md transition-shadow cursor-default"
      role="article"
      aria-label={ariaLabel || `${title} metric: ${value}`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0 flex-1">
            <p className="text-gray-600 text-sm mb-1 font-medium">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900" aria-live="polite">
              {value}
            </h3>
          </div>
          {icon && (
            <div className="text-green-500 flex-shrink-0 ml-2" aria-hidden="true">
              {icon}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Previous</span>
            <span className="text-gray-500 font-medium">Change</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">{previous}</span>
            <div 
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                isPositive 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-red-700 bg-red-50'
              }`}
              aria-label={`${isPositive ? 'Positive' : 'Negative'} change: ${progress}`}
            >
              {isPositive ? (
                <TrendingUp size={12} aria-hidden="true" />
              ) : (
                <TrendingDown size={12} aria-hidden="true" />
              )}
              <span>{progress}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}