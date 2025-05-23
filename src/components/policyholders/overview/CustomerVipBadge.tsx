
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CustomerVipBadgeProps {
  isVip: boolean;
}

const CustomerVipBadge = ({ isVip }: CustomerVipBadgeProps) => {
  if (!isVip) return null;
  
  return (
    <Badge className="bg-amber-500">
      <Star className="h-3 w-3 mr-1" />
      VIP
    </Badge>
  );
};

export default CustomerVipBadge;
