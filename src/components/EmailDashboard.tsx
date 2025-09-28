import { useState } from 'react';
import { EmailSidebar } from './EmailSidebar';
import { EmailHeader } from './EmailHeader';
import { EmailList } from './EmailList';
import { ErrorBoundary } from './ErrorBoundary';

export function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');

  return (
    <div className="flex h-screen bg-gray-50">
      <ErrorBoundary>
        <EmailSidebar 
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
        />
      </ErrorBoundary>
      
      <div className="flex-1 flex flex-col min-w-0">
        <ErrorBoundary>
          <EmailHeader 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </ErrorBoundary>
        
        <main className="flex-1 overflow-hidden">
          <ErrorBoundary>
            <EmailList 
              selectedFolder={selectedFolder}
              searchQuery={searchQuery}
              selectedEmail={selectedEmail}
              onEmailSelect={setSelectedEmail}
            />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}