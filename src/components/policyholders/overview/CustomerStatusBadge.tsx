
import { Badge } from "@/components/ui/badge";

interface CustomerStatusBadgeProps {
  status: "Active" | "Inactive" | "Dormant" | "Suspended";
}

const CustomerStatusBadge = ({ status }: CustomerStatusBadgeProps) => {
  return (
    <Badge 
      className={
        status === "Active" ? "bg-green-500" : 
        status === "Inactive" ? "bg-gray-500" :
        status === "Dormant" ? "bg-amber-500" : "bg-red-500"
      }
    >
      {status}
    </Badge>
  );
};

export default CustomerStatusBadge;
