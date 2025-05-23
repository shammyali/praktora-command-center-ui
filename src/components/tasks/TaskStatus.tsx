
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare } from "lucide-react";
import { TaskType } from "@/types/taskTypes";
import { useToast } from "@/components/ui/use-toast";

interface TaskStatusProps {
  initialStatus: TaskType["status"];
}

const TaskStatus = ({ initialStatus }: TaskStatusProps) => {
  const [status, setStatus] = useState<TaskType["status"]>(initialStatus);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: TaskType["status"]) => {
    setStatus(newStatus);
    toast({
      title: "Status updated",
      description: `Task marked as ${newStatus}`,
    });
  };

  return (
    <div className="flex gap-1">
      {status !== "Done" && (
        <Button 
          variant="outline" 
          size="sm"
          className="h-7" 
          onClick={() => handleStatusChange("Done")}
        >
          <CheckSquare className="h-3.5 w-3.5 mr-1" />
          Complete
        </Button>
      )}
      
      {status !== "In Progress" && status !== "Done" && (
        <Button 
          variant="outline" 
          size="sm"
          className="h-7"
          onClick={() => handleStatusChange("In Progress")}
        >
          Start
        </Button>
      )}
      
      {status === "Done" && (
        <Badge className="bg-green-500 h-7 px-3 flex items-center">
          <CheckSquare className="h-3.5 w-3.5 mr-1" />
          Completed
        </Badge>
      )}
    </div>
  );
};

export default TaskStatus;
