
import { useState } from "react";
import { Search, Eye, Mail, AlertTriangle, Plus, MoreHorizontal } from "lucide-react";
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

type Enquiry = {
  id: number;
  enquiryId: string;
  class: string;
  status: string;
  source: string;
  agent: string;
  linkedPolicy: string;
  age: number;
};

// Mock data for development
const enquiriesData: Enquiry[] = [
  {
    id: 1,
    enquiryId: "ENQ-2024-001",
    class: "Medical",
    status: "In Process",
    source: "WhatsApp",
    agent: "Sarah Johnson",
    linkedPolicy: "N/A",
    age: 3,
  },
  {
    id: 2,
    enquiryId: "ENQ-2024-002",
    class: "Motor",
    status: "Quoted",
    source: "Portal",
    agent: "Ahmed Hassan",
    linkedPolicy: "N/A",
    age: 5,
  },
  {
    id: 3,
    enquiryId: "ENQ-2024-003",
    class: "Travel",
    status: "Lost",
    source: "Direct",
    agent: "Sarah Johnson",
    linkedPolicy: "N/A",
    age: 12,
  },
  {
    id: 4,
    enquiryId: "ENQ-2024-004",
    class: "Life",
    status: "Converted",
    source: "WhatsApp",
    agent: "Sarah Johnson",
    linkedPolicy: "LF102/2",
    age: 30,
  },
];

// Helper function for status badge colors
const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "IN PROCESS":
      return "bg-blue-500";
    case "QUOTED":
      return "bg-cyan-500";
    case "LOST":
      return "bg-red-500";
    case "CONVERTED":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const EnquiriesTab = () => {
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  
  // Action handlers
  const handleViewDetail = (enquiryId: number) => {
    toast.info(`Opening enquiry #${enquiryId} in detail view`);
  };

  const handleSendFollowUp = (enquiryId: number) => {
    toast.success(`Follow-up sent for enquiry #${enquiryId}`);
  };

  const handleMarkLost = (enquiryId: number) => {
    toast.info(`Marking enquiry #${enquiryId} as lost`);
  };

  const handleCreatePolicy = (enquiryId: number) => {
    toast.info(`Creating policy from enquiry #${enquiryId}`);
  };

  return (
    <>
      <div className="p-4 bg-white border-b flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search enquiries..." 
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
              <SelectItem value="Travel">Travel</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="In Process">In Process</SelectItem>
              <SelectItem value="Quoted">Quoted</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={ageFilter} onValueChange={setAgeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="0-7">0-7 days</SelectItem>
              <SelectItem value="8-14">8-14 days</SelectItem>
              <SelectItem value="15+">15+ days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Enquiry ID</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Linked Policy</TableHead>
              <TableHead>Age (days)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiriesData.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="font-medium">{enquiry.enquiryId}</TableCell>
                <TableCell>{enquiry.class}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(enquiry.status)}>
                    {enquiry.status}
                  </Badge>
                </TableCell>
                <TableCell>{enquiry.source}</TableCell>
                <TableCell>{enquiry.agent}</TableCell>
                <TableCell>{enquiry.linkedPolicy}</TableCell>
                <TableCell>{enquiry.age}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetail(enquiry.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendFollowUp(enquiry.id)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Follow-up
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMarkLost(enquiry.id)}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Mark Lost
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCreatePolicy(enquiry.id)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Policy
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
          Showing <b>4</b> of <b>4</b> enquiries
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
