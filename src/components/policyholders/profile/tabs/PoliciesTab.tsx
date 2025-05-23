
import { useState } from "react";
import { Search, Eye, MessageSquare, RefreshCw, Mail, FileUp, MoreHorizontal } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { toast } from "sonner";

type Policy = {
  id: number;
  policyNumber: string;
  status: string;
  renewalStatus: string;
  policyGroup: string;
  class: string;
  insurer: string;
  premium: string;
  advisor: string;
  insuredEntity: string;
  startDate: string;
  expiryDate: string;
};

// Mock data for development - in a real app, this would come from props or context
const policiesData: Policy[] = [
  {
    id: 1,
    policyNumber: "GM448/1",
    status: "ACTIVE",
    renewalStatus: "No Action Yet",
    policyGroup: "Group Medical",
    class: "Medical",
    insurer: "Oman Insurance",
    premium: "AED 50,000",
    advisor: "Sarah Johnson",
    insuredEntity: "TITAN PERFORMANCE",
    startDate: "2024-01-01",
    expiryDate: "2024-12-31"
  },
  {
    id: 2,
    policyNumber: "FL220/3",
    status: "RENEWED",
    renewalStatus: "Renewal Complete",
    policyGroup: "Corporate Fleet",
    class: "Motor",
    insurer: "Orient Insurance",
    premium: "AED 35,000",
    advisor: "Sarah Johnson",
    insuredEntity: "TITAN PERFORMANCE",
    startDate: "2024-02-15",
    expiryDate: "2025-02-14"
  },
  {
    id: 3,
    policyNumber: "LF102/2",
    status: "CANCELLED",
    renewalStatus: "Not Applicable",
    policyGroup: "Executive Life",
    class: "Life",
    insurer: "MetLife",
    premium: "AED 12,000",
    advisor: "Ahmed Hassan",
    insuredEntity: "Ahmed Al Maktoum",
    startDate: "2023-05-10",
    expiryDate: "2023-08-15"
  },
  {
    id: 4,
    policyNumber: "MR330/1",
    status: "LAPSED",
    renewalStatus: "No Response",
    policyGroup: "Marine Cargo",
    class: "Marine",
    insurer: "AXA Gulf",
    premium: "AED 28,500",
    advisor: "Sarah Johnson",
    insuredEntity: "TITAN PERFORMANCE",
    startDate: "2023-07-20",
    expiryDate: "2024-04-01"
  },
  {
    id: 5,
    policyNumber: "GM450/2",
    status: "NOT TO BE RENEWED",
    renewalStatus: "Client Decision",
    policyGroup: "Group Medical",
    class: "Medical",
    insurer: "Oman Insurance",
    premium: "AED 45,000",
    advisor: "Sarah Johnson",
    insuredEntity: "TITAN PERFORMANCE",
    startDate: "2023-01-01",
    expiryDate: "2023-12-31"
  },
];

// Helper function for status badge colors
const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "bg-green-500";
    case "RENEWED":
      return "bg-purple-500";
    case "CANCELLED":
      return "bg-red-500";
    case "LAPSED":
      return "bg-gray-500";
    case "NOT TO BE RENEWED":
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
};

export const PoliciesTab = () => {
  // Filters
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [advisorFilter, setAdvisorFilter] = useState("all");
  
  // Action handlers
  const handleViewDetail = (policyId: number) => {
    toast.info(`Opening policy #${policyId} in detail view`);
  };

  const handleSendReminder = (policyId: number) => {
    toast.success(`Reminder sent for policy #${policyId}`);
  };

  const handleOpenWorkflow = (policyId: number) => {
    toast.info(`Opening policy #${policyId} in workflow`);
  };

  const handleSendRenewalNotification = (policyId: number) => {
    toast.success(`Renewal notification sent for policy #${policyId}`);
  };

  return (
    <>
      <div className="p-4 bg-white border-b flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search policies..." 
              className="max-w-xs pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Motor">Motor</SelectItem>
              <SelectItem value="Life">Life</SelectItem>
              <SelectItem value="Marine">Marine</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="RENEWED">Renewed</SelectItem>
              <SelectItem value="LAPSED">Lapsed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="NOT TO BE RENEWED">Not To Be Renewed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={advisorFilter} onValueChange={setAdvisorFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Filter by Advisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Advisors</SelectItem>
              <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              <SelectItem value="Ahmed Hassan">Ahmed Hassan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Renewal Status</TableHead>
              <TableHead>Policy Group</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Insurer</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Advisor</TableHead>
              <TableHead>Insured Entity</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policiesData.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell className="font-medium">{policy.policyNumber}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(policy.status)}>
                    {policy.status}
                  </Badge>
                </TableCell>
                <TableCell>{policy.renewalStatus}</TableCell>
                <TableCell>{policy.policyGroup}</TableCell>
                <TableCell>{policy.class}</TableCell>
                <TableCell>{policy.insurer}</TableCell>
                <TableCell>{policy.premium}</TableCell>
                <TableCell>{policy.advisor}</TableCell>
                <TableCell>{policy.insuredEntity}</TableCell>
                <TableCell>{new Date(policy.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(policy.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetail(policy.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendReminder(policy.id)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenWorkflow(policy.id)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Open in Workflow
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendRenewalNotification(policy.id)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Renewal Notification
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileUp className="mr-2 h-4 w-4" />
                        Attach Document
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <b>5</b> of <b>5</b> policies
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
