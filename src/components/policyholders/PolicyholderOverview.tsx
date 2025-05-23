
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
    <Card className="border-t-4 border-t-[#9C2D55]">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Client basic info */}
          <CustomerBasicInfo customer={customer} />
          
          {/* Center column - Profile Image or Logo */}
          <CustomerProfileImage 
            profileImage={customer.profileImage} 
            fullName={customer.fullName}
            type={customer.type}
          />
          
          {/* Right column - Contact info and KYC status */}
          <div className="flex-1">
            <CustomerContactInfo 
              email={customer.email}
              mobile={customer.mobile}
              isVip={customer.isVip}
              fullName={customer.fullName}
              onVipStatusChange={handleVipStatusChange}
            />
            
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
