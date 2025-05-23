
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserCheck } from "lucide-react";

interface CustomerKycStatusProps {
  kycStatus: "completed" | "incomplete" | "expiring";
  kycPercentage: number;
}

const CustomerKycStatus = ({ kycStatus, kycPercentage }: CustomerKycStatusProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">KYC Completion Status</h3>
        <Badge 
          className={
            kycStatus === "completed" ? "bg-green-500" : 
            kycStatus === "incomplete" ? "bg-red-500" : "bg-amber-500"
          }
        >
          <UserCheck className="h-3 w-3 mr-1" />
          {kycStatus === "completed" ? "Completed" : 
           kycStatus === "incomplete" ? "Incomplete" : "Expiring Soon"}
        </Badge>
      </div>
      <Progress 
        value={kycPercentage} 
        className="h-2" 
      />
    </div>
  );
};

export default CustomerKycStatus;
