
import { useState } from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WorkflowFiltersProps {
  onFilterChange: (filters: WorkflowFilters) => void;
}

export interface WorkflowFilters {
  businessClass: string;
  stageGroup: string;
  assignedAgent: string;
  age: string;
}

const WorkflowFilters = ({ onFilterChange }: WorkflowFiltersProps) => {
  const [filters, setFilters] = useState<WorkflowFilters>({
    businessClass: "all",
    stageGroup: "all",
    assignedAgent: "all",
    age: "all",
  });

  const handleFilterChange = (key: keyof WorkflowFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Filter Workflows</h4>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Business Class</label>
            <Select
              value={filters.businessClass}
              onValueChange={(value) => handleFilterChange("businessClass", value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="motor">Motor</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="liability">Liability</SelectItem>
                <SelectItem value="specialty">Specialty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Workflow Stage Group</label>
            <Select
              value={filters.stageGroup}
              onValueChange={(value) => handleFilterChange("stageGroup", value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="pre-quote">Pre-Quote</SelectItem>
                <SelectItem value="quote">Quote</SelectItem>
                <SelectItem value="post-issuance">Post-Issuance</SelectItem>
                <SelectItem value="settlement">Settlement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Assigned Agent</label>
            <Select
              value={filters.assignedAgent}
              onValueChange={(value) => handleFilterChange("assignedAgent", value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All Agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="Ahmed K.">Ahmed K.</SelectItem>
                <SelectItem value="Sara L.">Sara L.</SelectItem>
                <SelectItem value="Mohammed R.">Mohammed R.</SelectItem>
                <SelectItem value="Fatima Q.">Fatima Q.</SelectItem>
                <SelectItem value="Hassan Z.">Hassan Z.</SelectItem>
                <SelectItem value="Layla M.">Layla M.</SelectItem>
                <SelectItem value="Omar J.">Omar J.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Age</label>
            <Select
              value={filters.age}
              onValueChange={(value) => handleFilterChange("age", value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Any Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Age</SelectItem>
                <SelectItem value="1">1+ days</SelectItem>
                <SelectItem value="3">3+ days</SelectItem>
                <SelectItem value="5">5+ days</SelectItem>
                <SelectItem value="7">7+ days</SelectItem>
                <SelectItem value="14">14+ days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkflowFilters;
