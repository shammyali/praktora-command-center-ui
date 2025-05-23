
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from "@/components/ui/card";
import TaskTypeStats from "@/components/tasks/TaskTypeStats";
import TaskPriorityMatrix from "@/components/tasks/TaskPriorityMatrix";

const TasksRightPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskTypeStats />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Priority Matrix</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <TaskPriorityMatrix />
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksRightPanel;
