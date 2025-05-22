
import { useState } from "react";
import { Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface WorkflowFiltersProps {
  onFilterChange: (filters: WorkflowFilters) => void;
}

export interface WorkflowFilters {
  businessClass: string;
  stageGroup: string;
  assignedAgent: string;
  age: string;
}

const businessClasses = [
  { label: "All Classes", value: "all" },
  { label: "Motor", value: "motor" },
  { label: "Medical", value: "medical" },
  { label: "Property", value: "property" },
  { label: "Liability", value: "liability" },
  { label: "Specialty", value: "specialty" },
];

const stageGroups = [
  { label: "All Stages", value: "all" },
  { label: "Pre-Quote", value: "pre-quote" },
  { label: "Quote", value: "quote" },
  { label: "Post-Issuance", value: "post-issuance" },
  { label: "Settlement", value: "settlement" },
];

const agents = [
  { label: "All Agents", value: "all" },
  { label: "Ahmed K.", value: "Ahmed K." },
  { label: "Sara L.", value: "Sara L." },
  { label: "Mohammed R.", value: "Mohammed R." },
  { label: "Fatima Q.", value: "Fatima Q." },
  { label: "Hassan Z.", value: "Hassan Z." },
  { label: "Layla M.", value: "Layla M." },
  { label: "Omar J.", value: "Omar J." },
];

const ageOptions = [
  { label: "Any Age", value: "all" },
  { label: "1+ days", value: "1" },
  { label: "3+ days", value: "3" },
  { label: "5+ days", value: "5" },
  { label: "7+ days", value: "7" },
  { label: "14+ days", value: "14" },
];

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
  
  const CustomDropdown = ({ 
    options, 
    value, 
    onChange, 
    label 
  }: { 
    options: { label: string; value: string; }[],
    value: string,
    onChange: (value: string) => void,
    label: string
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 justify-between">
          {options.find(opt => opt.value === value)?.label || label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              option.value === value && "bg-muted"
            )}
          >
            {option.value === value && <Check className="h-4 w-4" />}
            <span className={option.value === value ? "font-medium" : ""}>
              {option.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
            <CustomDropdown
              options={businessClasses}
              value={filters.businessClass}
              onChange={(value) => handleFilterChange("businessClass", value)}
              label="All Classes"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Workflow Stage Group</label>
            <CustomDropdown
              options={stageGroups}
              value={filters.stageGroup}
              onChange={(value) => handleFilterChange("stageGroup", value)}
              label="All Stages"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Assigned Agent</label>
            <CustomDropdown
              options={agents}
              value={filters.assignedAgent}
              onChange={(value) => handleFilterChange("assignedAgent", value)}
              label="All Agents"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium">Age</label>
            <CustomDropdown
              options={ageOptions}
              value={filters.age}
              onChange={(value) => handleFilterChange("age", value)}
              label="Any Age"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkflowFilters;
