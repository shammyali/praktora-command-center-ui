
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ClientPortfolioSummary } from "@/services/api/types/portfolioTypes";
import { praktoraWebApi } from "@/services/api/praktoraWebApi";

export const useClientPortfolio = (customerId: string | null) => {
  const [portfolioSummary, setPortfolioSummary] = useState<ClientPortfolioSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load portfolio summary when customerId changes
  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!customerId) return;
      
      setIsLoading(true);
      try {
        const summary = await praktoraWebApi.getClientPortfolioSummary(customerId);
        if (summary) {
          setPortfolioSummary(summary);
        }
      } catch (error) {
        console.error("Failed to load portfolio summary", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPortfolioData();
  }, [customerId]);

  return {
    portfolioSummary,
    isLoading
  };
};
