
import { Customer } from "../types/customerTypes";

// Mock data for development - will be replaced with actual API calls
export const mockCustomers: Customer[] = [
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
