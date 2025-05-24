
import { toast } from "sonner";

// Customer interface matching the backend C# model
interface Customer {
  id: string;
  code: string;
  fullName: string;
  email: string;
  mobile: string;
  nationality?: string;
  emiratesId?: string;
  passportNo?: string;
  dob?: string;
  type: "Individual" | "Company";
  isVip: boolean;
  assignedAgent?: string;
  source?: string;
  category?: string;
  status: "Active" | "Inactive" | "Dormant" | "Suspended";
  profileImage?: string;
  kycCompletionStatus: "Completed" | "Incomplete" | "Expiring";
  kycCompletionPercentage: number;
}

interface SearchParams {
  query: string;
  searchType: "Name" | "Email" | "Mobile" | "Code" | "EmiratesId" | "PassportNo";
  page: number;
  limit: number;
}

interface SearchResponse {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

interface CommandRequest {
  command: string;
  parameters?: Record<string, any>;
}

interface CommandResponse {
  id: string;
  status: string;
  result?: string;
  timestamp: string;
}

// Configuration
const API_BASE_URL = "https://localhost:7001/api"; // Update this to match your ASP.NET Core port

// Class for API operations
class PraktoraWebApi {
  private baseUrl: string = API_BASE_URL;
  
  // Helper method for making API calls
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<T> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data.data!;
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }
  
  // Search customers with pagination and filtering
  async searchCustomers(params: SearchParams): Promise<SearchResponse> {
    try {
      return await this.makeRequest<SearchResponse>('/commandcenter/search', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    } catch (error) {
      console.error("Error searching customers:", error);
      toast.error("Failed to search customers. Please try again.");
      throw error;
    }
  }
  
  // Get customer by ID
  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      return await this.makeRequest<Customer>(`/commandcenter/customer/${id}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      console.error("Error fetching customer:", error);
      toast.error("Failed to fetch customer details. Please try again.");
      throw error;
    }
  }
  
  // Execute P²RA command
  async executeCommand(command: string, parameters?: Record<string, any>): Promise<CommandResponse> {
    try {
      const request: CommandRequest = { command, parameters };
      return await this.makeRequest<CommandResponse>('/commandcenter/execute', {
        method: 'POST',
        body: JSON.stringify(request),
      });
    } catch (error) {
      console.error("Error executing command:", error);
      toast.error("Failed to execute command. Please try again.");
      throw error;
    }
  }
  
  // Get active engagements
  async getActiveEngagements(): Promise<any[]> {
    try {
      return await this.makeRequest<any[]>('/commandcenter/engagements');
    } catch (error) {
      console.error("Error fetching active engagements:", error);
      toast.error("Failed to fetch active engagements. Please try again.");
      throw error;
    }
  }
  
  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/commandcenter/health`);
      return await response.json();
    } catch (error) {
      console.error("Health check failed:", error);
      throw error;
    }
  }
}

// Export singleton instance and types
const praktoraWebApi = new PraktoraWebApi();
export { praktoraWebApi };
export type { Customer, SearchParams, SearchResponse, CommandRequest, CommandResponse };
