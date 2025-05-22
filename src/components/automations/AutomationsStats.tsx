
import { automationStats } from "@/data/automationsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Clock, Activity, Send, AlertTriangle, MessageCircle } from "lucide-react";

const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
  <div className="flex items-center space-x-3 p-3 border rounded-md">
    <div className="bg-praktora-burgundy/10 p-2 rounded-full text-praktora-burgundy">
      {icon}
    </div>
    <div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
    </div>
  </div>
);

const AutomationsStats = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Automation Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatCard 
          title="Active Rules" 
          value={automationStats.activeRules} 
          icon={<Zap className="h-4 w-4" />} 
        />
        
        <StatCard 
          title="Executions This Week" 
          value={automationStats.executionsThisWeek} 
          icon={<Activity className="h-4 w-4" />} 
        />
        
        <StatCard 
          title="Time Saved Estimate" 
          value={`${automationStats.timeSavedEstimate} hrs`} 
          icon={<Clock className="h-4 w-4" />} 
        />
        
        <StatCard 
          title="Top Trigger" 
          value={automationStats.topTrigger} 
          icon={<Send className="h-4 w-4" />} 
        />
        
        <StatCard 
          title="Rule Failure Rate" 
          value={`${automationStats.ruleFailureRate}%`} 
          icon={<AlertTriangle className="h-4 w-4" />} 
        />
        
        <StatCard 
          title="Most Used Action" 
          value={automationStats.mostUsedAction} 
          icon={<MessageCircle className="h-4 w-4" />} 
        />
      </CardContent>
    </Card>
  );
};

export default AutomationsStats;
