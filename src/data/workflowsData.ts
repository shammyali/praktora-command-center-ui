
// Define the WorkflowItem interface
export interface WorkflowItem {
  id: string;
  clientName: string;
  assignedAgent: string;
  currentStage: string;
  ageInDays: number;
  priority: 'low' | 'medium' | 'high';
  insuranceClass?: string;
  endorsementType?: string;
}

// Sample list of workflows (simple list)
export const workflows = [
  { id: "WF1001", name: "New Business Quote" },
  { id: "WF1023", name: "Fleet Insurance Renewal" },
  { id: "WF1045", name: "Medical Claim Processing" },
  { id: "WF1067", name: "Property Insurance Endorsement" },
  { id: "WF1089", name: "Business Liability" },
  { id: "WF1101", name: "Multi-Property Portfolio" }
];

// Detailed workflow data for the workflow component
export const workflowsData = {
  newBusiness: [
    {
      id: "WF1001",
      clientName: "Dubai Holding",
      assignedAgent: "Ahmed K.",
      currentStage: "Quote Ready",
      ageInDays: 3,
      priority: "high" as const,
      insuranceClass: "Property & Casualty"
    },
    {
      id: "WF1089",
      clientName: "Al Futtaim",
      assignedAgent: "Sara L.",
      currentStage: "Awaiting Client Confirmation",
      ageInDays: 6,
      priority: "medium" as const,
      insuranceClass: "Business Liability"
    },
    {
      id: "WF1234",
      clientName: "Etisalat",
      assignedAgent: "Mohammed R.",
      currentStage: "In Process",
      ageInDays: 1,
      priority: "low" as const,
      insuranceClass: "Cyber Security"
    }
  ],
  renewals: [
    {
      id: "WF1023",
      clientName: "Etisalat",
      assignedAgent: "Fatima Q.",
      currentStage: "Under Renewal Process",
      ageInDays: 4,
      priority: "high" as const,
      insuranceClass: "Fleet Insurance"
    },
    {
      id: "WF2045",
      clientName: "Emirates NBD",
      assignedAgent: "Omar J.",
      currentStage: "Quote Confirmed",
      ageInDays: 2,
      priority: "medium" as const,
      insuranceClass: "D&O Insurance"
    }
  ],
  endorsements: [
    {
      id: "WF1067",
      clientName: "Emaar Properties",
      assignedAgent: "Layla M.",
      currentStage: "Sent to Insurer",
      ageInDays: 7,
      priority: "medium" as const,
      endorsementType: "Property Addition"
    }
  ],
  claims: [
    {
      id: "WF3078",
      clientName: "Nakheel",
      assignedAgent: "Hassan Z.",
      currentStage: "Awaiting Survey",
      ageInDays: 5,
      priority: "high" as const,
      insuranceClass: "Property Damage"
    }
  ]
};
