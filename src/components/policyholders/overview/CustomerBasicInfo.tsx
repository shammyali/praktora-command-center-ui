
import { Customer } from "@/services/api/praktoraWebApi";
import CustomerStatusBadge from "./CustomerStatusBadge";
import CustomerVipBadge from "./CustomerVipBadge";
import { User, Building2, Users, GitBranch } from "lucide-react";
interface CustomerBasicInfoProps {
  customer: Customer;
}
const CustomerBasicInfo = ({
  customer
}: CustomerBasicInfoProps) => {
  return <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-semibold">{customer.fullName}</h2>
        <CustomerVipBadge isVip={customer.isVip} />
      </div>
      
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Type:</span>
          <span className="text-xs font-medium">{customer.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Agent:</span>
          <span className="text-xs font-medium">{customer.assignedAgent || "Not Assigned"}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">CRM:</span>
          <span className="text-xs font-medium">{customer.assignedAgent || "Not Assigned"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Group:</span>
          <span className="text-xs font-medium">{customer.category || "None"}</span>
        </div>
      </div>
      <div className="mt-1">
        <CustomerStatusBadge status={customer.status} />
      </div>
    </div>;
};
export default CustomerBasicInfo;
