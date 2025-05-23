
// Customer interface based on the data columns mentioned
export interface Customer {
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

export interface SearchParams {
  query: string;
  searchType: "name" | "email" | "mobile" | "code" | "emiratesId" | "passportNo";
  page: number;
  limit: number;
}

export interface SearchResponse {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
