
import { Progress } from "@/components/ui/progress";

const TaskTypeStats = () => {
  // Sample data for task type distribution
  const taskTypes = [
    { type: "Follow-up", count: 12, percentage: 50 },
    { type: "Call", count: 5, percentage: 21 },
    { type: "Document", count: 4, percentage: 17 },
    { type: "Upload", count: 2, percentage: 8 },
    { type: "Meeting", count: 1, percentage: 4 },
  ];
  
  return (
    <div className="space-y-3">
      {taskTypes.map((type) => (
        <div key={type.type} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{type.type}</span>
            <span className="text-muted-foreground">{type.count}</span>
          </div>
          <Progress value={type.percentage} className="h-1.5" />
        </div>
      ))}
    </div>
  );
};

export default TaskTypeStats;
