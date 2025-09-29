import { Search, Settings, Bell, MessageSquare, User, LogOut } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from './AuthContext';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 w-full"
            />
          </div>
        </div>

        {/* Mobile Search Button - Visible only on mobile */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Search size={20} className="text-gray-600" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          {/* Settings - Hidden on mobile */}
          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <Settings size={20} className="text-gray-600" />
          </Button>

          {/* Messages - Hidden on mobile */}
          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <MessageSquare size={20} className="text-gray-600" />
          </Button>

          {/* Notifications - Always visible */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} className="text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs p-0 flex items-center justify-center">
              1
            </Badge>
          </Button>

          {/* User Menu - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500"></Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}