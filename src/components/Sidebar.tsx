
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  SearchIcon, 
  HomeIcon, 
  FolderIcon, 
  FileTextIcon,
  UsersIcon,
  HistoryIcon,
  SettingsIcon,
  HelpCircleIcon,
  MessageCircleIcon
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string | number;
  dots?: number;
}

const SidebarItem = ({ icon: Icon, label, active, badge, dots }: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent font-medium text-[#9C2D55]"
      )}
    >
      <Icon className={cn("h-5 w-5", active && "text-[#9C2D55]")} />
      <span className="flex-grow text-left">{label}</span>
      {dots && (
        <div className="flex gap-1 ml-2">
          {Array.from({ length: dots }).map((_, i) => (
            <span 
              key={i} 
              className="h-2 w-2 rounded-full bg-green-500 animate-pulse-slow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      )}
      {badge && (
        <span className={cn(
          "ml-auto rounded-full px-2 py-0.5 text-xs",
          typeof badge === "string" && badge.toLowerCase() === "new" 
            ? "bg-blue-100 text-blue-800" 
            : "bg-gray-100 text-gray-800"
        )}>
          {badge}
        </span>
      )}
    </Button>
  );
};

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-200 bg-sidebar">
      <div className="flex items-center gap-2 px-4 py-2">
        <SearchIcon className="h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search"
          className="h-9 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem icon={HomeIcon} label="Dashboard" active />
          <SidebarItem icon={FolderIcon} label="Live Workflows" badge={7} />
          <SidebarItem icon={MessageCircleIcon} label="WhatsApp" />
          <SidebarItem icon={FileTextIcon} label="Active Enquiries" dots={3} />
          <SidebarItem icon={UsersIcon} label="Policyholders" badge="NEW" />
          <SidebarItem icon={HistoryIcon} label="History" />
        </nav>

        <Separator className="my-4" />

        <div className="px-3 text-xs font-semibold text-gray-400 mb-2">
          Settings & Help
        </div>
        <nav className="grid gap-1 px-2">
          <SidebarItem icon={SettingsIcon} label="Settings" />
          <SidebarItem icon={HelpCircleIcon} label="Help" />
        </nav>
      </div>
      
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-praktora-burgundy text-white flex items-center justify-center font-medium">
            BP
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Broker Profile</span>
            <span className="text-xs text-gray-500">broker@praktora.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
