
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { TaskType } from "@/types/taskTypes";
import TaskTypeIcon from "./TaskTypeIcon";
import TaskSourceIcon from "./TaskSourceIcon";

interface TaskHeaderProps {
  task: TaskType;
  expanded: boolean;
  onExpandToggle: () => void;
}

const TaskHeader = ({ task, expanded, onExpandToggle }: TaskHeaderProps) => {
  return (
    <div className="p-4 pb-2 flex flex-row items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {task.type && <TaskTypeIcon type={task.type} />}
          <h3 className="font-medium line-clamp-1">{task.title}</h3>
          {task.isOverdue && (
            <Badge variant="destructive" className="ml-auto">Overdue</Badge>
          )}
          {task.dueToday && (
            <Badge className="ml-auto bg-amber-500">Due Today</Badge>
          )}
          {task.recurring && (
            <Badge variant="outline" className="ml-1">Recurring</Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <TaskSourceIcon source={task.source} />
            <span>Source: {task.source}</span>
          </div>
          
          {task.client && (
            <div className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              <span>{task.client}</span>
            </div>
          )}
          
          {task.linkedTo && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              <span>Linked to: {task.linkedTo}</span>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onExpandToggle}
        className="text-muted-foreground"
      >
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default TaskHeader;
