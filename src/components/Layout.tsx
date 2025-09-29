import React, { useState, createContext, useContext } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a Layout component');
  }
  return context;
};

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <LayoutContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 bg-black opacity-50"></div>
          </div>
        )}

        {/* Sidebar */}
        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed z-50 lg:relative lg:translate-x-0 lg:block
          transition-transform duration-300 ease-in-out
        `}>
          {sidebar || <Sidebar />}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
          {/* Mobile Menu Button */}
          <div className="lg:hidden p-4 bg-white border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mr-2"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Header */}
          {header || <Header />}

          {/* Dashboard Content */}
          <main className={mainClass} role="main">
            <div className={contentWrapperClass}>
              {/* Page Title and Description */}
              {showPageHeader && (title || description) && (
                <div className="mb-6">
                  {title && (
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
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
    </LayoutContext.Provider>
  );
}