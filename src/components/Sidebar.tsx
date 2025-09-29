import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  Calendar,
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
  Settings,
  Mail,
  FileSpreadsheet,
  PieChart,
  Layout
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
  {
    icon: Settings,
    label: 'Apps',
    hasDropdown: true,
    subItems: [
      { icon: Calendar, label: 'Calendar' },
      { icon: Mail, label: 'Email' },
      { icon: FileSpreadsheet, label: 'Invoice' },
      { icon: PieChart, label: 'Charts' },
      { icon: Layout, label: 'Widgets' }
    ]
  },
  { icon: FileCode, label: 'Content', hasDropdown: true },
  { icon: Users, label: 'Users', hasDropdown: true },
  { icon: FileText, label: 'Documentation', hasDropdown: true },
];

export function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleSubItemClick = (subItemLabel: string) => {
    if (subItemLabel === 'Email') {
      navigate('/email');
    }
    // Add more navigation cases here for other subItems if needed
  };

  const handleMainItemClick = (label: string) => {
    if (label === 'Marketing') {
      navigate('/');
    }
    // Add more navigation cases here for other main items if needed
  };

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
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleDropdown(item.label);
                  } else {
                    handleMainItemClick(item.label);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                  item.active ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-700'
                }`}
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      openDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Render subItems if dropdown is open */}
              {item.hasDropdown && item.subItems && openDropdown === item.label && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubItemClick(subItem.label)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <subItem.icon size={16} />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
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