
import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonFallbackPath?: string;
}

const Layout = ({ 
  children, 
  title, 
  subtitle,
  showBackButton = false,
  backButtonFallbackPath
}: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <Sidebar />
      
      {/* Main content area with fixed header and scrollable content */}
      <div className="flex-1 flex flex-col">
        <Header 
          title={title}
          subtitle={subtitle}
          showBackButton={showBackButton}
          backButtonFallbackPath={backButtonFallbackPath}
        />
        
        {/* Scrollable content area with consistent padding */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
