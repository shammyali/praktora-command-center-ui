
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
      <div className="flex flex-col mb-1">
        <h3 className="font-medium text-sm">KYC Status</h3>
        <Badge 
          className={`text-xs mt-1 w-fit ${
            kycStatus === "completed" ? "bg-green-500" : 
            kycStatus === "incomplete" ? "bg-red-500" : "bg-amber-500"
          }`}
        >
          <UserCheck className="h-3 w-3 mr-0.5" />
          {kycStatus === "completed" ? "Complete" : 
           kycStatus === "incomplete" ? "Incomplete" : "Expiring"}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Progress 
          value={kycPercentage} 
          className="h-1.5 w-20 md:w-auto" 
        />
        <p className="text-xs whitespace-nowrap">{kycPercentage}%</p>
      </div>
    </div>
  );
};

export default CustomerKycStatus;
