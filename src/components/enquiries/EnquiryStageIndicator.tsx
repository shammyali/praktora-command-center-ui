
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface EnquiryStageIndicatorProps {
  status: string;
  quoteSent: boolean;
  policyIssued: boolean;
}

const EnquiryStageIndicator = ({ 
  status,
  quoteSent,
  policyIssued
}: EnquiryStageIndicatorProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Define all stages in the enquiry process
  const allStages = ['Enquiry', 'In Process', 'Quote Ready', 'Quoted', 'Awaiting Client', 'Policy Issued'];
  
  // Map the current status to a stage in the process
  const getStageFromStatus = (status: string): string => {
    if (status === 'Awaiting Client Confirmation') return 'Awaiting Client';
    if (status === 'Draft') return 'In Process';
    if (status === 'Lost') return 'Enquiry'; // Show at the beginning for lost enquiries
    return status;
  };
  
  const currentStage = policyIssued ? 'Policy Issued' : getStageFromStatus(status);
  const currentIndex = allStages.indexOf(currentStage);
  const progress = Math.round(((currentIndex + 1) / allStages.length) * 100);
  
  const getBadgeColor = () => {
    if (policyIssued) return "bg-green-600 hover:bg-green-700";
    if (status === 'Lost') return "bg-red-500 hover:bg-red-600";
    if (progress < 33) return "bg-blue-600 hover:bg-blue-700";
    if (progress < 66) return "bg-amber-500 hover:bg-amber-600";
    return "bg-green-600 hover:bg-green-700";
  };

  return (
    <div className="flex flex-col gap-1">
      <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge className={cn(getBadgeColor(), "hover:cursor-pointer")}>
              {currentStage}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-0" side="right" sideOffset={5}>
          <div className="p-3">
            <h4 className="mb-2 font-medium">Enquiry Progress</h4>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span>Stage {currentIndex + 1} of {allStages.length}</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="mb-3">
              <Progress value={progress} className="h-2" />
            </div>
            <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto text-xs">
              {allStages.map((stage, index) => (
                <li key={stage} className="flex items-center gap-1">
                  <span className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full",
                    index < currentIndex ? "bg-green-500" : 
                    index === currentIndex ? getBadgeColor().split(' ')[0] : "bg-gray-300"
                  )} />
                  <span className={cn(
                    index === currentIndex ? "font-medium" : "text-gray-600"
                  )}>
                    {stage}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
      <Progress 
        value={progress} 
        className="h-1 w-full" 
        indicatorClassName={cn(
          getBadgeColor().split(' ')[0],
          "transition-all duration-500"
        )}
      />
    </div>
  );
};

export default EnquiryStageIndicator;
