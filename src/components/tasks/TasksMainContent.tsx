
import TasksLeftPanel from "@/components/tasks/TasksLeftPanel";
import TasksRightPanel from "@/components/tasks/TasksRightPanel";

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
        <TasksLeftPanel
          activeTab={activeTab}
          onActiveTabChange={onActiveTabChange}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          filterPriority={filterPriority}
          onFilterPriorityChange={onFilterPriorityChange}
          filterSource={filterSource}
          onFilterSourceChange={onFilterSourceChange}
        />
      </div>
      
      <div className="space-y-6">
        <TasksRightPanel />
      </div>
    </div>
  );
};

export default TasksMainContent;
