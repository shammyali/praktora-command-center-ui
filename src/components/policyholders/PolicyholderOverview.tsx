
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
      <CardContent className="p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Customer basic info - 5 cols on large screens */}
          <div className="col-span-12 md:col-span-5">
            <CustomerBasicInfo customer={customer} />
          </div>
          
          {/* Profile image - 2 cols on large screens */}
          <div className="col-span-4 md:col-span-2 flex justify-center">
            <CustomerProfileImage 
              profileImage={customer.profileImage} 
              fullName={customer.fullName}
              type={customer.type}
            />
          </div>
          
          {/* Contact info - 3 cols on large screens */}
          <div className="col-span-8 md:col-span-3">
            <CustomerContactInfo 
              email={customer.email}
              mobile={customer.mobile}
              isVip={customer.isVip}
              fullName={customer.fullName}
              onVipStatusChange={handleVipStatusChange}
            />
          </div>
          
          {/* KYC status - 2 cols on large screens */}
          <div className="col-span-12 md:col-span-2">
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
