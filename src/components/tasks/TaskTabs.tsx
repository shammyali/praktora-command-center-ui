
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckSquare, 
  Clock, 
  Star, 
  SquareCheck, 
  Building2,
  AlertTriangle,
  Repeat
} from "lucide-react";
import TaskList from "@/components/tasks/TaskList";

interface TaskTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  searchQuery: string;
  priorityFilter: string | null;
  sourceFilter: string | null;
}

const TaskTabs = ({ 
  activeTab, 
  onTabChange,
  searchQuery, 
  priorityFilter,
  sourceFilter 
}: TaskTabsProps) => {
  return (
    <Tabs value={activeTab} className="w-full" onValueChange={onTabChange}>
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

      <TabsContent value={activeTab}>
        <TaskList 
          activeTab={activeTab} 
          searchQuery={searchQuery} 
          priorityFilter={priorityFilter}
          sourceFilter={sourceFilter}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TaskTabs;
