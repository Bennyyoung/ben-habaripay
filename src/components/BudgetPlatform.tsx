import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

const platforms = [
  { 
    name: 'Facebook', 
    icon: '📘', 
    amount: '$12,345', 
    progress: 80, 
    status: 'Remaining',
    color: 'bg-green-500'
  },
  { 
    name: 'X', 
    icon: '🐦', 
    amount: '$1,543', 
    progress: 85, 
    status: 'Remaining',
    color: 'bg-green-500'
  },
  { 
    name: 'Google', 
    icon: '🔍', 
    amount: '$5,678', 
    progress: 67, 
    status: 'Remaining',
    color: 'bg-green-500'
  },
  { 
    name: 'TikTok', 
    icon: '🎵', 
    amount: '$3,456', 
    progress: 21, 
    status: 'Remaining',
    color: 'bg-red-500'
  },
  { 
    name: 'Bing', 
    icon: '🔍', 
    amount: '$2,098', 
    progress: 35, 
    status: 'Remaining',
    color: 'bg-orange-500'
  },
];

export function BudgetPlatform() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Budget by Platform</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span>{platform.icon}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{platform.name}</span>
                <span className="font-medium">{platform.progress}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="text-green-600">{platform.status}</span>
                <span>{platform.amount}</span>
              </div>
              <Progress 
                value={platform.progress} 
                className="h-2"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}