
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const TaskSearch = ({ searchQuery, onSearchChange }: TaskSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search tasks..." 
        className="pl-9" 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default TaskSearch;
