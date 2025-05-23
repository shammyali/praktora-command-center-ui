
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TaskStatsType } from "@/types/taskTypes";

interface TaskStatsProps {
  stats: TaskStatsType;
}

const TaskStats = ({ stats }: TaskStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">{stats.dueToday} tasks due today</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">{stats.completed}</div>
            <Progress value={stats.completionRate} className="h-2 w-16" />
          </div>
          <p className="text-xs text-muted-foreground">{stats.completionRate}% completion rate</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-500">{stats.overdue}</div>
          <p className="text-xs text-muted-foreground">Follow up required</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-500">{stats.highPriority}</div>
          <p className="text-xs text-muted-foreground">2 assigned to you</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
