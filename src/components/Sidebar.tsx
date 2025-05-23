
import SidebarNav from "./sidebar/SidebarNav";
import SidebarSupport from "./sidebar/SidebarSupport";
import SidebarProfile from "./sidebar/SidebarProfile";

const Sidebar = () => {
  return (
    <div className="flex h-full w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-sidebar">
      <div className="flex-1 overflow-auto py-2 pt-4">
        <SidebarNav />
        <SidebarSupport />
      </div>
      
      <SidebarProfile />
    </div>
  );
};

export default Sidebar;
