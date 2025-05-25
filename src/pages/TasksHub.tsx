import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  CheckSquare, 
  Clock, 
  Filter, 
  Plus, 
  Star, 
  SquareCheck, 
  Users,
  Building2,
  Tag,
  AlertTriangle,
  Repeat,
  Search
} from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskFilters from "@/components/tasks/TaskFilters";
import { useToast } from "@/components/ui/use-toast";
import TaskCreateModal from "@/components/tasks/TaskCreateModal";
import TaskTypeStats from "@/components/tasks/TaskTypeStats";
import TaskPriorityMatrix from "@/components/tasks/TaskPriorityMatrix";

const TasksHub = () => {
  const [activeTab, setActiveTab] = useState("my-tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Sample task statistics 
  const taskStats = {
    total: 24,
    completed: 16,
    overdue: 3,
    highPriority: 7,
    dueToday: 4,
    completionRate: 67,
  };
  
  const handleCreateTask = () => {
    setShowCreateModal(true);
  };
  
  const handleTaskCreated = () => {
    toast({
      title: "Task created",
      description: "The new task has been added to your task list.",
    });
    setShowCreateModal(false);
  };

  return (
    <Layout>
      <div className="pt-16 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Command Tasks</h1>
            <p className="text-muted-foreground text-sm">
              Execute, track, and manage critical actions across your workflows
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              className="gap-2 bg-praktora-burgundy hover:bg-praktora-burgundy/90"
              onClick={handleCreateTask}
            >
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{taskStats.total}</div>
              <p className="text-xs text-muted-foreground">{taskStats.dueToday} tasks due today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">{taskStats.completed}</div>
                <Progress value={taskStats.completionRate} className="h-2 w-16" />
              </div>
              <p className="text-xs text-muted-foreground">{taskStats.completionRate}% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{taskStats.overdue}</div>
              <p className="text-xs text-muted-foreground">Follow up required</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">{taskStats.highPriority}</div>
              <p className="text-xs text-muted-foreground">2 assigned to you</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tasks..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Tabs defaultValue="my-tasks" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="my-tasks" className="gap-2">
                  <SquareCheck className="h-4 w-4" />
                  My Tasks
                </TabsTrigger>
                <TabsTrigger value="all-tasks" className="gap-2">
                  <CheckSquare className="h-4 w-4" />
                  All Tasks
                </TabsTrigger>
                <TabsTrigger value="by-client" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  By Client
                </TabsTrigger>
                <TabsTrigger value="important" className="gap-2">
                  <Star className="h-4 w-4" />
                  Important
                </TabsTrigger>
                <TabsTrigger value="overdue" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Overdue
                </TabsTrigger>
                <TabsTrigger value="recurring" className="gap-2">
                  <Repeat className="h-4 w-4" />
                  Recurring
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-4 mb-4">
                <TaskFilters 
                  onPriorityChange={setFilterPriority} 
                  onSourceChange={setFilterSource} 
                />
              </div>

              <TabsContent value={activeTab}>
                <TaskList 
                  activeTab={activeTab} 
                  searchQuery={searchQuery} 
                  priorityFilter={filterPriority}
                  sourceFilter={filterSource}
                />
              </TabsContent>
            </Tabs>
          </div>
          
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
        </div>

        <TaskCreateModal 
          open={showCreateModal} 
          onOpenChange={setShowCreateModal} 
          onTaskCreated={handleTaskCreated}
        />
      </div>
    </Layout>
  );
};

export default TasksHub;
