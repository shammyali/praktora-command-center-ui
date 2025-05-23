
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConversationType, ConversationStatus } from "@/data/whatsapp/types";

interface ConversationFiltersProps {
  searchQuery: string;
  typeFilter: ConversationType | "All";
  statusFilter: ConversationStatus | "All";
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: ConversationType | "All") => void;
  onStatusFilterChange: (value: ConversationStatus | "All") => void;
}

export default function ConversationFilters({
  searchQuery,
  typeFilter,
  statusFilter,
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange
}: ConversationFiltersProps) {
  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            value={typeFilter}
            onValueChange={(value) => onTypeFilterChange(value as any)}
          >
            <SelectTrigger className="h-8 text-xs w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="New Business">New Business</SelectItem>
              <SelectItem value="Claim">Claim</SelectItem>
              <SelectItem value="Renewal">Renewal</SelectItem>
              <SelectItem value="Unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Select
            value={statusFilter}
            onValueChange={(value) => onStatusFilterChange(value as any)}
          >
            <SelectTrigger className="h-8 text-xs w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Unlinked">Unlinked</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Actioned">Actioned</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Filter className="h-4 w-4" />
          <span className="sr-only">More filters</span>
        </Button>
      </div>
    </div>
  );
}
