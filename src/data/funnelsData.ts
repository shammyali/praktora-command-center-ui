
interface FunnelStage {
  name: string;
  count: number;
  previousCount?: number;
  trend: number; // percentage change compared to previous period
}

export interface FunnelData {
  class: string;
  stages: FunnelStage[];
}

export interface InsightCard {
  title: string;
  description: string;
  metric?: string;
  type: "warning" | "info" | "success";
  action: string;
}

// Sample funnel data
export const funnelsData: FunnelData[] = [
  {
    class: "Motor Individual",
    stages: [
      { name: "Enquiry Received", count: 1220, previousCount: 1050, trend: 16.2 },
      { name: "Quoted", count: 960, previousCount: 810, trend: 18.5 },
      { name: "Client Followed Up", count: 711, previousCount: 620, trend: 14.7 },
      { name: "Client Confirmed", count: 423, previousCount: 390, trend: 8.5 },
      { name: "Policy Issued", count: 412, previousCount: 385, trend: 7.0 },
      { name: "Invoiced", count: 399, previousCount: 380, trend: 5.0 },
      { name: "Customer Settled", count: 372, previousCount: 365, trend: 1.9 },
    ],
  },
  {
    class: "Medical Individual",
    stages: [
      { name: "Enquiry Received", count: 850, previousCount: 790, trend: 7.6 },
      { name: "Quoted", count: 720, previousCount: 650, trend: 10.8 },
      { name: "Client Followed Up", count: 580, previousCount: 510, trend: 13.7 },
      { name: "Client Confirmed", count: 240, previousCount: 220, trend: 9.1 },
      { name: "Policy Issued", count: 230, previousCount: 215, trend: 7.0 },
      { name: "Invoiced", count: 225, previousCount: 210, trend: 7.1 },
      { name: "Customer Settled", count: 210, previousCount: 195, trend: 7.7 },
    ],
  },
  {
    class: "Travel",
    stages: [
      { name: "Enquiry Received", count: 640, previousCount: 520, trend: 23.1 },
      { name: "Quoted", count: 590, previousCount: 480, trend: 22.9 },
      { name: "Client Followed Up", count: 510, previousCount: 410, trend: 24.4 },
      { name: "Client Confirmed", count: 420, previousCount: 340, trend: 23.5 },
      { name: "Policy Issued", count: 418, previousCount: 338, trend: 23.7 },
      { name: "Invoiced", count: 416, previousCount: 335, trend: 24.2 },
      { name: "Customer Settled", count: 410, previousCount: 330, trend: 24.2 },
    ],
  },
  {
    class: "General Corporate",
    stages: [
      { name: "Enquiry Received", count: 320, previousCount: 290, trend: 10.3 },
      { name: "Quoted", count: 280, previousCount: 250, trend: 12.0 },
      { name: "Client Followed Up", count: 210, previousCount: 190, trend: 10.5 },
      { name: "Client Confirmed", count: 125, previousCount: 110, trend: 13.6 },
      { name: "Policy Issued", count: 120, previousCount: 105, trend: 14.3 },
      { name: "Invoiced", count: 115, previousCount: 105, trend: 9.5 },
      { name: "Customer Settled", count: 110, previousCount: 100, trend: 10.0 },
    ],
  },
  {
    class: "Group Medical",
    stages: [
      { name: "Enquiry Received", count: 180, previousCount: 160, trend: 12.5 },
      { name: "Quoted", count: 150, previousCount: 130, trend: 15.4 },
      { name: "Client Followed Up", count: 120, previousCount: 105, trend: 14.3 },
      { name: "Client Confirmed", count: 60, previousCount: 50, trend: 20.0 },
      { name: "Policy Issued", count: 58, previousCount: 48, trend: 20.8 },
      { name: "Invoiced", count: 58, previousCount: 48, trend: 20.8 },
      { name: "Customer Settled", count: 55, previousCount: 45, trend: 22.2 },
    ],
  },
  {
    class: "Group Life",
    stages: [
      { name: "Enquiry Received", count: 110, previousCount: 95, trend: 15.8 },
      { name: "Quoted", count: 90, previousCount: 80, trend: 12.5 },
      { name: "Client Followed Up", count: 75, previousCount: 65, trend: 15.4 },
      { name: "Client Confirmed", count: 45, previousCount: 35, trend: 28.6 },
      { name: "Policy Issued", count: 44, previousCount: 34, trend: 29.4 },
      { name: "Invoiced", count: 44, previousCount: 34, trend: 29.4 },
      { name: "Customer Settled", count: 42, previousCount: 33, trend: 27.3 },
    ],
  },
  {
    class: "Marine / Life / Property",
    stages: [
      { name: "Enquiry Received", count: 90, previousCount: 80, trend: 12.5 },
      { name: "Quoted", count: 70, previousCount: 60, trend: 16.7 },
      { name: "Client Followed Up", count: 55, previousCount: 45, trend: 22.2 },
      { name: "Client Confirmed", count: 25, previousCount: 20, trend: 25.0 },
      { name: "Policy Issued", count: 24, previousCount: 20, trend: 20.0 },
      { name: "Invoiced", count: 24, previousCount: 20, trend: 20.0 },
      { name: "Customer Settled", count: 22, previousCount: 18, trend: 22.2 },
    ],
  },
];

// Filter options
export const filterOptions = {
  classes: ["Motor Individual", "Medical Individual", "Travel", "General Corporate", "Group Medical", "Group Life", "Marine / Life / Property"],
  channels: ["WhatsApp", "Email", "Portal", "Agent", "Direct"],
  agents: ["Ahmed K.", "Sara L.", "Mohammed R.", "Fatima Q.", "Hassan Z.", "Layla M.", "Omar J."],
  insurers: ["AXA", "RSA", "Cigna", "MetLife", "Orient", "Daman", "Takaful", "Emirates"],
  timePeriods: ["This Month", "Last Month", "Last 3 Months", "Last 6 Months", "This Year", "Last Year"],
  policyValueTiers: ["All", "< AED 5K", "AED 5K - 20K", "AED 20K - 50K", "> AED 50K"],
};

// AI Insights
export const insightCards: InsightCard[] = [
  {
    title: "Medical Individual Conversions Below Benchmark",
    description: "Medical Individual quotes are converting at 19% — below benchmark (41%)",
    metric: "-22%",
    type: "warning",
    action: "Assign to Trainer"
  },
  {
    title: "AXA Medical Client Follow-up Issue",
    description: "AXA Medical quotes are 28% more likely to stall at 'Client Follow-up' than RSA — review template",
    metric: "+28%",
    type: "warning",
    action: "Update Template"
  },
  {
    title: "WhatsApp Channel Outperforming",
    description: "WhatsApp quotes convert 1.6x better than Email — suggest lead channel preference",
    metric: "+160%",
    type: "success",
    action: "Create New Reminder Rule"
  },
  {
    title: "Group Medical High Value Drop-offs",
    description: "High-value Group Medical quotes (>AED 50K) are 3x more likely to drop at invoice stage",
    metric: "3x risk",
    type: "warning",
    action: "Create Payment Plan Template"
  },
  {
    title: "Travel Insurance Quick Wins",
    description: "Travel insurance quotes have fastest time-to-settlement (avg 2.1 days)",
    metric: "2.1 days",
    type: "info",
    action: "Replicate Process for Other Classes"
  }
];
