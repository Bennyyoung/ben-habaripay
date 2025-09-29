import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { FaFacebook, FaGoogle, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { BsBing } from 'react-icons/bs';

const platforms = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    amount: '$12,345',
    progress: 80,
    status: 'Remaining',
    color: 'bg-blue-600',
    iconColor: 'text-white'
  },
  {
    name: 'X',
    icon: FaXTwitter,
    amount: '$1,543',
    progress: 85,
    status: 'Remaining',
    color: 'bg-black',
    iconColor: 'text-white'
  },
  {
    name: 'Google',
    icon: FaGoogle,
    amount: '$5,678',
    progress: 67,
    status: 'Remaining',
    color: 'bg-red-500',
    iconColor: 'text-white'
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    amount: '$3,456',
    progress: 21,
    status: 'Remaining',
    color: 'bg-black',
    iconColor: 'text-white'
  },
  {
    name: 'Bing',
    icon: BsBing,
    amount: '$2,098',
    progress: 35,
    status: 'Remaining',
    color: 'bg-blue-500',
    iconColor: 'text-white'
  },
];

export function BudgetPlatform() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Budget by Platform</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform, index) => {
          const IconComponent = platform.icon;
          return (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-8 h-8 ${platform.color} rounded flex items-center justify-center`}>
                <IconComponent className={`w-4 h-4 ${platform.iconColor}`} />
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
          );
        })}
      </CardContent>
    </Card>
  );
}