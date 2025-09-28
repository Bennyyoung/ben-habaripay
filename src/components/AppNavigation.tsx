import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart3, Mail, User, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AppNavigationProps {
  currentView: 'marketing' | 'email';
  onViewChange: (view: 'marketing' | 'email') => void;
}

export function AppNavigation({ currentView, onViewChange }: AppNavigationProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-gray-900">Brutalism</span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1">
            <Button
              variant={currentView === 'marketing' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('marketing')}
              className="flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Marketing
            </Button>
            <Button
              variant={currentView === 'email' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('email')}
              className="flex items-center gap-2"
            >
              <Mail size={16} />
              Email
              <Badge variant="secondary" className="ml-1">24</Badge>
            </Button>
          </nav>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <User size={16} className="text-gray-500" />
            <span className="text-gray-700">{user?.email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
}