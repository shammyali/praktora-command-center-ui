
import CustomerStatusBadge from "./CustomerStatusBadge";
import CustomerVipBadge from "./CustomerVipBadge";
import { Customer } from "@/services/api/praktoraWebApi";

interface CustomerBasicInfoProps {
  customer: Customer;
}

const CustomerBasicInfo = ({ customer }: CustomerBasicInfoProps) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">{customer.fullName}</h2>
            <CustomerVipBadge isVip={customer.isVip} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mt-3">
            <div>
              <p className="text-sm text-muted-foreground">Client Type</p>
              <p>{customer.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assigned Agent</p>
              <p>{customer.assignedAgent || "Not Assigned"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Source</p>
              <p>{customer.source || "Direct"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category/Group</p>
              <p>{customer.category || "Not Categorized"}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm text-muted-foreground">Client Status</p>
              <CustomerStatusBadge status={customer.status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBasicInfo;
