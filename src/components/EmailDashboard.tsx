import { useState } from 'react';
import { Layout } from './Layout';
import { EmailSidebar } from './EmailSidebar';
import { EmailHeader } from './EmailHeader';
import { EmailList } from './EmailList';

export function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');

  return (
    <Layout
      title="Email Dashboard"
      description="Manage your emails and communication"
      showPageHeader={false}
      contentWrapperClass=""
      mainClass="flex-1 overflow-hidden"
    >
      <div className='flex h-full'>
        <EmailSidebar
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
        />
        <div className="flex-1 flex flex-col min-w-0">
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