import { useState, useMemo } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Star, 
  Archive, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  Mic
} from 'lucide-react';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  isImportant: boolean;
  avatar?: string;
  type?: 'affiliate' | 'invitation' | 'feature' | 'ranking' | 'sale' | 'stock';
}

interface EmailListProps {
  selectedFolder: string;
  searchQuery: string;
  selectedEmail: string | null;
  onEmailSelect: (emailId: string | null) => void;
}

// Mock email data
const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'Nuno Affiliate',
    subject: 'Your application to the Nuno Affiliate Network...',
    preview: 'Your application to the Nuno Affiliate Network...',
    time: '8:27 AM',
    isStarred: true,
    isRead: false,
    isImportant: true,
    type: 'affiliate'
  },
  {
    id: '2',
    sender: 'Michael Adams',
    subject: 'Invitation to the company anniversary party...',
    preview: 'Invitation to the company anniversary party...',
    time: '5:17 AM',
    isStarred: true,
    isRead: false,
    isImportant: false,
    type: 'invitation'
  },
  {
    id: '3',
    sender: 'Bunny Cms',
    subject: 'Added a new features: Dinamic database...',
    preview: 'Added a new features: Dinamic database...',
    time: '3:14 AM',
    isStarred: true,
    isRead: false,
    isImportant: false,
    type: 'feature'
  },
  {
    id: '4',
    sender: 'Giant Seo',
    subject: 'Ranking 1st in organic and Local Pack SERPs...',
    preview: 'Ranking 1st in organic and Local Pack SERPs...',
    time: '2:15 AM',
    isStarred: true,
    isRead: false,
    isImportant: false,
    type: 'ranking'
  },
  {
    id: '5',
    sender: 'Tailwind Market',
    subject: 'New sale of Dashmaster - Tailwind Dashboard for $29',
    preview: 'New sale of Dashmaster - Tailwind Dashboard for $29',
    time: '1:27 AM',
    isStarred: false,
    isRead: true,
    isImportant: false,
    type: 'sale'
  },
  {
    id: '6',
    sender: 'Tailwind Market',
    subject: 'New sale of Dashmaster - Tailwind Dashboard for $29',
    preview: 'New sale of Dashmaster - Tailwind Dashboard for $29',
    time: 'Yesterday',
    isStarred: false,
    isRead: true,
    isImportant: false,
    type: 'sale'
  },
  {
    id: '7',
    sender: 'Stock Image',
    subject: 'How did you use these downloads?',
    preview: 'How did you use these downloads?',
    time: 'Yesterday',
    isStarred: true,
    isRead: true,
    isImportant: false,
    type: 'stock'
  }
];

export function EmailList({ selectedFolder, searchQuery, selectedEmail: _selectedEmail, onEmailSelect }: EmailListProps) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Filter emails based on folder and search query
  const filteredEmails = useMemo(() => {
    let emails = mockEmails;
    
    // Filter by folder
    switch (selectedFolder) {
      case 'starred':
        emails = emails.filter(email => email.isStarred);
        break;
      case 'important':
        emails = emails.filter(email => email.isImportant);
        break;
      case 'sent':
        emails = [];
        break;
      case 'drafts':
        emails = [];
        break;
      case 'trash':
        emails = [];
        break;
      default: // inbox
        break;
    }
    
    // Filter by search query
    const query = searchQuery || localSearchQuery;
    if (query) {
      emails = emails.filter(email => 
        email.sender.toLowerCase().includes(query.toLowerCase()) ||
        email.subject.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return emails;
  }, [selectedFolder, searchQuery, localSearchQuery]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(filteredEmails.map(email => email.id));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleSelectEmail = (emailId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmails(prev => [...prev, emailId]);
    } else {
      setSelectedEmails(prev => prev.filter(id => id !== emailId));
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Email List Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Inbox</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        {/* Email Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox 
              checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
              onCheckedChange={handleSelectAll}
              aria-label="Select all emails"
            />
            
            {selectedEmails.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Archive size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Star size={16} />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>1-15 of 155</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No emails found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !email.isRead ? 'bg-blue-50/30' : ''
                } ${selectedEmails.includes(email.id) ? 'bg-blue-50' : ''}`}
                onClick={() => onEmailSelect(email.id)}
              >
                <Checkbox
                  checked={selectedEmails.includes(email.id)}
                  onCheckedChange={(checked: boolean) => handleSelectEmail(email.id, checked)}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  className="flex-shrink-0"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 flex-shrink-0"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <Star 
                    size={16} 
                    className={email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} 
                  />
                </Button>

                <Avatar className={`h-10 w-10 flex-shrink-0 ${getAvatarColor(email.sender)}`}>
                  <AvatarFallback className="text-white text-sm font-medium">
                    {getInitials(email.sender)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className={`font-medium truncate ${!email.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {email.sender}
                    </div>
                    <div className="flex items-center gap-2">
                      {email.type === 'sale' && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                          Sale
                        </Badge>
                      )}
                      {email.isImportant && !email.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                      <Mic size={14} className="text-gray-400" />
                    </div>
                  </div>
                  <div className={`text-sm truncate ${!email.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                    {email.subject}
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex-shrink-0">
                  {email.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}