
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, Clock, Filter, Plus, Star, SquareCheck } from "lucide-react";
import { useState } from "react";

const TasksHub = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample task data
  const tasks = [
    { 
      id: 1, 
      title: "Review claim documentation", 
      due: "Today, 4:00 PM", 
      priority: "High", 
      assignee: "You", 
      category: "Claims",
      status: "in-progress"
    },
    { 
      id: 2, 
      title: "Verify customer identity", 
      due: "Today, 5:30 PM", 
      priority: "Medium", 
      assignee: "You", 
      category: "KYC",
      status: "in-progress" 
    },
    { 
      id: 3, 
      title: "Update policy details", 
      due: "Tomorrow, 10:00 AM", 
      priority: "Normal", 
      assignee: "Maria L.", 
      category: "Policies",
      status: "pending"
    },
    { 
      id: 4, 
      title: "Schedule client meeting", 
      due: "Tomorrow, 2:00 PM", 
      priority: "High", 
      assignee: "You", 
      category: "Customer Service",
      status: "pending" 
    }
  ];

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    if (activeTab === "my-tasks") return task.assignee === "You";
    if (activeTab === "important") return task.priority === "High";
    if (activeTab === "pending") return task.status === "pending";
    return true;
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Tasks Hub</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-praktora-burgundy hover:bg-praktora-burgundy/90">
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
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">4 tasks due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">16</div>
              <Progress value={67} className="h-2 w-16" />
            </div>
            <p className="text-xs text-muted-foreground">67% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground">Follow up required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">7</div>
            <p className="text-xs text-muted-foreground">2 assigned to you</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="gap-2">
            <CheckSquare className="h-4 w-4" />
            All Tasks
          </TabsTrigger>
          <TabsTrigger value="my-tasks" className="gap-2">
            <SquareCheck className="h-4 w-4" />
            My Tasks
          </TabsTrigger>
          <TabsTrigger value="important" className="gap-2">
            <Star className="h-4 w-4" />
            Important
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-0">
          <div className="divide-y border rounded-md">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">Due: {task.due}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          task.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-xs bg-praktora-burgundy/10 text-praktora-burgundy px-2 py-0.5 rounded-full">{task.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {task.assignee}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No tasks found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default TasksHub;
