
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActorType, EventType, TargetEntityType, ChannelType, OutcomeType } from "@/data/historyData";

interface HistoryFiltersProps {
  onFilterChange: (filters: HistoryFilters) => void;
}

export interface HistoryFilters {
  searchQuery: string;
  entityTypes: TargetEntityType[];
  eventTypes: EventType[];
  actors: ActorType[];
  timePeriod: string;
  channels: ChannelType[];
  outcomes: OutcomeType[];
  showOnlyAI: boolean;
  showOnlyAutomation: boolean;
  showOnlyManual: boolean;
}

const HistoryFilters = ({ onFilterChange }: HistoryFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entityTypes, setEntityTypes] = useState<TargetEntityType[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [actors, setActors] = useState<ActorType[]>([]);
  const [timePeriod, setTimePeriod] = useState<string>("all");
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeType[]>([]);
  const [showOnlyAI, setShowOnlyAI] = useState<boolean>(false);
  const [showOnlyAutomation, setShowOnlyAutomation] = useState<boolean>(false);
  const [showOnlyManual, setShowOnlyManual] = useState<boolean>(false);

  const applyFilters = () => {
    onFilterChange({
      searchQuery,
      entityTypes,
      eventTypes,
      actors,
      timePeriod,
      channels,
      outcomes,
      showOnlyAI,
      showOnlyAutomation,
      showOnlyManual
    });
  };

  // Apply filters whenever they change
  const handleFilterChange = <T extends keyof HistoryFilters>(
    filterType: T,
    value: HistoryFilters[T]
  ) => {
    switch (filterType) {
      case "searchQuery":
        setSearchQuery(value as string);
        break;
      case "entityTypes":
        setEntityTypes(value as TargetEntityType[]);
        break;
      case "eventTypes":
        setEventTypes(value as EventType[]);
        break;
      case "actors":
        setActors(value as ActorType[]);
        break;
      case "timePeriod":
        setTimePeriod(value as string);
        break;
      case "channels":
        setChannels(value as ChannelType[]);
        break;
      case "outcomes":
        setOutcomes(value as OutcomeType[]);
        break;
      case "showOnlyAI":
        setShowOnlyAI(value as boolean);
        break;
      case "showOnlyAutomation":
        setShowOnlyAutomation(value as boolean);
        break;
      case "showOnlyManual":
        setShowOnlyManual(value as boolean);
        break;
      default:
        break;
    }
    
    setTimeout(applyFilters, 0);
  };

  const toggleFilter = <T extends any>(
    item: T,
    current: T[],
    setter: (value: T[]) => void
  ) => {
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    setter(updated);
    setTimeout(applyFilters, 0);
  };

  return (
    <Card className="p-4 space-y-4 w-full">
      <h3 className="text-lg font-semibold">Filter & Search</h3>
      
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search events, clients, or IDs..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[calc(100vh-240px)]">
        <div className="space-y-4 pr-4">
          {/* Entity Filter */}
          <div className="space-y-2">
            <Label>Entity</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {entityTypes.length === 0 ? "All Entities" : `${entityTypes.length} selected`}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Entity Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Client", "Enquiry", "Policy", "Claim", "Workflow"].map((entity) => (
                  <DropdownMenuCheckboxItem
                    key={entity}
                    checked={entityTypes.includes(entity as TargetEntityType)}
                    onCheckedChange={() => toggleFilter(
                      entity as TargetEntityType,
                      entityTypes,
                      (value) => handleFilterChange("entityTypes", value)
                    )}
                  >
                    {entity}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Event Type Filter */}
          <div className="space-y-2">
            <Label>Event Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {eventTypes.length === 0 ? "All Event Types" : `${eventTypes.length} selected`}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Event Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  "Automation",
                  "AI Suggestion",
                  "Manual Action",
                  "Communication",
                  "Status Change",
                  "System Trigger",
                  "Quote",
                  "Claim",
                  "Message",
                  "KYC",
                  "System"
                ].map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={eventTypes.includes(type as EventType)}
                    onCheckedChange={() => toggleFilter(
                      type as EventType,
                      eventTypes,
                      (value) => handleFilterChange("eventTypes", value)
                    )}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actor Filter */}
          <div className="space-y-2">
            <Label>Actor</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {actors.length === 0 ? "All Actors" : `${actors.length} selected`}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Actors</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  "User",
                  "Automation Engine",
                  "P²RA AI",
                  "Client",
                  "External Source"
                ].map((actor) => (
                  <DropdownMenuCheckboxItem
                    key={actor}
                    checked={actors.includes(actor as ActorType)}
                    onCheckedChange={() => toggleFilter(
                      actor as ActorType,
                      actors,
                      (value) => handleFilterChange("actors", value)
                    )}
                  >
                    {actor}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Time Period Filter */}
          <div className="space-y-2">
            <Label>Time Period</Label>
            <Select
              value={timePeriod}
              onValueChange={(value) => handleFilterChange("timePeriod", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Channel Filter */}
          <div className="space-y-2">
            <Label>Channel</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {channels.length === 0 ? "All Channels" : `${channels.length} selected`}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Channels</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["WhatsApp", "Email", "Telegram", "Direct", "System"].map((channel) => (
                  <DropdownMenuCheckboxItem
                    key={channel}
                    checked={channels.includes(channel as ChannelType)}
                    onCheckedChange={() => toggleFilter(
                      channel as ChannelType,
                      channels,
                      (value) => handleFilterChange("channels", value)
                    )}
                  >
                    {channel}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Outcome Filter */}
          <div className="space-y-2">
            <Label>Outcome</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {outcomes.length === 0 ? "All Outcomes" : `${outcomes.length} selected`}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Outcomes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Executed", "Ignored", "Failed", "Overridden", "Pending"].map((outcome) => (
                  <DropdownMenuCheckboxItem
                    key={outcome}
                    checked={outcomes.includes(outcome as OutcomeType)}
                    onCheckedChange={() => toggleFilter(
                      outcome as OutcomeType,
                      outcomes,
                      (value) => handleFilterChange("outcomes", value)
                    )}
                  >
                    {outcome}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Toggle Filters */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-ai">Show Only AI-Driven Events</Label>
              <Switch
                id="show-ai"
                checked={showOnlyAI}
                onCheckedChange={(checked) => {
                  handleFilterChange("showOnlyAI", checked);
                  if (checked) {
                    handleFilterChange("showOnlyAutomation", false);
                    handleFilterChange("showOnlyManual", false);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-automation">Show Only Automation Events</Label>
              <Switch
                id="show-automation"
                checked={showOnlyAutomation}
                onCheckedChange={(checked) => {
                  handleFilterChange("showOnlyAutomation", checked);
                  if (checked) {
                    handleFilterChange("showOnlyAI", false);
                    handleFilterChange("showOnlyManual", false);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-manual">Show Manual-Only History</Label>
              <Switch
                id="show-manual"
                checked={showOnlyManual}
                onCheckedChange={(checked) => {
                  handleFilterChange("showOnlyManual", checked);
                  if (checked) {
                    handleFilterChange("showOnlyAI", false);
                    handleFilterChange("showOnlyAutomation", false);
                  }
                }}
              />
            </div>
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={applyFilters}
            variant="secondary"
          >
            <Filter className="h-4 w-4 mr-2" /> Apply Filters
          </Button>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default HistoryFilters;
