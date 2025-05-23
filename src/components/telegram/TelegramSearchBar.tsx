
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TelegramSourceType, TelegramChatType } from "@/data/telegramData";

interface TelegramSearchBarProps {
  searchQuery: string;
  filterSource: TelegramSourceType | "All";
  filterType: TelegramChatType | "All";
  onSearchChange: (value: string) => void;
  onFilterSourceChange: (value: TelegramSourceType | "All") => void;
  onFilterTypeChange: (value: TelegramChatType | "All") => void;
}

export default function TelegramSearchBar({
  searchQuery,
  filterSource,
  filterType,
  onSearchChange,
  onFilterSourceChange,
  onFilterTypeChange
}: TelegramSearchBarProps) {
  return (
    <div className="px-4 py-2 flex gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search conversations..." 
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <select 
          className="bg-background border rounded-md px-3 py-2 text-sm"
          value={filterSource}
          onChange={(e) => onFilterSourceChange(e.target.value as TelegramSourceType | "All")}
        >
          <option value="All">All Sources</option>
          <option value="Bot">Bot Only</option>
          <option value="Human">Human Only</option>
        </select>
        
        <select 
          className="bg-background border rounded-md px-3 py-2 text-sm"
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value as TelegramChatType | "All")}
        >
          <option value="All">All Types</option>
          <option value="New Business">New Business</option>
          <option value="FNOL">FNOL</option>
          <option value="Complaint">Complaint</option>
          <option value="Renewal">Renewal</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
}
