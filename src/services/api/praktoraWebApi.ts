
import { customerService } from './customerService';
import { whatsAppService } from './whatsAppService';
import { portfolioService } from './portfolioService';
import type { Customer, SearchParams, SearchResponse } from './types/customerTypes';
import type { ClientPortfolioSummary } from './types/portfolioTypes';

// Re-export types for backward compatibility
export type { Customer, SearchParams, SearchResponse, ClientPortfolioSummary };

// Create and export a unified API object for backward compatibility
const praktoraWebApi = {
  // Customer methods
  searchCustomers: (params: SearchParams) => customerService.searchCustomers(params),
  getCustomerById: (id: string) => customerService.getCustomerById(id),
  
  // Portfolio methods
  getClientPortfolioSummary: (customerId: string) => portfolioService.getClientPortfolioSummary(customerId),
  
  // WhatsApp methods
  sendWhatsAppMessage: (to: string, content: string, mediaUrl?: string) => 
    whatsAppService.sendWhatsAppMessage(to, content, mediaUrl),
  initiateWhatsAppConversation: (to: string, initialMessage: string) => 
    whatsAppService.initiateWhatsAppConversation(to, initialMessage),
  
  // API key method
  setApiKey: (key: string) => {
    customerService.setApiKey(key);
    whatsAppService.setApiKey(key);
    portfolioService.setApiKey(key);
  }
};

export { praktoraWebApi };
