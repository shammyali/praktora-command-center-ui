
import { useState } from "react";
import { ActiveEngagement } from "@/components/command-center/types";

export const useActiveEngagements = () => {
  const [activeEngagements] = useState<ActiveEngagement[]>([
    {
      title: "Workmen's Compensation Renewal -",
      customerName: "Tom Robers",
      description: "Comprehensive coverage renewal assessment required",
      status: "Awaiting Confirmation",
      statusColor: "yellow" as const,
      animate: true,
      kycStatus: "NO" as const
    }, {
      title: "New Motor Quote -",
      customerName: "Abdullah Ali",
      description: "Comprehensive coverage proposal ready for review",
      status: "Quoted",
      statusColor: "yellow" as const,
      animate: false,
      kycStatus: "YES" as const
    }, {
      title: "Medical Claim -",
      customerName: "Vijay Singh",
      description: "Claim assessment completed and approved",
      status: "Claim Settled",
      statusColor: "green" as const,
      animate: false,
      kycStatus: "PEP" as const
    }, {
      title: "Risk Assessment",
      customerName: "Mohan Lal",
      description: "Complete risk profile for healthcare client",
      status: "In Progress",
      statusColor: "blue" as const,
      animate: false,
      kycStatus: "Request" as const
    }
  ]);

  return activeEngagements;
};
