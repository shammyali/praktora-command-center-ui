
import { Badge } from "@/components/ui/badge";

interface IntelligenceSectionProps {
  aiSuggestion: string;
  aiAcceptanceRate: string;
  overrideCount: number;
}

const IntelligenceSection = ({
  aiSuggestion,
  aiAcceptanceRate,
  overrideCount
}: IntelligenceSectionProps) => {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50/30 to-transparent">
      <h4 className="text-xs font-medium mb-2 text-praktora-burgundy flex items-center gap-1">
        <span className="inline-block w-1 h-1 bg-praktora-burgundy rounded-full"></span>
        System Intelligence Feed
      </h4>
      
      <div className="space-y-2 text-xs">
        <div className="p-2 bg-white/70 rounded border border-gray-100 flex items-start">
          <div className="flex-1">
            <span className="block text-[10px] text-gray-500">Last AI Suggestion:</span>
            <p className="text-xs">{aiSuggestion}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-white/70 rounded border border-gray-100">
            <span className="block text-[10px] text-gray-500">AI Acceptance Rate</span>
            <p className="text-xs font-medium">{aiAcceptanceRate} this week</p>
          </div>
          <div className="p-2 bg-white/70 rounded border border-gray-100">
            <span className="block text-[10px] text-gray-500">Override Count</span>
            <p className="text-xs font-medium">{overrideCount} manual decisions</p>
          </div>
        </div>
        
        <div className="p-2 bg-white/70 rounded border border-gray-100">
          <span className="block text-[10px] text-gray-500">Node Workload</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs">7 Workflows linked</span>
            <Badge className="bg-orange-500 text-[9px]">3 High Priority</Badge>
            <Badge className="bg-red-500 text-[9px]">1 overdue SLA</Badge>
          </div>
        </div>
        
        <p className="text-[10px] text-center italic text-gray-500 mt-2">
          "Node operating at optimal decision velocity."
        </p>
      </div>
    </div>
  );
};

export default IntelligenceSection;
