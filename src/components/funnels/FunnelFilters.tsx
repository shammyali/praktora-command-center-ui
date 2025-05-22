
import { useState } from "react";
import { filterOptions } from "@/data/funnelsData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FunnelFiltersProps {
  onClassChange: (value: string) => void;
  onComparisonToggle: (value: boolean) => void;
  onValuesToggle: (value: boolean) => void;
  selectedClass: string;
  showComparison: boolean;
  showAbsoluteValues: boolean;
}

const FunnelFilters = ({
  onClassChange,
  onComparisonToggle,
  onValuesToggle,
  selectedClass,
  showComparison,
  showAbsoluteValues
}: FunnelFiltersProps) => {
  const [channel, setChannel] = useState<string>("All");
  const [agent, setAgent] = useState<string>("All");
  const [insurer, setInsurer] = useState<string>("All");
  const [timePeriod, setTimePeriod] = useState<string>("This Month");
  const [policyValue, setPolicyValue] = useState<string>("All");
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Class
          </label>
          <Select value={selectedClass} onValueChange={onClassChange}>
            <SelectTrigger id="class-select" className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.classes.map((classOption) => (
                <SelectItem key={classOption} value={classOption}>
                  {classOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="channel-select" className="block text-sm font-medium text-gray-700 mb-1">
            Channel
          </label>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger id="channel-select" className="w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Channels</SelectItem>
              {filterOptions.channels.map((channelOption) => (
                <SelectItem key={channelOption} value={channelOption}>
                  {channelOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="agent-select" className="block text-sm font-medium text-gray-700 mb-1">
            Agent
          </label>
          <Select value={agent} onValueChange={setAgent}>
            <SelectTrigger id="agent-select" className="w-full">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Agents</SelectItem>
              {filterOptions.agents.map((agentOption) => (
                <SelectItem key={agentOption} value={agentOption}>
                  {agentOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="insurer-select" className="block text-sm font-medium text-gray-700 mb-1">
            Insurer
          </label>
          <Select value={insurer} onValueChange={setInsurer}>
            <SelectTrigger id="insurer-select" className="w-full">
              <SelectValue placeholder="Select insurer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Insurers</SelectItem>
              {filterOptions.insurers.map((insurerOption) => (
                <SelectItem key={insurerOption} value={insurerOption}>
                  {insurerOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="time-period-select" className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger id="time-period-select" className="w-full">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.timePeriods.map((periodOption) => (
                <SelectItem key={periodOption} value={periodOption}>
                  {periodOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="policy-value-select" className="block text-sm font-medium text-gray-700 mb-1">
            Policy Value
          </label>
          <Select value={policyValue} onValueChange={setPolicyValue}>
            <SelectTrigger id="policy-value-select" className="w-full">
              <SelectValue placeholder="Select policy value" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.policyValueTiers.map((valueOption) => (
                <SelectItem key={valueOption} value={valueOption}>
                  {valueOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-6 border-t pt-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="compare-toggle"
            checked={showComparison}
            onCheckedChange={onComparisonToggle}
          />
          <Label htmlFor="compare-toggle">Compare with last period</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="value-toggle"
            checked={showAbsoluteValues}
            onCheckedChange={onValuesToggle}
          />
          <Label htmlFor="value-toggle">Show as absolute values</Label>
        </div>
        
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="sm">Reset Filters</Button>
          <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FunnelFilters;
