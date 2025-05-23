
import { ClientPortfolioSummary } from "../types/portfolioTypes";

// Mock portfolio data keyed by customer ID
export const mockPortfolioData: Record<string, ClientPortfolioSummary> = {
  "1": {
    policies: {
      total: 12,
      active: 7,
      lapsed: 3,
      cancelled: 2
    },
    enquiries: {
      total: 18,
      conversionRate: 67
    },
    claims: {
      total: 5,
      open: 2,
      rejected: 1,
      settled: 2
    },
    tasks: {
      total: 3,
      overdue: 1
    },
    financial: {
      premiumPaidYTD: 45000,
      netCollectionDue: 12500
    },
    renewals: {
      policiesExpiringIn30Days: 2
    },
    performance: {
      averageQuoteTimeDays: 2.5,
      claimRatio: 38,
      isClaimRatioHigh: true
    },
    linked: {
      parentEntity: "TITAN GROUP LLC",
      linkedEntitiesCount: 8
    },
    praIntelligence: "Client has not responded to last 2 renewals. High-risk motor policy expires in 5 days. Last claim was partially rejected. Two invoices pending over 30 days."
  },
  "2": {
    policies: {
      total: 3,
      active: 3,
      lapsed: 0,
      cancelled: 0
    },
    enquiries: {
      total: 7,
      conversionRate: 43
    },
    claims: {
      total: 1,
      open: 1,
      rejected: 0,
      settled: 0
    },
    tasks: {
      total: 2,
      overdue: 0
    },
    financial: {
      premiumPaidYTD: 12000,
      netCollectionDue: 0
    },
    renewals: {
      policiesExpiringIn30Days: 0
    },
    performance: {
      averageQuoteTimeDays: 1.8,
      claimRatio: 33,
      isClaimRatioHigh: false
    },
    linked: {
      linkedEntitiesCount: 0
    },
    praIntelligence: "New client with excellent payment history. All policies are up-to-date. One open claim requires resolution by next week."
  },
  "default": {
    policies: {
      total: 5,
      active: 4,
      lapsed: 1,
      cancelled: 0
    },
    enquiries: {
      total: 10,
      conversionRate: 50
    },
    claims: {
      total: 2,
      open: 0,
      rejected: 0,
      settled: 2
    },
    tasks: {
      total: 1,
      overdue: 0
    },
    financial: {
      premiumPaidYTD: 15000,
      netCollectionDue: 0
    },
    renewals: {
      policiesExpiringIn30Days: 1
    },
    performance: {
      averageQuoteTimeDays: 2.0,
      claimRatio: 20,
      isClaimRatioHigh: false
    },
    linked: {
      linkedEntitiesCount: 0
    },
    praIntelligence: "Stable client relationship with good renewal history. One policy expiring soon requires attention."
  }
};
