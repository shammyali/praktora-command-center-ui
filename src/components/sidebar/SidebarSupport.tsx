
import { useState } from "react";
import { MessageSquareIcon, SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SidebarItem from "./SidebarItem";
import AISupportChat from "./AISupportChat";

const SidebarSupport = () => {
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <>
      <Separator className="my-4" />

      <div className="px-3 text-xs font-semibold text-gray-400 mb-2">
        Support & AI Assistance
      </div>
      <nav className="grid gap-1 px-2">
        <SidebarItem 
          icon={MessageSquareIcon} 
          label="Ask P²RA" 
          active={showAIChat}
          onClick={() => setShowAIChat(!showAIChat)}
        />
        <SidebarItem icon={SettingsIcon} label="Settings" />
      </nav>
      
      {showAIChat && (
        <div className="mt-2 px-3">
          <AISupportChat />
        </div>
      )}
    </>
  );
};

export default SidebarSupport;
