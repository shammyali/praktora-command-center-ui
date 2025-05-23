import { Clock, MessageCircle, FileText, RefreshCw, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppStats } from "@/data/whatsapp/types";

interface WhatsAppMiniDashboardProps {
  stats: WhatsAppStats;
}

export default function WhatsAppMiniDashboard({ stats }: WhatsAppMiniDashboardProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <StatsCard 
        title="Total Messages Today"
        value={stats.totalMessagesToday}
        description="Across all conversations"
        icon={MessageCircle}
        color="blue"
      />
      
      <StatsCard 
        title="Unlinked Conversations"
        value={stats.newUnlinkedConversations}
        description="Need workflow linking"
        icon={RefreshCw}
        color="amber"
      />
      
      <StatsCard 
        title="Converted to Enquiries"
        value={stats.convertedToEnquiries}
        description="Last 24 hours"
        icon={FileText}
        color="green"
      />
      
      <StatsCard 
        title="Average Reply Time"
        value={`${stats.averageReplyTimeMinutes} min`}
        description="Team performance"
        icon={Clock}
        color="purple"
      />
      
      <StatsCard 
        title="Claims via WhatsApp"
        value={stats.claimsViaWhatsApp}
        description="Last 24 hours"
        icon={AlertTriangle}
        color="red"
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
