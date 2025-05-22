
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

interface WorkflowTableProps {
  items: WorkflowItem[];
  stages: string[];
}

const WorkflowTable = ({ items, stages }: WorkflowTableProps) => {
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
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.clientName}</TableCell>
              <TableCell>{item.insuranceClass || item.endorsementType || "—"}</TableCell>
              <TableCell>{item.assignedAgent}</TableCell>
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
            </TableRow>
          ))}
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
