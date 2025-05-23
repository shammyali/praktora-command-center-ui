
import { toast } from "sonner";
import { ClientPortfolioSummary } from "./types/portfolioTypes";
import { mockPortfolioData } from "./mockData/portfolioMockData";

class PortfolioService {
  private baseUrl: string = "https://api.praktoraweb.com"; // Replace with actual API URL
  private apiKey: string | null = null;
  
  // Get portfolio summary for a customer
  async getClientPortfolioSummary(customerId: string): Promise<ClientPortfolioSummary | null> {
    try {
      // For development, use mock data
      // In production, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find portfolio data for the customer
      const portfolioData = mockPortfolioData[customerId] || mockPortfolioData['default'];
      
      if (!portfolioData) {
        return null;
      }
      
      return portfolioData;
    } catch (error) {
      console.error("Error fetching portfolio summary:", error);
      toast.error("Failed to fetch portfolio summary. Please try again.");
      throw error;
    }
  }
  
  // Set API key for authorization
  setApiKey(key: string) {
    this.apiKey = key;
  }
}

export const portfolioService = new PortfolioService();
