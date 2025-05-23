
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardFooter
} from "@/components/ui/card";
import { TaskType } from "@/data/tasksData";
import TaskPriorityIndicator from "./TaskPriorityIndicator";
import TaskHeader from "./TaskHeader";
import TaskDetails from "./TaskDetails";
import TaskFooter from "./TaskFooter";

interface TaskItemProps {
  task: TaskType;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex">
        {/* Priority indicator */}
        <TaskPriorityIndicator priority={task.priority} />
        
        <div className="flex-1">
          <CardHeader className="p-0">
            <TaskHeader 
              task={task} 
              expanded={expanded}
              onExpandToggle={toggleExpanded}
            />
          </CardHeader>
          
          <CardContent className="p-0">
            <TaskDetails task={task} expanded={expanded} />
          </CardContent>
          
          <CardFooter className="p-0">
            <TaskFooter task={task} />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
