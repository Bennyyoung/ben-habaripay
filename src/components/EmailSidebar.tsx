import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  BarChart3, 
  Building2, 
  FolderOpen, 
  Users, 
  Smartphone, 
  Languages, 
  Puzzle, 
  FileText, 
  Zap,
  Calendar,
  Mail,
  Star,
  Send,
  AlertCircle,
  FileText as Draft,
  Trash2,
  Briefcase,
  Heart,
  UserCheck,
  Building,
  Crown,
  User
} from 'lucide-react';

interface EmailSidebarProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
}

const navigationItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'project', label: 'Project', icon: FolderOpen },
  { id: 'hrm', label: 'HRM', icon: Users },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'components', label: 'Components', icon: Puzzle },
  { id: 'pages', label: 'Pages', icon: FileText },
  { id: 'apps', label: 'Apps', icon: Zap },
  { id: 'calendar', label: 'Calendar', icon: Calendar, isSubItem: true },
  { id: 'email', label: 'Email', icon: Mail, isSubItem: true, isActive: true },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'users', label: 'Users', icon: User },
  { id: 'documentation', label: 'Documentation', icon: FileText }
];

const emailFolders = [
  { id: 'inbox', label: 'Inbox', icon: Mail, count: 24 },
  { id: 'starred', label: 'Starred', icon: Star },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'important', label: 'Important', icon: AlertCircle },
  { id: 'drafts', label: 'Drafts', icon: Draft, count: 30 },
  { id: 'trash', label: 'Trash', icon: Trash2 }
];

const labels = [
  { id: 'work', label: 'Work', icon: Briefcase, color: 'bg-blue-500' },
  { id: 'family', label: 'Family', icon: Heart, color: 'bg-red-500' },
  { id: 'friends', label: 'Friends', icon: UserCheck, color: 'bg-green-500' },
  { id: 'office', label: 'Office', icon: Building, color: 'bg-orange-500' }
];

export function EmailSidebar({ selectedFolder, onFolderSelect }: EmailSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Navigation Section */}
      <div className="p-4 border-b border-gray-100">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  item.isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                } ${item.isSubItem ? 'ml-6' : ''}`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">AB</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">Ari budin</div>
            <div className="text-xs text-gray-500">Web developer</div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
          variant="outline"
          size="sm"
        >
          ✏️ Compose
        </Button>
      </div>

      {/* Email Folders */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <nav className="space-y-1">
            {emailFolders.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => onFolderSelect(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    {folder.label}
                  </div>
                  {folder.count && (
                    <Badge variant="secondary" className="text-xs">
                      {folder.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Labels Section */}
        <div className="p-4 border-t border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Labels
          </h3>
          <nav className="space-y-1">
            {labels.map((label) => {
              return (
                <button
                  key={label.id}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${label.color}`} />
                  {label.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-gray-100">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-2 mb-3">
              <Crown size={16} className="text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 text-sm">Upgrade to Pro</h4>
                <p className="text-xs text-green-700 mt-1">
                  Are you looking for more features? Check out our Pro version.
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              + Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}