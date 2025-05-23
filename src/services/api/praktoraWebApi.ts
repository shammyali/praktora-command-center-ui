
import { customerService } from './customerService';
import { whatsAppService } from './whatsAppService';
import type { Customer, SearchParams, SearchResponse } from './types/customerTypes';

// Re-export types for backward compatibility
export type { Customer, SearchParams, SearchResponse };

// Create and export a unified API object for backward compatibility
const praktoraWebApi = {
  // Customer methods
  searchCustomers: (params: SearchParams) => customerService.searchCustomers(params),
  getCustomerById: (id: string) => customerService.getCustomerById(id),
  
  // WhatsApp methods
  sendWhatsAppMessage: (to: string, content: string, mediaUrl?: string) => 
    whatsAppService.sendWhatsAppMessage(to, content, mediaUrl),
  initiateWhatsAppConversation: (to: string, initialMessage: string) => 
    whatsAppService.initiateWhatsAppConversation(to, initialMessage),
  
  // API key method
  setApiKey: (key: string) => {
    customerService.setApiKey(key);
    whatsAppService.setApiKey(key);
  }
};

export { praktoraWebApi };
