
import { WorkflowItem } from "@/data/workflowsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import WorkflowStageIndicator from "./WorkflowStageIndicator";
import WorkflowActionButton from "./WorkflowActionButton";
import WorkflowAISuggestion from "./WorkflowAISuggestion";
import AgentPerformanceTooltip from "./AgentPerformanceTooltip";

interface WorkflowTableProps {
  items: WorkflowItem[];
  stages: string[];
}

const WorkflowTable = ({ items, stages }: WorkflowTableProps) => {
  // Function to generate AI suggestions based on item data
  const getAISuggestion = (item: WorkflowItem) => {
    if (item.ageInDays > 5) {
      return { 
        type: "warning" as const, 
        message: `⚠️ No update in ${item.ageInDays} days — recommend follow-up.`
      };
    } else if (item.currentStage === "Awaiting Client Confirmation" || item.currentStage === "Sent to Insurer") {
      return { 
        type: "waiting" as const, 
        message: `⏳ Awaiting response for ${item.ageInDays} days.`
      };
    } else if (item.currentStage === "Quote Confirmed") {
      return { 
        type: "success" as const, 
        message: "✅ Client confirmed yesterday, policy not yet issued."
      };
    }
    return null;
  };

  // Mock agent performance data
  const getAgentPerformance = (agentName: string) => {
    // In a real app, these would come from the backend
    const mockData = {
      "Ahmed K.": { active: 4, delayed: 2, closed: 1 },
      "Sara L.": { active: 2, delayed: 0, closed: 3 },
      "Mohammed R.": { active: 5, delayed: 1, closed: 0 },
      "Fatima Q.": { active: 3, delayed: 1, closed: 2 },
      "Hassan Z.": { active: 2, delayed: 0, closed: 1 },
      "Layla M.": { active: 1, delayed: 0, closed: 0 },
      "Omar J.": { active: 6, delayed: 3, closed: 1 },
    };
    return mockData[agentName as keyof typeof mockData] || { active: 0, delayed: 0, closed: 0 };
  };

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Class/Type</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Current Stage</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const aiSuggestion = getAISuggestion(item);
            const agentPerf = getAgentPerformance(item.assignedAgent);
            
            return (
              <TableRow key={item.id} className="group">
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.clientName}</TableCell>
                <TableCell>{item.insuranceClass || item.endorsementType || "—"}</TableCell>
                <TableCell>
                  <AgentPerformanceTooltip 
                    agentName={item.assignedAgent}
                    activeWorkflows={agentPerf.active}
                    delayedWorkflows={agentPerf.delayed}
                    recentlyClosed={agentPerf.closed}
                  >
                    {item.assignedAgent}
                  </AgentPerformanceTooltip>
                </TableCell>
                <TableCell>
                  <WorkflowStageIndicator 
                    currentStage={item.currentStage}
                    allStages={stages}
                  />
                </TableCell>
                <TableCell>
                  {item.ageInDays === 1 ? "1 day" : `${item.ageInDays} days`}
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={item.priority} />
                </TableCell>
                <TableCell className="text-right">
                  <WorkflowActionButton workflowId={item.id} />
                </TableCell>
                {aiSuggestion && (
                  <TableRow className="border-0 group-hover:bg-muted/50">
                    <TableCell colSpan={8} className="p-0 pb-2">
                      <WorkflowAISuggestion 
                        type={aiSuggestion.type} 
                        message={aiSuggestion.message} 
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: 'low' | 'medium' | 'high' }) => {
  switch(priority) {
    case 'high':
      return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
    case 'low':
      return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
    default:
      return null;
  }
};

export default WorkflowTable;
