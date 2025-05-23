
import TaskSearch from "@/components/tasks/TaskSearch";
import TaskTabs from "@/components/tasks/TaskTabs";
import TaskFilters from "@/components/tasks/TaskFilters";

interface TasksLeftPanelProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  filterPriority: string | null;
  onFilterPriorityChange: (priority: string | null) => void;
  filterSource: string | null;
  onFilterSourceChange: (source: string | null) => void;
}

const TasksLeftPanel = ({
  searchQuery,
  onSearchQueryChange,
  activeTab,
  onActiveTabChange,
  filterPriority,
  onFilterPriorityChange,
  filterSource,
  onFilterSourceChange
}: TasksLeftPanelProps) => {
  return (
    <>
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
    </>
  );
};

export default TasksLeftPanel;
