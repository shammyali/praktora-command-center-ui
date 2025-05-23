
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import BusinessPulse from "@/components/dashboard/BusinessPulse";
import AiHighlights from "@/components/dashboard/AiHighlights";
import AgentLeaderboard from "@/components/dashboard/AgentLeaderboard";
import CriticalAlerts from "@/components/dashboard/CriticalAlerts";
import VoiceCommandWithTooltip from "@/components/dashboard/VoiceCommandWithTooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { RefreshCw, Monitor } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const [voiceCommandResult, setVoiceCommandResult] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<"today" | "week" | "month">("today");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [wallMode, setWallMode] = useState(false);
  const [activeWallSection, setActiveWallSection] = useState(0);

  const wallSections = ["alerts", "timeline", "kpis", "agents"];

  useEffect(() => {
    if (wallMode) {
      const interval = setInterval(() => {
        setActiveWallSection((prev) => (prev + 1) % wallSections.length);
      }, 30000); // Rotate every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [wallMode]);

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In a real app, this would trigger data refresh
  };

  const handleVoiceCommand = (command: string) => {
    let result = "";
    
    if (command.includes("delayed claims")) {
      result = "Top 5 delayed claims:\n1. Claim #C23091 - AXA - 15 days\n2. Claim #C23087 - Oman Insurance - 12 days\n3. Claim #C23076 - RSA - 11 days\n4. Claim #C23094 - Salama - 10 days\n5. Claim #C23082 - Sukoon - 10 days";
    } else if (command.includes("summarize today")) {
      result = "Today: 27 new enquiries processed, 12 quotes sent, 5 policies issued worth AED 47,500 in premium.";
    } else {
      result = "I'm sorry, I couldn't process that command. Try asking about delayed claims or today's activity summary.";
    }
    
    setVoiceCommandResult(result);
  };

  return (
    <Layout subtitle="Control Center Dashboard">
      <div className={`${wallMode ? 'overflow-hidden' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-praktora-burgundy">P²RA Control Center — Intelligence in Motion</h1>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500 flex items-center">
              <RefreshCw className="h-3 w-3 mr-1" />
              Last updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-1 h-6 w-6 p-0" 
                onClick={handleRefresh}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={wallMode ? "default" : "outline"}
                    size="sm"
                    className={`h-8 ${wallMode ? 'bg-praktora-burgundy' : ''}`}
                    onClick={() => setWallMode(!wallMode)}
                  >
                    <Monitor className="h-4 w-4 mr-1" />
                    Wall Mode
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Display mode for office screens.<br/>Auto-rotates sections every 30 seconds</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <VoiceCommandWithTooltip onCommand={handleVoiceCommand} />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="w-48">
            <Select value={dateRange} onValueChange={(value: "today" | "week" | "month") => setDateRange(value)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {voiceCommandResult && (
          <div className="mb-6 p-4 bg-praktora-burgundy/10 border border-praktora-burgundy/30 rounded-lg animate-fade-in">
            <pre className="whitespace-pre-wrap text-sm">{voiceCommandResult}</pre>
          </div>
        )}
        
        {wallMode ? (
          <div className="animate-fade-in">
            {activeWallSection === 0 && <CriticalAlerts />}
            {activeWallSection === 1 && <ActivityTimeline />}
            {activeWallSection === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BusinessPulse dateRange={dateRange} />
              </div>
            )}
            {activeWallSection === 3 && <AgentLeaderboard />}
          </div>
        ) : (
          <>
            <div className="mb-6 animate-fade-in">
              <CriticalAlerts />
            </div>
            
            <div className="mb-6 animate-fade-in">
              <ActivityTimeline />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
              <div className="lg:col-span-3">
                <BusinessPulse dateRange={dateRange} />
              </div>
              
              <div className="lg:col-span-5">
                <AiHighlights />
              </div>
              
              <div className="lg:col-span-4">
                <AgentLeaderboard />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
