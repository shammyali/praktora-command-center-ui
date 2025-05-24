
import SidebarNav from "./sidebar/SidebarNav";
import SidebarSupport from "./sidebar/SidebarSupport";
import SidebarProfile from "./sidebar/SidebarProfile";

const Sidebar = () => {
  return (
    <div className="flex h-full w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-sidebar">
      {/* Add a logo section at the top */}
      <div className="p-4 border-b border-gray-200">
        <img 
          src="/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png" 
          alt="Praktora Práxis Logo" 
          className="h-12 md:h-14 transition-all duration-500 hover:scale-105" 
        />
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <SidebarNav />
        <SidebarSupport />
      </div>
      
      <SidebarProfile />
    </div>
  );
};

export default Sidebar;
