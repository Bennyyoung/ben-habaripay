import { 
  BarChart3, 
  Building2, 
 
  ChevronDown, 
  Crown, 
  FileText, 
 
  Globe, 
  Megaphone, 
  Smartphone, 
  Target, 
  Users, 
  Layers,
  FileCode,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';

const navigationItems = [
  { icon: Megaphone, label: 'Marketing', active: true },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Building2, label: 'Business' },
  { icon: Target, label: 'Project' },
  { icon: Users, label: 'HRM' },
  { icon: Smartphone, label: 'Mobile App' },
  { icon: Globe, label: 'Landing page' },
  { icon: Layers, label: 'Components', hasDropdown: true },
  { icon: FileText, label: 'Pages', hasDropdown: true },
  { icon: Settings, label: 'Apps', hasDropdown: true },
  { icon: FileCode, label: 'Content', hasDropdown: true },
  { icon: Users, label: 'Users', hasDropdown: true },
  { icon: FileText, label: 'Documentation', hasDropdown: true },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <span className="font-semibold">Brutalism</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {navigationItems.map((item, index) => (
            <div key={index} className="mb-1">
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                  item.active ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-700'
                }`}
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.hasDropdown && <ChevronDown size={16} className="text-gray-400" />}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={20} className="text-yellow-500" />
            <span className="font-semibold">Upgrade to Pro</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Are you looking for more features? Check out our Pro version.
          </p>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}