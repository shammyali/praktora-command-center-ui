
// Business Metrics
export interface BusinessMetric {
  name: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  changePercentage: string;
  sparklineData?: number[];
}

export interface BusinessMetrics {
  totalEnquiries: BusinessMetric;
  policiesIssued: BusinessMetric;
  claimsFiled: BusinessMetric;
  quotesSent: BusinessMetric;
  revenueEstimate: BusinessMetric;
  conversionRate: BusinessMetric;
  whatsappQuotes: BusinessMetric;
  emailQuotes: BusinessMetric;
}

// Operations Metrics
export interface OperationsMetric {
  name: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  changePercentage: string;
  details?: string;
}

export interface OperationsMetrics {
  enquiryToQuoteTime: OperationsMetric;
  issuePolicyTime: OperationsMetric;
  slaBreachRate: OperationsMetric;
  emailResponseTime: OperationsMetric;
  fnolToSettlement: OperationsMetric;
  enquiriesNotQuoted: OperationsMetric;
  claimsPendingSurvey: OperationsMetric;
}

// AI Insights
export interface InsightCard {
  id: string;
  text: string;
  category: 'what-happened' | 'patterns' | 'risks' | 'next-actions';
  priority?: 'high' | 'medium' | 'low';
  icon?: string;
  link?: string;
  actionable?: boolean;
}

// Mock Data
export const businessMetricsData: BusinessMetrics = {
  totalEnquiries: {
    name: "Total Enquiries",
    value: "1,229",
    trend: "up",
    changePercentage: "8%",
    sparklineData: [12, 15, 18, 14, 19, 16, 21]
  },
  policiesIssued: {
    name: "Policies Issued",
    value: "624",
    trend: "up",
    changePercentage: "12%",
    sparklineData: [8, 10, 12, 9, 11, 13, 14]
  },
  claimsFiled: {
    name: "Claims Filed",
    value: "91",
    trend: "down",
    changePercentage: "5%",
    sparklineData: [7, 5, 6, 4, 5, 3, 4]
  },
  quotesSent: {
    name: "Quotes Sent",
    value: "1,102",
    trend: "up",
    changePercentage: "7%",
    sparklineData: [20, 22, 18, 24, 21, 25, 27]
  },
  revenueEstimate: {
    name: "Revenue Estimate",
    value: "AED 1.47M",
    trend: "up",
    changePercentage: "15%",
    sparklineData: [140, 145, 150, 147, 160, 165, 170]
  },
  conversionRate: {
    name: "Quote-to-Policy Conversion",
    value: "54.3%",
    trend: "down",
    changePercentage: "2%",
    sparklineData: [56, 55, 54, 53, 54, 53, 52]
  },
  whatsappQuotes: {
    name: "WhatsApp Quotes",
    value: "491",
    trend: "up",
    changePercentage: "22%",
    sparklineData: [35, 38, 42, 45, 48, 52, 55]
  },
  emailQuotes: {
    name: "Email-Based Quotes",
    value: "212",
    trend: "down",
    changePercentage: "8%",
    sparklineData: [25, 23, 22, 20, 19, 18, 18]
  }
};

export const operationsMetricsData: OperationsMetrics = {
  enquiryToQuoteTime: {
    name: "Avg. Time Enquiry → Quote",
    value: "2h 42m",
    trend: "down",
    changePercentage: "12%",
    details: "Improved by 22min vs last month"
  },
  issuePolicyTime: {
    name: "Avg. Time to Issue Policy",
    value: "1.7 days",
    trend: "up",
    changePercentage: "5%",
    details: "Slowed by 2hrs vs last month"
  },
  slaBreachRate: {
    name: "SLA Breach Rate",
    value: "18.2%",
    trend: "down",
    changePercentage: "3%",
    details: "Improved, but above target of 15%"
  },
  emailResponseTime: {
    name: "Avg. Email Response Time",
    value: "2h 18m",
    trend: "down",
    changePercentage: "15%",
    details: "Best performance in 6 months"
  },
  fnolToSettlement: {
    name: "FNOL to Settlement (avg.)",
    value: "3.4 days",
    trend: "neutral",
    changePercentage: "0%",
    details: "Consistent with last month"
  },
  enquiriesNotQuoted: {
    name: "Enquiries Not Quoted in 48h",
    value: "71",
    trend: "down",
    changePercentage: "24%",
    details: "Major improvement from 94 last month"
  },
  claimsPendingSurvey: {
    name: "Claims Pending Survey",
    value: "12",
    trend: "up",
    changePercentage: "33%",
    details: "Increased from 9 last month"
  }
};

export const aiInsightsData: InsightCard[] = [
  // What Happened This Week
  {
    id: "wh1",
    text: "WhatsApp generated 46% of all quotes this week.",
    category: "what-happened",
    icon: "message-circle"
  },
  {
    id: "wh2",
    text: "Group Medical down 22% vs last week.",
    category: "what-happened",
    priority: "medium",
    icon: "heart-pulse"
  },
  {
    id: "wh3",
    text: "AXA delayed 8 quotes > 2 days — lowered conversion by 6%.",
    category: "what-happened",
    priority: "high",
    icon: "clock"
  },
  
  // Emerging Patterns
  {
    id: "ep1",
    text: "Client cross-sell success highest when FNOL is resolved < 4 days.",
    category: "patterns",
    icon: "git-merge"
  },
  {
    id: "ep2",
    text: "Motor quotes with photo ID attached convert at 72%.",
    category: "patterns",
    icon: "car"
  },
  {
    id: "ep3",
    text: "Life policy inquiries spike 30% after client turns 40.",
    category: "patterns",
    icon: "trending-up"
  },
  
  // Risks & Recommendations
  {
    id: "rr1",
    text: "Medical policies >100k often expire without follow-up. Suggest automated reminders.",
    category: "risks",
    priority: "high",
    icon: "alert-triangle"
  },
  {
    id: "rr2",
    text: "Unquoted enquiries after 72h lead to 63% drop in conversion.",
    category: "risks",
    priority: "high",
    icon: "clock"
  },
  {
    id: "rr3",
    text: "AXA policy delays impact renewal rates. Consider escalation protocol.",
    category: "risks",
    priority: "medium",
    icon: "repeat"
  },
  
  // What to Do Next
  {
    id: "na1",
    text: "Start renewal process for GP112 (expired 1 day ago)",
    category: "next-actions",
    actionable: true,
    priority: "high",
    icon: "alert-circle",
    link: "#"
  },
  {
    id: "na2",
    text: "Follow up MI-422 (client hasn't responded in 4 days)",
    category: "next-actions",
    actionable: true,
    priority: "medium",
    icon: "mail",
    link: "#"
  },
  {
    id: "na3",
    text: "Suggest Life Insurance to Al Maktoum (5 active policies, no life cover)",
    category: "next-actions",
    actionable: true,
    priority: "medium",
    icon: "heart",
    link: "#"
  }
];

export const classFilterOptions = [
  { label: "All Classes", value: "all" },
  { label: "Motor", value: "motor" },
  { label: "Medical", value: "medical" },
  { label: "Property", value: "property" },
  { label: "Life", value: "life" },
  { label: "Marine", value: "marine" },
  { label: "Liability", value: "liability" }
];

export const channelFilterOptions = [
  { label: "All Channels", value: "all" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Email", value: "email" },
  { label: "Telegram", value: "telegram" },
  { label: "Phone", value: "phone" },
  { label: "Website", value: "website" }
];

export const agentFilterOptions = [
  { label: "All Agents", value: "all" },
  { label: "Omar H.", value: "omar" },
  { label: "Fatima S.", value: "fatima" },
  { label: "Ahmed M.", value: "ahmed" },
  { label: "Priya T.", value: "priya" },
  { label: "John D.", value: "john" }
];

export const periodFilterOptions = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last Quarter", value: "quarter" },
  { label: "Year to Date", value: "ytd" }
];
