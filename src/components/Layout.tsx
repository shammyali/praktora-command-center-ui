
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={title}
          subtitle={subtitle}
          showBackButton={showBackButton}
          backButtonFallbackPath={backButtonFallbackPath}
        />
        {/* Create a consistent scrollable content area with padding for all pages */}
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
