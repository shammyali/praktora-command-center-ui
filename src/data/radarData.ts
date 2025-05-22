
export type AlertPriority = "critical" | "attention" | "handled";

export type AlertType = 
  | "enquiry" 
  | "policy" 
  | "invoice" 
  | "chat" 
  | "opportunity";

export type AlertCategory = 
  | "quotes" 
  | "claims" 
  | "renewals" 
  | "communications" 
  | "finance" 
  | "opportunities";

export interface RadarAlert {
  id: string;
  title: string;
  type: AlertType;
  category: AlertCategory;
  client: string;
  agent: string;
  classType: string;
  elapsedTime: string;
  elapsedDays: number;
  suggestedAction: string;
  actionLink: string;
  priority: AlertPriority;
  isNew?: boolean;
  createdAt: string;
}

export interface AIOpportunity extends RadarAlert {
  potentialRevenue?: number;
  insight: string;
}

export interface RadarStats {
  totalActiveAlerts: number;
  avgAlertAge: number;
  resolvedToday: number;
  aiOpportunityScore: number;
  revenueAtRisk: number;
}

// Sample data for Radar alerts
export const radarAlerts: RadarAlert[] = [
  {
    id: "ra-001",
    title: "Quote MI-2026-119 not sent in 4 days",
    type: "enquiry",
    category: "quotes",
    client: "Al Maktoum Holdings",
    agent: "Sarah",
    classType: "Motor",
    elapsedTime: "4d overdue",
    elapsedDays: 4,
    suggestedAction: "Quote Now",
    actionLink: "/workflows/123",
    priority: "critical",
    isNew: true,
    createdAt: "2025-05-18T09:23:45Z"
  },
  {
    id: "ra-002",
    title: "Client renewal pending for policy PA-1429",
    type: "policy",
    category: "renewals",
    client: "Emirates Group",
    agent: "Kareem",
    classType: "Personal Accident",
    elapsedTime: "2d overdue",
    elapsedDays: 2,
    suggestedAction: "Start Renewal",
    actionLink: "/workflows/124",
    priority: "attention",
    createdAt: "2025-05-20T10:15:30Z"
  },
  {
    id: "ra-003",
    title: "Invoice #INV-2023-456 payment reminder",
    type: "invoice",
    category: "finance",
    client: "Etisalat",
    agent: "Ahmed",
    classType: "Liability",
    elapsedTime: "6d overdue",
    elapsedDays: 6,
    suggestedAction: "Send Reminder",
    actionLink: "/workflows/125",
    priority: "critical",
    createdAt: "2025-05-16T14:22:10Z"
  },
  {
    id: "ra-004",
    title: "WhatsApp query unanswered",
    type: "chat",
    category: "communications",
    client: "Dubai Properties",
    agent: "Fatima",
    classType: "Property",
    elapsedTime: "1d overdue",
    elapsedDays: 1,
    suggestedAction: "Respond Now",
    actionLink: "/whatsapp/126",
    priority: "attention",
    createdAt: "2025-05-21T08:45:12Z"
  },
  {
    id: "ra-005",
    title: "Claim processing delayed for CL-9078",
    type: "policy",
    category: "claims",
    client: "ADNOC",
    agent: "Mohammed",
    classType: "Marine",
    elapsedTime: "3d overdue",
    elapsedDays: 3,
    suggestedAction: "Escalate",
    actionLink: "/workflows/127",
    priority: "critical",
    createdAt: "2025-05-19T11:30:40Z"
  },
  {
    id: "ra-006",
    title: "Life policy quote accepted but not bound",
    type: "policy",
    category: "quotes",
    client: "Sheikh Abdullah",
    agent: "Omar",
    classType: "Life",
    elapsedTime: "5d overdue",
    elapsedDays: 5,
    suggestedAction: "Complete Binding",
    actionLink: "/workflows/128",
    priority: "critical",
    createdAt: "2025-05-17T16:20:15Z"
  },
  {
    id: "ra-007",
    title: "Email query regarding medical policy",
    type: "chat",
    category: "communications",
    client: "Jumeirah Group",
    agent: "Layla",
    classType: "Medical",
    elapsedTime: "8h overdue",
    elapsedDays: 0.33,
    suggestedAction: "Respond Now",
    actionLink: "/emails/129",
    priority: "attention",
    isNew: true,
    createdAt: "2025-05-21T20:10:25Z"
  },
  {
    id: "ra-008",
    title: "Policy document not delivered to client",
    type: "policy",
    category: "renewals",
    client: "Masdar",
    agent: "Tariq",
    classType: "Engineering",
    elapsedTime: "2d overdue",
    elapsedDays: 2,
    suggestedAction: "Send Documents",
    actionLink: "/workflows/130",
    priority: "attention",
    createdAt: "2025-05-20T13:05:50Z"
  }
];

// Sample data for AI opportunities
export const aiOpportunities: AIOpportunity[] = [
  {
    id: "ai-001",
    title: "Cross-sell opportunity identified",
    type: "opportunity",
    category: "opportunities",
    client: "Al Maktoum Holdings",
    agent: "Sarah",
    classType: "Life & Personal Accident",
    elapsedTime: "New insight",
    elapsedDays: 0,
    suggestedAction: "Create Quote",
    actionLink: "/workflows/new",
    priority: "attention",
    isNew: true,
    createdAt: "2025-05-22T07:30:00Z",
    potentialRevenue: 45000,
    insight: "Client has 5 active policies and no Life or Personal Accident coverage. Flag for cross-sell?"
  },
  {
    id: "ai-002",
    title: "Insurer selection strategy change",
    type: "opportunity",
    category: "opportunities",
    client: "Multiple",
    agent: "Team",
    classType: "All",
    elapsedTime: "Trend detected",
    elapsedDays: 0,
    suggestedAction: "Review Strategy",
    actionLink: "/intelligence",
    priority: "attention",
    createdAt: "2025-05-22T08:15:20Z",
    insight: "You've quoted Orient 19 times this month — 14 rejected. Suggest switch strategy?"
  },
  {
    id: "ai-003",
    title: "WhatsApp follow-up needed",
    type: "chat",
    category: "communications",
    client: "Multiple",
    agent: "Team",
    classType: "Various",
    elapsedTime: "48h+ gap",
    elapsedDays: 2,
    suggestedAction: "Follow Up",
    actionLink: "/whatsapp",
    priority: "critical",
    createdAt: "2025-05-20T09:45:10Z",
    insight: "7 clients responded on WhatsApp 48+ hours ago with no broker follow-up."
  }
];

// Radar statistics
export const radarStats: RadarStats = {
  totalActiveAlerts: 41,
  avgAlertAge: 2.8,
  resolvedToday: 19,
  aiOpportunityScore: 92.4,
  revenueAtRisk: 248000
};

// Filter options
export const classTypes = ["Motor", "Medical", "Life", "Property", "Marine", "Engineering", "Liability", "Personal Accident", "All"];
export const sourceTypes = ["WhatsApp", "Portal", "Email", "Agent", "System", "All"];
export const agentsList = ["Sarah", "Kareem", "Ahmed", "Fatima", "Mohammed", "Omar", "Layla", "Tariq", "All"];
export const ageRanges = [">24h", ">48h", ">72h", "All"];
export const urgencyLevels = ["All", "Urgent Only", "Actioned"];
