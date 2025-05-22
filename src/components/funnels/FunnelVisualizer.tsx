
import { useMemo, useState } from "react";
import { FunnelData } from "@/data/funnelsData";
import FunnelStageBar from "./FunnelStageBar";
import { toast } from "sonner";

interface FunnelVisualizerProps {
  data: FunnelData;
  showComparison: boolean;
  showAbsoluteValues: boolean;
}

const FunnelVisualizer = ({ data, showComparison, showAbsoluteValues }: FunnelVisualizerProps) => {
  const maxCount = useMemo(() => {
    return Math.max(...data.stages.map(stage => stage.count));
  }, [data.stages]);
  
  const handleStageClick = (stageName: string, count: number) => {
    toast.info(`Viewing ${count} items at ${stageName} stage`, {
      description: `This would open a filtered list of the ${count} items at the ${stageName} stage.`
    });
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{data.class}</h3>
        <p className="text-sm text-muted-foreground">
          {data.stages[0].count} enquiries → {data.stages[data.stages.length - 1].count} settlements
          <span className="ml-2 text-xs px-2 py-0.5 bg-muted rounded-full">
            {((data.stages[data.stages.length - 1].count / data.stages[0].count) * 100).toFixed(1)}% conversion
          </span>
        </p>
      </div>
      
      <div className="mt-6">
        {data.stages.map((stage, index) => {
          // Calculate percentage of flow and drop percentage
          const percentage = showAbsoluteValues 
            ? (stage.count / maxCount) * 100
            : index === 0 
              ? 100 
              : (stage.count / data.stages[0].count) * 100;
              
          const dropPercentage = index < data.stages.length - 1 
            ? ((stage.count - data.stages[index + 1].count) / stage.count) * 100
            : 0;
            
          return (
            <FunnelStageBar 
              key={stage.name}
              stage={stage.name}
              count={stage.count}
              previousCount={showComparison ? stage.previousCount : undefined}
              trend={stage.trend}
              percentage={percentage}
              dropPercentage={dropPercentage}
              maxCount={maxCount}
              isLastStage={index === data.stages.length - 1}
              onClick={() => handleStageClick(stage.name, stage.count)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FunnelVisualizer;
