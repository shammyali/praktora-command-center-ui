
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TaskCreateModal from "@/components/tasks/TaskCreateModal";
import TaskStats from "@/components/tasks/TaskStats";
import TasksMainContent from "@/components/tasks/TasksMainContent";
import { TaskStatsType } from "@/types/taskTypes";

const TasksHub = () => {
  const [activeTab, setActiveTab] = useState("my-tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Sample task statistics 
  const taskStats: TaskStatsType = {
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
      <div className="px-6 py-6">
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

        <TaskStats stats={taskStats} />

        <TasksMainContent
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          filterPriority={filterPriority}
          onFilterPriorityChange={setFilterPriority}
          filterSource={filterSource}
          onFilterSourceChange={setFilterSource}
        />

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
