
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
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
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
