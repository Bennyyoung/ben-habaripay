import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Settings, 
  HelpCircle, 
  Bell, 
  MessageSquare,
  User
} from 'lucide-react';

interface EmailHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EmailHeader({ searchQuery, onSearchChange }: EmailHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18}
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              aria-label="Search emails"
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
            aria-label="Settings"
          >
            <Settings size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
            aria-label="Help"
          >
            <HelpCircle size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
            aria-label="Messages"
          >
            <MessageSquare size={18} />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center"
              variant="destructive"
            >
              3
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs p-0 flex items-center justify-center"
            >
              !
            </Badge>
          </Button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 ml-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User avatar" />
              <AvatarFallback className="bg-blue-500 text-white text-sm">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}