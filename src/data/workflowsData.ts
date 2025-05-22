
export interface WorkflowItem {
  id: string;
  clientName: string;
  insuranceClass?: string;
  assignedAgent: string;
  currentStage: string;
  ageInDays: number;
  priority: 'low' | 'medium' | 'high';
  expiryDate?: string;
  priorInsurer?: string;
  retentionNotes?: string;
  endorsementType?: 'Add' | 'Remove' | 'Modify';
  linkedPolicy?: string;
  daysInRequest?: number;
  claimId?: string;
  filesAttached?: number;
  timeInStage?: string;
}

export interface WorkflowsData {
  newBusiness: WorkflowItem[];
  renewals: WorkflowItem[];
  endorsements: WorkflowItem[];
  claims: WorkflowItem[];
}

export const workflowsData: WorkflowsData = {
  newBusiness: [
    {
      id: "NB-2023-001",
      clientName: "Emirati Holdings LLC",
      insuranceClass: "Motor Fleet",
      assignedAgent: "Ahmed K.",
      currentStage: "Quote Ready",
      ageInDays: 3,
      priority: 'high'
    },
    {
      id: "NB-2023-002",
      clientName: "Al Mana Group",
      insuranceClass: "Medical Group",
      assignedAgent: "Sara L.",
      currentStage: "In Process",
      ageInDays: 1,
      priority: 'medium'
    },
    {
      id: "NB-2023-003",
      clientName: "Dubai Star Properties",
      insuranceClass: "Property",
      assignedAgent: "Mohammed R.",
      currentStage: "Awaiting Client Confirmation",
      ageInDays: 5,
      priority: 'low'
    }
  ],
  renewals: [
    {
      id: "RN-2023-001",
      clientName: "Global Trade Center",
      insuranceClass: "Liability",
      assignedAgent: "Fatima Q.",
      currentStage: "Renewal Notice Sent",
      ageInDays: 12,
      priority: 'high',
      expiryDate: "2023-12-15",
      priorInsurer: "AXA Insurance",
      retentionNotes: "Client has been with us for 3 years, price sensitive"
    },
    {
      id: "RN-2023-002",
      clientName: "Al Fardan Jewellery",
      insuranceClass: "Specialty",
      assignedAgent: "Hassan Z.",
      currentStage: "Under Renewal Follow-up",
      ageInDays: 7,
      priority: 'medium',
      expiryDate: "2023-12-23",
      priorInsurer: "Oman Insurance",
      retentionNotes: "VIP client, service quality is key priority"
    }
  ],
  endorsements: [
    {
      id: "EN-2023-001",
      clientName: "Sharjah Industrial Group",
      assignedAgent: "Layla M.",
      currentStage: "Sent to Insurer",
      ageInDays: 2,
      priority: 'medium',
      endorsementType: "Add",
      linkedPolicy: "POL-2023-0472",
      daysInRequest: 4
    }
  ],
  claims: [
    {
      id: "CL-2023-001",
      clientName: "Abu Dhabi Coast Hotels",
      assignedAgent: "Omar J.",
      currentStage: "Awaiting Survey",
      ageInDays: 8,
      priority: 'high',
      claimId: "CLM-4582",
      linkedPolicy: "POL-2022-7865",
      filesAttached: 5,
      timeInStage: "3d 4h"
    }
  ]
};
