
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
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium text-sm">KYC Status</h3>
        <Badge 
          className={`text-xs ${
            kycStatus === "completed" ? "bg-green-500" : 
            kycStatus === "incomplete" ? "bg-red-500" : "bg-amber-500"
          }`}
        >
          <UserCheck className="h-3 w-3 mr-0.5" />
          {kycStatus === "completed" ? "Complete" : 
           kycStatus === "incomplete" ? "Incomplete" : "Expiring"}
        </Badge>
      </div>
      <Progress 
        value={kycPercentage} 
        className="h-1.5" 
      />
      <p className="text-xs text-right mt-0.5">{kycPercentage}%</p>
    </div>
  );
};

export default CustomerKycStatus;
