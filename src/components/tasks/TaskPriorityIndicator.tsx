
import { TaskType } from "@/data/tasksData";

interface TaskPriorityIndicatorProps {
  priority: TaskType["priority"];
}

const TaskPriorityIndicator = ({ priority }: TaskPriorityIndicatorProps) => {
  const priorityColorMap = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    normal: "bg-blue-500"
  };

  return (
    <div className={`w-1 h-full ${priorityColorMap[priority]}`} />
  );
};

export default TaskPriorityIndicator;
