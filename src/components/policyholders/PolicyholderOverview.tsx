
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Customer } from "@/services/api/praktoraWebApi";
import CustomerBasicInfo from "./overview/CustomerBasicInfo";
import CustomerProfileImage from "./overview/CustomerProfileImage";
import CustomerContactInfo from "./overview/CustomerContactInfo";
import CustomerKycStatus from "./overview/CustomerKycStatus";

interface PolicyholderOverviewProps {
  customer: Customer;
}

const PolicyholderOverview = ({ customer }: PolicyholderOverviewProps) => {
  // Set or update VIP status
  const handleVipStatusChange = (checked: boolean) => {
    toast.success(`${checked ? 'Set' : 'Removed'} VIP status for ${customer.fullName}`);
    // In a real implementation, this would update the customer data via API
  };

  return (
    <Card className="border-t-2 border-t-[#9C2D55]">
      <CardContent className="p-3">
        <div className="flex flex-wrap items-center gap-4">
          {/* Profile image */}
          <div className="flex-shrink-0">
            <CustomerProfileImage 
              profileImage={customer.profileImage} 
              fullName={customer.fullName}
              type={customer.type}
            />
          </div>
          
          {/* Customer info */}
          <div className="flex-grow">
            <CustomerBasicInfo customer={customer} />
          </div>
        </div>
        
        {/* Contact and KYC info in a single row */}
        <div className="flex flex-wrap items-center justify-between mt-2">
          <div className="flex items-center gap-10">
            {/* Contact info */}
            <CustomerContactInfo 
              email={customer.email}
              mobile={customer.mobile}
              isVip={customer.isVip}
              fullName={customer.fullName}
              onVipStatusChange={handleVipStatusChange}
            />
            
            {/* KYC status */}
            <CustomerKycStatus 
              kycStatus={customer.kycCompletionStatus}
              kycPercentage={customer.kycCompletionPercentage}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyholderOverview;
