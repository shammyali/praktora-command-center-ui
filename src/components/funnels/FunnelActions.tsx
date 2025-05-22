
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Radar, 
  MessageCircle, 
  Clock, 
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const ExportDropdown = () => {
  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}...`, {
      description: "Your export will be ready in a few moments."
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleExport("CSV")}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("PDF")}>
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("Excel")}>
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FunnelActions = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const handleRadarAction = () => {
    toast.success("Sent to P²RA Radar", {
      description: "The drop-off data has been sent to P²RA Radar for further analysis."
    });
  };
  
  const handleFollowUpAction = () => {
    toast.success("Follow-up campaign initiated", {
      description: "A new follow-up campaign has been created for the selected leads."
    });
  };
  
  const handleAutoAssignAction = () => {
    toast.success("Auto-assignment activated", {
      description: "Quotes stuck for more than 72 hours will now be automatically assigned."
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold mb-4">Funnel Actions</h3>
      
      <div className="flex flex-wrap gap-2">
        <ExportDropdown />
        
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={handleRadarAction}
        >
          <Radar className="w-4 h-4 mr-2" />
          Send to P²RA Radar
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={handleFollowUpAction}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Start Follow-Up Campaign
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={handleAutoAssignAction}
        >
          <Clock className="w-4 h-4 mr-2" />
          Auto-assign quotes &gt;72h
        </Button>
      </div>
    </div>
  );
};

export default FunnelActions;
