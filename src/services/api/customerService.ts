
import { toast } from "sonner";
import { Customer, SearchParams, SearchResponse } from "./types/customerTypes";
import { mockCustomers } from "./mockData/customerMockData";

export class CustomerService {
  private baseUrl: string = "https://api.praktoraweb.com"; // Replace with actual API URL
  private apiKey: string | null = null;
  
  // Search customers with pagination and filtering
  async searchCustomers(params: SearchParams): Promise<SearchResponse> {
    try {
      // For development, use mock data
      // In production, this would be an actual API call
      // const response = await fetch(`${this.baseUrl}/customers/search`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.apiKey}`
      //   },
      //   body: JSON.stringify(params)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data based on search parameters
      const filteredCustomers = mockCustomers.filter(customer => {
        const query = params.query.toLowerCase();
        
        switch (params.searchType) {
          case "name":
            return customer.fullName.toLowerCase().includes(query);
          case "email":
            return customer.email.toLowerCase().includes(query);
          case "mobile":
            return customer.mobile.toLowerCase().includes(query);
          case "code":
            return customer.code.toLowerCase().includes(query);
          case "emiratesId":
            return customer.emiratesId?.toLowerCase().includes(query);
          case "passportNo":
            return customer.passportNo?.toLowerCase().includes(query);
          default:
            return false;
        }
      });
      
      // Calculate pagination
      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;
      const paginatedCustomers = filteredCustomers.slice(start, end);
      
      return {
        customers: paginatedCustomers,
        total: filteredCustomers.length,
        page: params.page,
        limit: params.limit,
        hasMore: end < filteredCustomers.length
      };
    } catch (error) {
      console.error("Error searching customers:", error);
      toast.error("Failed to search customers. Please try again.");
      throw error;
    }
  }
  
  // Get customer by ID
  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      // For development, use mock data
      // In production, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const customer = mockCustomers.find(c => c.id === id);
      if (!customer) {
        return null;
      }
      
      return customer;
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("Failed to fetch customer details. Please try again.");
      throw error;
    }
  }
  
  // Set API key for authorization
  setApiKey(key: string) {
    this.apiKey = key;
  }
}

export const customerService = new CustomerService();
