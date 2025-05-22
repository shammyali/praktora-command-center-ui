
import { Clock, MessageCircle, FileText, RefreshCw, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramStats } from "@/data/telegramData";

interface TelegramMiniDashboardProps {
  stats: TelegramStats;
}

export default function TelegramMiniDashboard({ stats }: TelegramMiniDashboardProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <StatsCard 
        title="Total Conversations Today"
        value={stats.totalConversationsToday}
        description="From all channels"
        icon={MessageCircle}
        color="blue"
      />
      
      <StatsCard 
        title="Structured Quote Requests"
        value={stats.structuredQuoteRequests}
        description="Via bots"
        icon={FileText}
        color="green"
      />
      
      <StatsCard 
        title="Unlinked Threads"
        value={stats.unlinkedThreads}
        description="Need workflow linking"
        icon={RefreshCw}
        color="amber"
      />
      
      <StatsCard 
        title="FNOL Submissions"
        value={stats.fnolSubmissions}
        description="Last 24 hours"
        icon={AlertTriangle}
        color="red"
      />
      
      <StatsCard 
        title="Avg. Bot Response Time"
        value={stats.avgBotResponseTime}
        description="Team performance"
        icon={Clock}
        color="purple"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  color: "blue" | "amber" | "green" | "purple" | "red";
}

const StatsCard = ({ title, value, description, icon: Icon, color }: StatsCardProps) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    green: "text-green-600 bg-green-50 border-green-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    red: "text-red-600 bg-red-50 border-red-100",
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{title}</CardTitle>
          <div className={`h-6 w-6 rounded-md flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="h-3.5 w-3.5" />
          </div>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
};
