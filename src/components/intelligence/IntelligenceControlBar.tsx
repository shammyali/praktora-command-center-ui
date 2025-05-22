
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  RefreshCw, 
  Clock, 
  Share2, 
  ToggleRight 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  classFilterOptions, 
  channelFilterOptions, 
  agentFilterOptions, 
  periodFilterOptions 
} from "@/data/intelligenceData";

interface IntelligenceControlBarProps {
  onRefresh: () => void;
  onExport: () => void;
  onShare: () => void;
  lastUpdated: Date;
}

const IntelligenceControlBar = ({
  onRefresh,
  onExport,
  onShare,
  lastUpdated
}: IntelligenceControlBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-6 bg-white p-3 rounded-lg border shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[130px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {classFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[140px]">
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent>
            {channelFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Agent" />
          </SelectTrigger>
          <SelectContent>
            {agentFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="30d">
          <SelectTrigger className="h-8 w-[140px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            {periodFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center space-x-2">
          <Switch id="auto-refresh" />
          <Label htmlFor="auto-refresh" className="text-xs">Auto-refresh</Label>
        </div>

        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1.5" />
          Last updated {lastUpdated.toLocaleTimeString()}
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="sr-only">Refresh</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh data</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="h-3.5 w-3.5" />
                <span className="sr-only">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share dashboard</TooltipContent>
          </Tooltip>

          <Button variant="outline" size="sm" onClick={onExport} className="hidden sm:flex">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">Export</span>
          </Button>

          <div className="flex items-center ml-1">
            <Button variant="outline" size="sm" className="bg-gray-50">
              <ToggleRight className="h-3.5 w-3.5 mr-1.5 text-praktora-burgundy" />
              <span className="text-xs">View Modes</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceControlBar;
