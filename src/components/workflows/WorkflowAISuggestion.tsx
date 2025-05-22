
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowAISuggestionProps {
  type: "warning" | "waiting" | "success";
  message: string;
}

const WorkflowAISuggestion = ({ type, message }: WorkflowAISuggestionProps) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-amber-500" />;
      case "waiting":
        return <Clock className="h-3 w-3 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      default:
        return <AlertTriangle className="h-3 w-3 text-amber-500" />;
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-1 text-xs py-1 mt-1 pl-1",
      type === "warning" ? "text-amber-700" : 
      type === "waiting" ? "text-blue-700" : 
      "text-green-700"
    )}>
      {getIcon()}
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

export default WorkflowAISuggestion;
