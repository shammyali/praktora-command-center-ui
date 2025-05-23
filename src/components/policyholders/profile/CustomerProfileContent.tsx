
import { Customer } from "@/services/api/praktoraWebApi";
import PolicyholderOverview from "../PolicyholderOverview";
import KycRiskSummary from "../KycRiskSummary";
import DocumentTracker from "../DocumentTracker";
import ComplaintHistory from "../ComplaintHistory";
import LinkedEntities from "../LinkedEntities";
import InternalNotes from "../InternalNotes";
import SmartActionsBar from "../SmartActionsBar";
import ClientPortfolioSummary from "../portfolio/ClientPortfolioSummary";
import { useClientPortfolio } from "@/hooks/useClientPortfolio";
import { PortfolioTabs } from "./tabs";

interface CustomerProfileContentProps {
  customer: Customer;
}

const CustomerProfileContent = ({ customer }: CustomerProfileContentProps) => {
  const { portfolioSummary, isLoading: isLoadingPortfolio } = useClientPortfolio(customer.id);
  
  return (
    <>
      {/* Section 1: Policyholder Overview Panel */}
      <PolicyholderOverview customer={customer} />
      
      {/* Section 2: Client Portfolio Summary */}
      {portfolioSummary ? (
        <ClientPortfolioSummary 
          portfolioSummary={portfolioSummary} 
          isLoading={isLoadingPortfolio} 
        />
      ) : (
        <ClientPortfolioSummary 
          portfolioSummary={{
            policies: { total: 0, active: 0, lapsed: 0, cancelled: 0 },
            enquiries: { total: 0, conversionRate: 0 },
            claims: { total: 0, open: 0, rejected: 0, settled: 0 },
            tasks: { total: 0, overdue: 0 },
            financial: { premiumPaidYTD: 0, netCollectionDue: 0 },
            renewals: { policiesExpiringIn30Days: 0 },
            performance: { averageQuoteTimeDays: 0, claimRatio: 0, isClaimRatioHigh: false },
            linked: { linkedEntitiesCount: 0 },
            praIntelligence: "No intelligence available for this client."
          }}
          isLoading={isLoadingPortfolio}
        />
      )}
      
      {/* Section 3: Portfolio Tabs (replaces the old Portfolio Tracker) */}
      <PortfolioTabs />

      {/* Main content sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 grid gap-6">
          {/* Section 4: KYC & Risk Summary */}
          <KycRiskSummary />
          
          {/* Section 5: Document Tracker */}
          <DocumentTracker />
          
          {/* Section 6: Complaint & Escalation History */}
          <ComplaintHistory />
        </div>
        
        <div className="grid gap-6">
          {/* Section 7: Linked Entities */}
          <LinkedEntities customerId={customer.id} />
          
          {/* Section 8: Internal Notes & Flags */}
          <InternalNotes customerId={customer.id} />
        </div>
      </div>
      
      {/* Section 9: Smart Actions Bar */}
      <SmartActionsBar />
    </>
  );
};

export default CustomerProfileContent;
