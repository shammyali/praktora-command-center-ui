
import { useState, useEffect } from "react";
import { Download, RefreshCw, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HistoryEvent, generateHistorySummary } from "@/data/historyData";
import HistoryEventCard from "./HistoryEventCard";
import { HistoryFilters } from "./HistoryFilters";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface HistoryTimelineProps {
  events: HistoryEvent[];
  filters: HistoryFilters;
}

const HistoryTimeline = ({ events, filters }: HistoryTimelineProps) => {
  const [isNarrativeMode, setIsNarrativeMode] = useState(false);
  const [showLiveMode, setShowLiveMode] = useState(false);
  const [narrativeSummary, setNarrativeSummary] = useState<string>("");
  
  // Generate narrative summary
  useEffect(() => {
    if (isNarrativeMode) {
      // Determine time period for summary
      let days = 1; // default to today
      if (filters.timePeriod === 'last7') days = 7;
      else if (filters.timePeriod === 'last30') days = 30;
      
      const summary = generateHistorySummary(events, days);
      
      // Craft a narrative
      const narrative = `
        ${summary.period}, ${summary.totalEvents} events were logged across the system. 
        ${summary.aiEventCount} were AI-driven actions and ${summary.automationEventCount} were performed by automations.
        ${summary.userEventCount} actions were taken by users, while ${summary.clientEventCount} were client interactions.

        ${summary.whatsAppEvents} WhatsApp messages, ${summary.emailEvents} emails, and ${summary.telegramEvents} Telegram messages were processed.
        ${summary.uniqueWorkflows} unique workflows were affected.
        ${summary.failedEvents > 0 ? `${summary.failedEvents} events failed execution.` : 'All events executed successfully.'} 
        ${summary.overriddenEvents > 0 ? `${summary.overriddenEvents} automated actions were manually overridden.` : ''}
      `.trim().replace(/\s+/g, ' ');
      
      setNarrativeSummary(narrative);
    }
  }, [isNarrativeMode, events, filters.timePeriod]);

  const handleExport = (format: string) => {
    toast.success(`Exporting history as ${format}...`);
  };

  const handleRefresh = () => {
    toast.success("History refreshed");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">History – Event Memory Center</h2>
          <p className="text-sm text-gray-500">
            Every move made. Every system memory.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="narrative-mode"
              checked={isNarrativeMode}
              onCheckedChange={setIsNarrativeMode}
            />
            <Label htmlFor="narrative-mode" className="cursor-pointer">Narrative Mode</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="live-mode"
              checked={showLiveMode}
              onCheckedChange={setShowLiveMode}
            />
            <Label htmlFor="live-mode" className="cursor-pointer">Live Mode</Label>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport("CSV")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("JSON")}>
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("PDF")}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success("History sent to email")}>
                Send to Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("History archived")}>
                Archive Logs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="px-4 py-2 border-b flex items-center justify-between bg-gray-50">
        <div className="flex items-center space-x-4">
          <Badge>Total: {events.length} events</Badge>
          {filters.searchQuery && (
            <Badge variant="outline">Search: "{filters.searchQuery}"</Badge>
          )}
          {(filters.showOnlyAI || filters.showOnlyAutomation || filters.showOnlyManual) && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {filters.showOnlyAI && "AI Events Only"}
              {filters.showOnlyAutomation && "Automation Events Only"}
              {filters.showOnlyManual && "Manual Events Only"}
            </Badge>
          )}
        </div>
      </div>

      {/* Events Timeline or Narrative View */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isNarrativeMode ? (
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                <h3 className="font-semibold text-lg">Summary View</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{narrativeSummary}</p>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-100 text-blue-800">AI-powered summary</Badge>
                <Button variant="outline" size="sm" onClick={() => setIsNarrativeMode(false)}>
                  <MessageSquare className="h-4 w-4 mr-2" /> View Detailed Timeline
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {events.length > 0 ? (
                events.map((event) => (
                  <HistoryEventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No events match your current filters.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => toast.success("Filters cleared")}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
              
              {showLiveMode && (
                <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                  Live Mode Active
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HistoryTimeline;
