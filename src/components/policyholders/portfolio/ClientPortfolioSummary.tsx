
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ClientPortfolioSummary as ClientPortfolioSummaryType } from "@/services/api/types/portfolioTypes";
import { 
  FilePen, Bell, ClipboardCheck, AlertTriangle, 
  CreditCard, RefreshCw, Clock, PieChart, 
  DollarSign, Star, Users, Brain 
} from "lucide-react";
import SummaryCard from "./SummaryCard";
import PRAIntelligenceCard from "./PRAIntelligenceCard";

interface ClientPortfolioSummaryProps {
  portfolioSummary: ClientPortfolioSummaryType;
  isLoading?: boolean;
}

const ClientPortfolioSummary = ({ 
  portfolioSummary, 
  isLoading = false 
}: ClientPortfolioSummaryProps) => {
  const sendReminder = () => {
    // Implement send reminder action
  };
  
  const requestRenewal = () => {
    // Implement request renewal action
  };
  
  const assignTask = () => {
    // Implement assign task action
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Loading placeholders */}
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4 h-32">
              <div className="h-4 w-1/2 bg-muted rounded mb-4"></div>
              <div className="h-8 w-full bg-muted rounded mb-3"></div>
              <div className="h-4 w-2/3 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Client Portfolio Summary</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={sendReminder}>
            <Bell className="mr-1 h-3 w-3" /> Send Reminder
          </Button>
          <Button variant="outline" size="sm" onClick={requestRenewal}>
            <RefreshCw className="mr-1 h-3 w-3" /> Request Renewal
          </Button>
          <Button variant="outline" size="sm" onClick={assignTask}>
            <ClipboardCheck className="mr-1 h-3 w-3" /> Assign Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Row 1 */}
        <SummaryCard 
          title="Total Policies"
          value={portfolioSummary.policies.total.toString()}
          subtitle={`Active: ${portfolioSummary.policies.active}, Lapsed: ${portfolioSummary.policies.lapsed}, Cancelled: ${portfolioSummary.policies.cancelled}`}
          icon={<FilePen />}
          status={portfolioSummary.policies.active > portfolioSummary.policies.lapsed ? "positive" : "warning"}
        />
        
        <SummaryCard 
          title="Enquiry Volume"
          value={portfolioSummary.enquiries.total.toString()}
          subtitle={`Conversion: ${portfolioSummary.enquiries.conversionRate}%`}
          icon={<Bell />}
          status={portfolioSummary.enquiries.conversionRate > 50 ? "positive" : "neutral"}
        />
        
        <SummaryCard 
          title="Claim Status"
          value={`${portfolioSummary.claims.total} Claims`}
          subtitle={`${portfolioSummary.claims.open} Open, ${portfolioSummary.claims.rejected} Rejected, ${portfolioSummary.claims.settled} Settled`}
          icon={<AlertTriangle />}
          status={portfolioSummary.claims.open > 0 ? "warning" : "positive"}
        />
        
        <SummaryCard 
          title="Open Tasks"
          value={`${portfolioSummary.tasks.total} Tasks`}
          subtitle={portfolioSummary.tasks.overdue > 0 ? `${portfolioSummary.tasks.overdue} Overdue` : "On Schedule"}
          icon={<ClipboardCheck />}
          status={portfolioSummary.tasks.overdue > 0 ? "negative" : "positive"}
        />

        {/* Row 2 */}
        <SummaryCard 
          title="Premium Paid (YTD)"
          value={`AED ${portfolioSummary.financial.premiumPaidYTD.toLocaleString()}`}
          icon={<CreditCard />}
          status="neutral"
        />
        
        <SummaryCard 
          title="Renewal Risk"
          value={`${portfolioSummary.renewals.policiesExpiringIn30Days} Policies`}
          subtitle="Expiring in 30 days"
          icon={<RefreshCw />}
          status={portfolioSummary.renewals.policiesExpiringIn30Days > 0 ? "warning" : "positive"}
        />
        
        <SummaryCard 
          title="Average Quote Time"
          value={`${portfolioSummary.performance.averageQuoteTimeDays} Days`}
          icon={<Clock />}
          status="neutral"
        />
        
        <SummaryCard 
          title="Claim Ratio"
          value={`${portfolioSummary.performance.claimRatio}%`}
          subtitle={portfolioSummary.performance.isClaimRatioHigh ? "Higher than average" : "Within average"}
          icon={<PieChart />}
          status={portfolioSummary.performance.isClaimRatioHigh ? "negative" : "positive"}
        />

        {/* Row 3 */}
        <SummaryCard 
          title="Net Collection Due"
          value={`AED ${portfolioSummary.financial.netCollectionDue.toLocaleString()}`}
          subtitle={portfolioSummary.financial.netCollectionDue > 0 ? "Outstanding" : "Fully Paid"}
          icon={<DollarSign />}
          status={portfolioSummary.financial.netCollectionDue > 0 ? "negative" : "positive"}
        />
        
        <SummaryCard 
          title="VIP Status"
          value={portfolioSummary.linked.parentEntity ? "VIP Client" : "Standard"}
          icon={<Star />}
          status={portfolioSummary.linked.parentEntity ? "positive" : "neutral"}
        />
        
        <SummaryCard 
          title="Group Link"
          value={portfolioSummary.linked.parentEntity || "None"}
          subtitle={portfolioSummary.linked.linkedEntitiesCount > 0 
            ? `${portfolioSummary.linked.linkedEntitiesCount} linked entities` 
            : "No linked entities"}
          icon={<Users />}
          status="neutral"
        />
        
        {/* P²RA Intelligence - Takes up 1 column */}
        <PRAIntelligenceCard 
          intelligenceSummary={portfolioSummary.praIntelligence}
        />
      </div>
    </div>
  );
};

export default ClientPortfolioSummary;
