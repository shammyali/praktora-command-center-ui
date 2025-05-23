
import { useState } from "react";
import TaskSearch from "@/components/tasks/TaskSearch";
import TaskTabs from "@/components/tasks/TaskTabs";
import TaskFilters from "@/components/tasks/TaskFilters";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from "@/components/ui/card";
import TaskTypeStats from "@/components/tasks/TaskTypeStats";
import TaskPriorityMatrix from "@/components/tasks/TaskPriorityMatrix";

interface TasksMainContentProps {
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  filterPriority: string | null;
  onFilterPriorityChange: (priority: string | null) => void;
  filterSource: string | null;
  onFilterSourceChange: (source: string | null) => void;
}

const TasksMainContent = ({
  activeTab,
  onActiveTabChange,
  searchQuery,
  onSearchQueryChange,
  filterPriority,
  onFilterPriorityChange,
  filterSource,
  onFilterSourceChange
}: TasksMainContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      <div className="lg:col-span-3">
        <div className="mb-4">
          <TaskSearch 
            searchQuery={searchQuery} 
            onSearchChange={onSearchQueryChange}
          />
        </div>
        
        <div className="flex gap-4 mb-4">
          <TaskFilters 
            onPriorityChange={onFilterPriorityChange} 
            onSourceChange={onFilterSourceChange} 
          />
        </div>
        
        <TaskTabs
          activeTab={activeTab}
          onTabChange={onActiveTabChange}
          searchQuery={searchQuery}
          priorityFilter={filterPriority}
          sourceFilter={filterSource}
        />
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
  );
};

export default TasksMainContent;
