
import { useState } from "react";
import { 
  AlertTriangle, ChevronDown, ChevronRight, FileEdit, 
  FileText, RefreshCw
} from "lucide-react";
import { WorkflowItem } from "@/data/workflowsData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import WorkflowTable from "./WorkflowTable";

type WorkflowIconType = "FileText" | "RefreshCw" | "FileEdit" | "AlertTriangle";

interface WorkflowCategoryProps {
  title: string;
  count: number;
  icon: WorkflowIconType;
  items: WorkflowItem[];
  stages: string[];
  defaultOpen?: boolean;
}

const WorkflowCategory = ({ 
  title, 
  count, 
  icon, 
  items,
  stages,
  defaultOpen = false 
}: WorkflowCategoryProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getIcon = () => {
    switch(icon) {
      case "FileText": return <FileText className="h-5 w-5 text-blue-600" />;
      case "RefreshCw": return <RefreshCw className="h-5 w-5 text-green-600" />;
      case "FileEdit": return <FileEdit className="h-5 w-5 text-orange-600" />;
      case "AlertTriangle": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-gray-100 rounded-md">
      <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="font-medium">{title}</span>
          <Badge variant="outline" className="bg-gray-50">
            {count}
          </Badge>
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="animate-accordion-down">
        <WorkflowTable items={items} stages={stages} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WorkflowCategory;
