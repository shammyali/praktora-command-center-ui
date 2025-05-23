
import { Customer } from "@/services/api/praktoraWebApi";
import CustomerStatusBadge from "./CustomerStatusBadge";
import CustomerVipBadge from "./CustomerVipBadge";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { User, Building2, Users, GitBranch } from "lucide-react";

interface CustomerBasicInfoProps {
  customer: Customer;
}

const CustomerBasicInfo = ({ customer }: CustomerBasicInfoProps) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-4">
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-semibold">{customer.fullName}</h2>
            <CustomerVipBadge isVip={customer.isVip} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            <CustomerInfoItem 
              label="Client Type" 
              value={customer.type} 
              icon={<User className="h-4 w-4 text-muted-foreground" />}
            />
            <CustomerInfoItem 
              label="Assigned Agent" 
              value={customer.assignedAgent || "Not Assigned"} 
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <CustomerInfoItem 
              label="Source" 
              value={customer.source || "Direct"} 
              icon={<GitBranch className="h-4 w-4 text-muted-foreground" />}
            />
            <CustomerInfoItem 
              label="Category/Group" 
              value={customer.category || "Not Categorized"} 
              icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            />
            <div className="col-span-1 md:col-span-2 mt-2">
              <p className="text-sm text-muted-foreground mb-1">Client Status</p>
              <CustomerStatusBadge status={customer.status} />
            </div>
          </div>
        </div>
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
    <div className="flex items-start gap-2">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

export default CustomerBasicInfo;
