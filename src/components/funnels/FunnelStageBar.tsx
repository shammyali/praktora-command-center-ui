
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FunnelStageBarProps {
  stage: string;
  count: number;
  previousCount?: number;
  trend: number;
  percentage: number;
  dropPercentage: number;
  maxCount: number;
  isLastStage?: boolean;
  onClick: () => void;
}

const FunnelStageBar = ({
  stage,
  count,
  previousCount,
  trend,
  percentage,
  dropPercentage,
  maxCount,
  isLastStage,
  onClick
}: FunnelStageBarProps) => {
  const widthPercentage = (count / maxCount) * 100;
  
  return (
    <div className="mb-3 group">
      <div className="flex items-center mb-1 cursor-pointer" onClick={onClick}>
        <div className="w-36 pr-3 text-sm font-medium">{stage}</div>
        <div 
          className="h-8 relative flex items-center rounded-md group-hover:opacity-90 transition-opacity"
          style={{ width: `${widthPercentage}%` }}
        >
          {/* Bar background with gradient based on drop percentage */}
          <div 
            className={cn(
              "absolute inset-0 rounded-md transition-all duration-300",
              dropPercentage > 25 ? "bg-gradient-to-r from-red-500/20 to-red-400/10" : 
              dropPercentage > 15 ? "bg-gradient-to-r from-amber-500/20 to-amber-400/10" : 
              "bg-gradient-to-r from-green-500/20 to-green-400/10"
            )}
          ></div>
          
          {/* Count and percent display */}
          <div className="z-10 flex items-center justify-between w-full px-3">
            <span className="font-medium text-sm">{count.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
          </div>
          
          {/* Drop zone visualization */}
          {!isLastStage && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
              <div className="relative">
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center",
                  dropPercentage > 25 ? "bg-red-500" : 
                  dropPercentage > 15 ? "bg-amber-500" : 
                  "bg-green-500"
                )}>
                  <span className="text-white text-xs font-medium">
                    {dropPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Trend indicator */}
        <div className="ml-3 flex items-center">
          {trend > 0 ? (
            <ArrowUpIcon className="h-3 w-3 text-green-500" />
          ) : trend < 0 ? (
            <ArrowDownIcon className="h-3 w-3 text-red-500" />
          ) : null}
          <span className={cn(
            "text-xs ml-1",
            trend > 0 ? "text-green-500" : 
            trend < 0 ? "text-red-500" : 
            "text-gray-400"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        </div>
      </div>
      
      {/* Drop line to next stage (not for last stage) */}
      {!isLastStage && (
        <div className="flex ml-36 relative">
          <div className={cn(
            "h-3 border-r border-dashed border-gray-300",
            dropPercentage > 25 ? "border-red-300" : 
            dropPercentage > 15 ? "border-amber-300" : 
            "border-green-300"
          )}></div>
        </div>
      )}
    </div>
  );
};

export default FunnelStageBar;
