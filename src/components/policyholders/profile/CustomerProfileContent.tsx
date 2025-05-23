
import { Customer } from "@/services/api/praktoraWebApi";
import PolicyholderOverview from "../PolicyholderOverview";
import PortfolioTracker from "../PortfolioTracker";
import KycRiskSummary from "../KycRiskSummary";
import DocumentTracker from "../DocumentTracker";
import ComplaintHistory from "../ComplaintHistory";
import LinkedEntities from "../LinkedEntities";
import InternalNotes from "../InternalNotes";
import SmartActionsBar from "../SmartActionsBar";

interface CustomerProfileContentProps {
  customer: Customer;
}

const CustomerProfileContent = ({ customer }: CustomerProfileContentProps) => {
  return (
    <>
      {/* Section 1: Policyholder Overview Panel */}
      <PolicyholderOverview customer={customer} />
      
      {/* Section 2: Portfolio Tracker */}
      <PortfolioTracker />
      
      {/* Main content sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-6">
          {/* Section 3: KYC & Risk Summary */}
          <KycRiskSummary />
          
          {/* Section 4: Document Tracker */}
          <DocumentTracker />
          
          {/* Section 5: Complaint & Escalation History */}
          <ComplaintHistory />
        </div>
        
        <div className="grid gap-6">
          {/* Section 6: Linked Entities */}
          <LinkedEntities customerId={customer.id} />
          
          {/* Section 7: Internal Notes & Flags */}
          <InternalNotes customerId={customer.id} />
        </div>
      </div>
      
      {/* Section 8: Smart Actions Bar */}
      <SmartActionsBar />
    </>
  );
};

export default CustomerProfileContent;
