
import { PenIcon, ImageIcon, UserIcon, CodeIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ActionCard from "./ActionCard";

const InstantCommandsPanel = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Instant Commands</h2>
      <TooltipProvider>
        <div className="space-y-3">
          <ActionCard 
            icon={PenIcon} 
            title="Quote Launch" 
            color="bg-amber-400" 
            tooltip="Launch a new insurance quote process with smart form pre-filling based on customer history." 
          />
          <ActionCard 
            icon={ImageIcon} 
            title="Initiate Policy Services" 
            color="bg-blue-400" 
            tooltip="Access policy amendment tools including endorsements, cancellations and renewals with one click." 
          />
          <ActionCard 
            icon={UserIcon} 
            title="Log Claim FNOL" 
            color="bg-green-400" 
            tooltip="First Notice of Loss form with automated severity assessment and claim handler assignment." 
          />
          <ActionCard 
            icon={CodeIcon} 
            title="What's Pending" 
            color="bg-purple-400" 
            tooltip="2 quotes, 1 endorsement, and 2 claims have no response in the last 24 hours." 
          />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default InstantCommandsPanel;
