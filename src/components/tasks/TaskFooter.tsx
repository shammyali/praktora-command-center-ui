
import { TaskType } from "@/data/tasksData";
import TaskStatus from "./TaskStatus";

interface TaskFooterProps {
  task: TaskType;
}

const TaskFooter = ({ task }: TaskFooterProps) => {
  return (
    <div className="p-2 px-4 gap-x-2 flex flex-row justify-between border-t bg-muted/20">
      <div className="text-xs">
        <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
      </div>
      
      <TaskStatus initialStatus={task.status} />
    </div>
  );
};

export default TaskFooter;
