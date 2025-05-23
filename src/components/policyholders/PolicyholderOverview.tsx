
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
          
          {/* Right side content */}
          <div className="flex flex-wrap md:flex-nowrap gap-6 w-full md:w-auto mt-2 md:mt-0">
            {/* Contact info */}
            <div className="w-full md:w-auto">
              <CustomerContactInfo 
                email={customer.email}
                mobile={customer.mobile}
                isVip={customer.isVip}
                fullName={customer.fullName}
                onVipStatusChange={handleVipStatusChange}
              />
            </div>
            
            {/* KYC status */}
            <div className="w-full md:w-auto">
              <CustomerKycStatus 
                kycStatus={customer.kycCompletionStatus}
                kycPercentage={customer.kycCompletionPercentage}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyholderOverview;
