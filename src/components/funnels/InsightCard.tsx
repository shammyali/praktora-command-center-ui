
import { ArrowRightIcon } from "lucide-react";
import { InsightCard as InsightCardType } from "@/data/funnelsData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InsightCardProps {
  insight: InsightCardType;
}

const InsightCard = ({ insight }: InsightCardProps) => {
  const handleActionClick = () => {
    toast.info(`Action initiated: ${insight.action}`, {
      description: `This would normally trigger the "${insight.action}" workflow.`
    });
  };
  
  return (
    <div className={cn(
      "p-4 border rounded-lg mb-3 animate-fade-in",
      insight.type === "warning" ? "border-red-200 bg-red-50" :
      insight.type === "success" ? "border-green-200 bg-green-50" :
      "border-blue-200 bg-blue-50"
    )}>
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-sm">{insight.title}</h4>
        {insight.metric && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded",
            insight.type === "warning" ? "bg-red-100 text-red-700" :
            insight.type === "success" ? "bg-green-100 text-green-700" :
            "bg-blue-100 text-blue-700"
          )}>
            {insight.metric}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-600">{insight.description}</p>
      <div className="mt-3 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-xs p-0 h-auto",
            insight.type === "warning" ? "text-red-700 hover:text-red-800" :
            insight.type === "success" ? "text-green-700 hover:text-green-800" :
            "text-blue-700 hover:text-blue-800"
          )}
          onClick={handleActionClick}
        >
          {insight.action}
          <ArrowRightIcon className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default InsightCard;
