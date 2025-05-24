
import { toast } from "sonner";

// Customer interface based on the data columns mentioned
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
  kycCompletionStatus: "completed" | "incomplete" | "expiring";
  kycCompletionPercentage: number;
}

interface SearchParams {
  query: string;
  searchType: "name" | "email" | "mobile" | "code" | "emiratesId" | "passportNo";
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

// Mock data for development - will be replaced with actual API calls
const mockCustomers: Customer[] = [
  {
    id: "1",
    code: "CS181",
    fullName: "Ahmed Al Maktoum",
    email: "ahmed@titangroup.ae",
    mobile: "+971 50 123 4567",
    nationality: "UAE",
    emiratesId: "784-1234-5678901-2",
    passportNo: "P12345678",
    dob: "1978-05-15",
    type: "Individual",
    isVip: true,
    assignedAgent: "Sarah Johnson",
    source: "Agent",
    category: "TITAN GROUP",
    status: "Active",
    profileImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    kycCompletionStatus: "completed",
    kycCompletionPercentage: 100
  },
  {
    id: "2",
    code: "CS182",
    fullName: "Mohammed Al Maktoum",
    email: "mohammed@titangroup.ae",
    mobile: "+971 50 987 6543",
    nationality: "UAE",
    emiratesId: "784-9876-5432109-8",
    passportNo: "P87654321",
    type: "Individual",
    isVip: false,
    status: "Active",
    kycCompletionStatus: "incomplete",
    kycCompletionPercentage: 65
  },
  {
    id: "3",
    code: "CS183",
    fullName: "Fatima Al Qasimi",
    email: "fatima@alqasimi.ae",
    mobile: "+971 55 456 7890",
    nationality: "UAE",
    type: "Individual",
    isVip: false,
    status: "Active",
    kycCompletionStatus: "expiring",
    kycCompletionPercentage: 90
  },
  {
    id: "4",
    code: "CS184",
    fullName: "TITAN GROUP LLC",
    email: "info@titangroup.ae",
    mobile: "+971 4 123 4567",
    type: "Company",
    isVip: true,
    status: "Active",
    kycCompletionStatus: "completed",
    kycCompletionPercentage: 100
  }
];

// Class for API operations
class PraktoraWebApi {
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

// Export singleton instance and types
const praktoraWebApi = new PraktoraWebApi();
export { praktoraWebApi };
export type { Customer, SearchParams, SearchResponse };
