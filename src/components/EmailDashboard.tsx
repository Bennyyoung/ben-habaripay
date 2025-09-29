import { useState } from 'react';
import { EmailSidebar } from './EmailSidebar';
import { EmailHeader } from './EmailHeader';
import { EmailList } from './EmailList';

export function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');

  return (
    <div className="flex h-screen bg-gray-50">
        <EmailSidebar 
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
        />
      
      <div className="flex-1 flex flex-col min-w-0">
          <EmailHeader 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        
        <main className="flex-1 overflow-hidden">
            <EmailList 
              selectedFolder={selectedFolder}
              searchQuery={searchQuery}
              selectedEmail={selectedEmail}
              onEmailSelect={setSelectedEmail}
            />
        </main>
      </div>
    </div>
  );
}