
import { formatDistanceToNow } from "date-fns";
import { TaskType } from "@/data/tasksData";

interface TaskDetailsProps {
  task: TaskType;
  expanded: boolean;
}

const TaskDetails = ({ task, expanded }: TaskDetailsProps) => {
  if (!expanded) return null;

  return (
    <div className="px-4 pt-0 pb-2 text-sm">
      <div className="border-t pt-2 mt-1 mb-2">
        <p>{task.notes}</p>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground border-t pt-2">
        <div className="flex justify-between">
          <span>
            Created by {task.createdBy} {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </span>
          {task.updatedAt && (
            <span>
              Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
            </span>
          )}
        </div>
        
        {task.source === "P²RA AI" && (
          <div className="mt-2 p-2 bg-praktora-burgundy/10 rounded text-xs italic">
            "This task was created by P²RA to ensure workflow continuity."
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
