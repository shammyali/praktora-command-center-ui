
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon } from "lucide-react";

const KycRiskSummary = () => {
  // Sample data - would be replaced with real data from API
  const kycData = {
    kycStatus: "completed", // completed, expired, incomplete
    pepFlag: false,
    sanctionsCheck: "cleared", // flagged, cleared
    riskRating: "medium", // high, medium, low
    creditScore: "658 / 850",
    outstandingBalance: "AED 15,220",
    lastKycReview: "02-Apr-2026",
    lastRiskUpdate: "15-Mar-2026",
    aiNote: "Medium risk due to 2 rejected claims and overdue premium."
  };

  const getBadgeColor = (status: string | boolean, type: string) => {
    if (type === "kyc") {
      return status === "completed" ? "bg-green-500" : status === "expired" ? "bg-red-500" : "bg-amber-500";
    } else if (type === "pep") {
      return status ? "bg-red-500" : "bg-green-500";
    } else if (type === "sanctions") {
      return status === "flagged" ? "bg-red-500" : "bg-green-500"; 
    } else if (type === "risk") {
      return status === "high" ? "bg-red-500" : status === "medium" ? "bg-amber-500" : "bg-green-500";
    }
    return "bg-gray-500";
  };

  const getStatusText = (status: string | boolean, type: string) => {
    if (type === "kyc") {
      return status === "completed" ? "Completed" : status === "expired" ? "Expired" : "Incomplete";
    } else if (type === "pep") {
      return status ? "Yes" : "No";
    } else if (type === "sanctions") {
      return status === "flagged" ? "Flagged" : "Cleared";
    } else if (type === "risk") {
      return typeof status === "string" ? status.charAt(0).toUpperCase() + status.slice(1) : "";
    }
    return String(status);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">KYC & Risk Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">KYC Status</p>
            <Badge className={getBadgeColor(kycData.kycStatus, "kyc")}>
              {kycData.kycStatus === "completed" ? "✅" : kycData.kycStatus === "expired" ? "❌" : "⏳"} {getStatusText(kycData.kycStatus, "kyc")}
            </Badge>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">PEP Flag</p>
            <Badge className={getBadgeColor(kycData.pepFlag, "pep")}>
              {kycData.pepFlag ? "❗" : "✅"} {getStatusText(kycData.pepFlag, "pep")}
            </Badge>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Sanctions Check</p>
            <Badge className={getBadgeColor(kycData.sanctionsCheck, "sanctions")}>
              {getStatusText(kycData.sanctionsCheck, "sanctions")}
            </Badge>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Risk Rating</p>
            <Badge className={getBadgeColor(kycData.riskRating, "risk")}>
              {getStatusText(kycData.riskRating, "risk")}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Credit Score</p>
            <p className="font-medium">{kycData.creditScore}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Outstanding Balance</p>
            <p className="font-medium">{kycData.outstandingBalance}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last KYC Review</p>
            <p className="font-medium">{kycData.lastKycReview}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Risk Update</p>
            <p className="font-medium">{kycData.lastRiskUpdate}</p>
          </div>
        </div>
        
        <div className="bg-[#9C2D55]/5 p-4 rounded-md border border-[#9C2D55]/10 flex gap-3">
          <SparklesIcon className="h-5 w-5 text-[#9C2D55] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm mb-1">P²RA Note</p>
            <p className="text-sm">{kycData.aiNote}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycRiskSummary;
