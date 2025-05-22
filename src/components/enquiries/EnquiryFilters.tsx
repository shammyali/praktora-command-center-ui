
import { useState } from "react";
import { 
  Filter, Search, X, Calendar, UserRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { businessClasses, sources, statuses, agents } from "@/data/enquiriesData";

interface EnquiryFiltersProps {
  onFilterChange: (filters: any) => void;
}

const EnquiryFilters = ({ onFilterChange }: EnquiryFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinessClasses, setSelectedBusinessClasses] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [openBusinessClass, setOpenBusinessClass] = useState(false);
  const [openSources, setOpenSources] = useState(false);
  const [openAgents, setOpenAgents] = useState(false);

  // Handler for business class selection
  const handleBusinessClassSelect = (value: string) => {
    setSelectedBusinessClasses(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Handler for source selection
  const handleSourceSelect = (value: string) => {
    setSelectedSources(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Handler for agent selection
  const handleAgentSelect = (value: string) => {
    setSelectedAgents(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange({
      query: searchQuery,
      businessClasses: selectedBusinessClasses,
      sources: selectedSources,
      status: selectedStatus,
      agents: selectedAgents,
      age: selectedAge
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBusinessClasses([]);
    setSelectedSources([]);
    setSelectedStatus("");
    setSelectedAgents([]);
    setSelectedAge("");
    
    // Notify parent component
    onFilterChange({
      query: "",
      businessClasses: [],
      sources: [],
      status: "",
      agents: [],
      age: ""
    });
  };

  // Count active filters
  const activeFiltersCount = [
    selectedBusinessClasses.length > 0,
    selectedSources.length > 0,
    !!selectedStatus,
    selectedAgents.length > 0,
    !!selectedAge
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Popover open={openBusinessClass} onOpenChange={setOpenBusinessClass}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "flex gap-1 h-10",
                  selectedBusinessClasses.length > 0 && "border-praktora-burgundy text-praktora-burgundy"
                )}
              >
                <span>Business Class</span>
                {selectedBusinessClasses.length > 0 && (
                  <Badge className="bg-praktora-burgundy text-white ml-1">
                    {selectedBusinessClasses.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search business class..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {businessClasses.map((item) => (
                      <CommandItem
                        key={item}
                        onSelect={() => handleBusinessClassSelect(item)}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className={cn(
                            "size-4 rounded-sm border", 
                            selectedBusinessClasses.includes(item) 
                              ? "bg-praktora-burgundy border-praktora-burgundy" 
                              : "border-gray-300"
                          )}
                        >
                          {selectedBusinessClasses.includes(item) && (
                            <X className="size-3 text-white" />
                          )}
                        </div>
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openSources} onOpenChange={setOpenSources}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
                className={cn(
                  "flex gap-1 h-10",
                  selectedSources.length > 0 && "border-praktora-burgundy text-praktora-burgundy"
                )}
              >
                <span>Source</span>
                {selectedSources.length > 0 && (
                  <Badge className="bg-praktora-burgundy text-white ml-1">
                    {selectedSources.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {sources.map((source) => (
                      <CommandItem
                        key={source}
                        onSelect={() => handleSourceSelect(source)}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className={cn(
                            "size-4 rounded-sm border", 
                            selectedSources.includes(source) 
                              ? "bg-praktora-burgundy border-praktora-burgundy" 
                              : "border-gray-300"
                          )}
                        >
                          {selectedSources.includes(source) && (
                            <X className="size-3 text-white" />
                          )}
                        </div>
                        {source}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger 
              className={cn(
                "w-[120px] h-10",
                selectedStatus && "border-praktora-burgundy text-praktora-burgundy"
              )}
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover open={openAgents} onOpenChange={setOpenAgents}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex gap-1 h-10",
                  selectedAgents.length > 0 && "border-praktora-burgundy text-praktora-burgundy"
                )}
                aria-expanded={openAgents}
              >
                <UserRound className="size-4" />
                <span className="hidden sm:inline">Agent</span>
                {selectedAgents.length > 0 && (
                  <Badge className="bg-praktora-burgundy text-white ml-1">
                    {selectedAgents.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search agents..." />
                <CommandList>
                  <CommandEmpty>No agents found.</CommandEmpty>
                  <CommandGroup>
                    {agents.map((agent) => (
                      <CommandItem
                        key={agent}
                        onSelect={() => handleAgentSelect(agent)}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className={cn(
                            "size-4 rounded-sm border", 
                            selectedAgents.includes(agent) 
                              ? "bg-praktora-burgundy border-praktora-burgundy" 
                              : "border-gray-300"
                          )}
                        >
                          {selectedAgents.includes(agent) && (
                            <X className="size-3 text-white" />
                          )}
                        </div>
                        {agent}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Select value={selectedAge} onValueChange={setSelectedAge}>
            <SelectTrigger 
              className={cn(
                "w-[110px] h-10",
                selectedAge && "border-praktora-burgundy text-praktora-burgundy"
              )}
            >
              <Calendar className="mr-2 size-4" />
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="24h">{'>'} 24h</SelectItem>
              <SelectItem value="48h">{'>'} 48h</SelectItem>
              <SelectItem value="72h">{'>'} 72h</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            {activeFiltersCount === 0 
              ? "No filters applied" 
              : `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-gray-500"
            >
              Clear All
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={applyFilters}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/80"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryFilters;
