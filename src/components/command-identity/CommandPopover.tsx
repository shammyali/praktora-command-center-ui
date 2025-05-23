
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AvatarTrigger from "./AvatarTrigger";
import IdentitySection from "./IdentitySection";
import ControlsSection from "./ControlsSection";
import IntelligenceSection from "./IntelligenceSection";
import UtilitiesSection from "./UtilitiesSection";
import { useCommandIdentity } from "./CommandIdentityProvider";

const CommandPopover = () => {
  const { 
    isNodeConnected, 
    sessionInfo, 
    aiInfo, 
    darkMode, 
    setDarkMode, 
    notifications, 
    setNotifications 
  } = useCommandIdentity();

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
              sessionTime={sessionInfo.sessionTime}
              geoLocation={sessionInfo.geoLocation}
              ipAddress={sessionInfo.ipAddress}
            />
            
            <ControlsSection
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              notifications={notifications}
              setNotifications={setNotifications}
            />
            
            <IntelligenceSection
              aiSuggestion={aiInfo.aiSuggestion}
              aiAcceptanceRate={aiInfo.aiAcceptanceRate}
              overrideCount={aiInfo.overrideCount}
            />
            
            <UtilitiesSection />
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default CommandPopover;
