
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  SendIcon,
  MailIcon,
  ClockIcon,
} from "lucide-react";
import { toast } from "sonner";

const FunnelActions = () => {
  const handleExport = () => {
    toast.success("Export initiated", {
      description: "Your funnel data is being prepared for export."
    });
  };

  const handleSendToRadar = () => {
    toast.success("Sent to P²RA Radar", {
      description: "This funnel data has been sent to P²RA Radar for analysis."
    });
  };

  const handleStartCampaign = () => {
    toast.success("Campaign started", {
      description: "Follow-up campaign has been initiated for drop-offs."
    });
  };

  const handleAutoAssign = () => {
    toast.success("Auto-assign triggered", {
      description: "Quotes stuck > 72h have been auto-assigned to available agents."
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
      <h3 className="text-sm font-semibold mb-4">Funnel Operations</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 justify-center"
          onClick={handleExport}
        >
          <DownloadIcon className="h-4 w-4" />
          Export Drop-Off List
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 justify-center"
          onClick={handleSendToRadar}
        >
          <SendIcon className="h-4 w-4" />
          Send to P²RA Radar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 justify-center"
          onClick={handleStartCampaign}
        >
          <MailIcon className="h-4 w-4" />
          Start Follow-Up Campaign
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 justify-center"
          onClick={handleAutoAssign}
        >
          <ClockIcon className="h-4 w-4" />
          Auto-assign stuck > 72h
        </Button>
      </div>
    </div>
  );
};

export default FunnelActions;
