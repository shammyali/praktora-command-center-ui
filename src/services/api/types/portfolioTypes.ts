
export interface PolicyCount {
  total: number;
  active: number;
  lapsed: number;
  cancelled: number;
}

export interface EnquiryStats {
  total: number;
  conversionRate: number;
}

export interface ClaimStats {
  total: number;
  open: number;
  rejected: number;
  settled: number;
}

export interface TaskStats {
  total: number;
  overdue: number;
}

export interface FinancialStats {
  premiumPaidYTD: number;
  netCollectionDue: number;
}

export interface RenewalStats {
  policiesExpiringIn30Days: number;
}

export interface PerformanceStats {
  averageQuoteTimeDays: number;
  claimRatio: number;
  isClaimRatioHigh: boolean;
}

export interface LinkedEntityStats {
  parentEntity?: string;
  linkedEntitiesCount: number;
}

export interface ClientPortfolioSummary {
  policies: PolicyCount;
  enquiries: EnquiryStats;
  claims: ClaimStats;
  tasks: TaskStats;
  financial: FinancialStats;
  renewals: RenewalStats;
  performance: PerformanceStats;
  linked: LinkedEntityStats;
  praIntelligence: string;
}
