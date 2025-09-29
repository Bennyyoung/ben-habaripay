import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  showPageHeader?: boolean;
  header?: React.ReactNode;
  contentWrapperClass?: string;
  mainClass?: string;
}

export function Layout({
  sidebar,
  children,
  title,
  description,
  showPageHeader = true,
  header,
  contentWrapperClass = "p-4 sm:p-6 max-w-7xl mx-auto",
  mainClass = "flex-1 overflow-auto"
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebar || <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        {header || <Header />}

        {/* Dashboard Content */}
        <main className={mainClass} role="main">
          <div className={contentWrapperClass}>
            {/* Page Title and Description */}
            {showPageHeader && (title || description) && (
              <div className="mb-6">
                {title && (
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                )}
                {description && (
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}
              </div>
            )}

            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}