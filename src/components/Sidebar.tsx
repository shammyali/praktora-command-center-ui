
import SidebarProfile from "./sidebar/SidebarProfile";
import SidebarNav from "./sidebar/SidebarNav";
import SidebarSupport from "./sidebar/SidebarSupport";

const Sidebar = () => {
  return (
    <div className="w-60 bg-slate-50 border-r h-full flex flex-col fixed left-0 top-16 z-40">
      <SidebarProfile />
      <SidebarNav />
      <SidebarSupport />
    </div>
  );
};

export default Sidebar;
