import { useState } from 'react';
import { Layout } from './Layout';
import { EmailSidebar } from './EmailSidebar';
import { EmailList } from './EmailList';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <Layout
      title="Email Dashboard"
      description="Manage your emails and communication"
      showPageHeader={false}
      contentWrapperClass=""
      mainClass="flex-1 overflow-hidden"
    >
      <div className="flex h-full relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div className="fixed inset-0 bg-black opacity-50"></div>
          </div>
        )}

        {/* EmailSidebar - Custom mobile responsive sidebar */}
        <div className={`
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed z-50 lg:relative lg:translate-x-0 lg:block
          transition-transform duration-300 ease-in-out lg:transition-none
        `}>
          <EmailSidebar
            selectedFolder={selectedFolder}
            onFolderSelect={setSelectedFolder}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        </div>

        {/* EmailList - Takes full width on mobile, shares space on desktop */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Menu Button */}
          <div className="lg:hidden p-4 bg-white border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              <Menu size={20} />
            </Button>
          </div>

          <EmailList
            selectedFolder={selectedFolder}
            searchQuery={searchQuery}
            selectedEmail={selectedEmail}
            onEmailSelect={setSelectedEmail}
          />
        </div>
      </div>
    </Layout>
  );
}