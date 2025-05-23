
import { Customer } from "@/services/api/praktoraWebApi";
import CustomerStatusBadge from "./CustomerStatusBadge";
import CustomerVipBadge from "./CustomerVipBadge";
import { User, Building2, Users, GitBranch } from "lucide-react";

interface CustomerBasicInfoProps {
  customer: Customer;
}

const CustomerBasicInfo = ({ customer }: CustomerBasicInfoProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-semibold">{customer.fullName}</h2>
        <CustomerVipBadge isVip={customer.isVip} />
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <CustomerInfoItem 
          label="Type" 
          value={customer.type} 
          icon={<User className="h-3 w-3 text-muted-foreground" />}
        />
        <CustomerInfoItem 
          label="Agent" 
          value={customer.assignedAgent || "Not Assigned"} 
          icon={<Users className="h-3 w-3 text-muted-foreground" />}
        />
        <CustomerInfoItem 
          label="Source" 
          value={customer.source || "Direct"} 
          icon={<GitBranch className="h-3 w-3 text-muted-foreground" />}
        />
        <CustomerInfoItem 
          label="Group" 
          value={customer.category || "None"} 
          icon={<Building2 className="h-3 w-3 text-muted-foreground" />}
        />
      </div>
      <div className="mt-1">
        <CustomerStatusBadge status={customer.status} />
      </div>
    </div>
  );
};

interface CustomerInfoItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const CustomerInfoItem = ({ label, value, icon }: CustomerInfoItemProps) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <div>
        <p className="text-xs text-muted-foreground">{label}:</p>
        <p className="text-xs font-medium">{value}</p>
      </div>
    </div>
  );
};

export default CustomerBasicInfo;
