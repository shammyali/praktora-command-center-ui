
import { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AvatarTrigger from "./command-identity/AvatarTrigger";
import IdentitySection from "./command-identity/IdentitySection";
import ControlsSection from "./command-identity/ControlsSection";
import IntelligenceSection from "./command-identity/IntelligenceSection";
import UtilitiesSection from "./command-identity/UtilitiesSection";

const CommandIdentityTrigger = () => {
  const [isNodeConnected, setIsNodeConnected] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const sessionTime = "01h 42m active";
  const ipAddress = "192.168.1.X";
  const geoLocation = "DXB Server";
  
  const aiSuggestion = "Drafted renewal quote for MI002 @ 13:41";
  const aiAcceptanceRate = "87%";
  const overrideCount = 2;
  
  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <AvatarTrigger isConnected={isNodeConnected} />
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-xs space-y-1">
              <p className="font-medium">P²RA Command Node: You</p>
              <p className="text-muted-foreground">Tap for session controls and identity diagnostics</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <PopoverContent className="w-80 p-0 backdrop-blur-md bg-white/90 border border-gray-200/50 shadow-lg rounded-lg overflow-hidden" align="end">
          <div className="grid grid-cols-1 divide-y divide-gray-100/50">
            <IdentitySection 
              name="Shammy Ali"
              role="Execution Operator"
              isConnected={isNodeConnected}
              sessionTime={sessionTime}
              geoLocation={geoLocation}
              ipAddress={ipAddress}
            />
            
            <ControlsSection
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              notifications={notifications}
              setNotifications={setNotifications}
            />
            
            <IntelligenceSection
              aiSuggestion={aiSuggestion}
              aiAcceptanceRate={aiAcceptanceRate}
              overrideCount={overrideCount}
            />
            
            <UtilitiesSection />
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default CommandIdentityTrigger;
