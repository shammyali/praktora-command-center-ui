
import { useState } from "react";
import { Search, Eye, Mail, FileUp, MoreHorizontal } from "lucide-react";
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

type Claim = {
  id: number;
  claimId: string;
  linkedPolicy: string;
  type: string;
  status: string;
  dateFiled: string;
  insurer: string;
};

// Mock data for development
const claimsData: Claim[] = [
  {
    id: 1,
    claimId: "CLM-2024-001",
    linkedPolicy: "GM448/1",
    type: "Medical",
    status: "In Progress",
    dateFiled: "2024-05-10",
    insurer: "Oman Insurance",
  },
  {
    id: 2,
    claimId: "CLM-2024-002",
    linkedPolicy: "FL220/3",
    type: "Motor",
    status: "Settled",
    dateFiled: "2024-04-22",
    insurer: "Orient Insurance",
  },
  {
    id: 3,
    claimId: "CLM-2023-045",
    linkedPolicy: "GM448/1",
    type: "Medical",
    status: "Rejected",
    dateFiled: "2023-11-14",
    insurer: "Oman Insurance",
  },
];

// Helper function for status badge colors
const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "IN PROGRESS":
      return "bg-blue-500";
    case "SETTLED":
      return "bg-green-500";
    case "REJECTED":
      return "bg-red-500";
    case "FNOL":
      return "bg-amber-500";
    case "PARTIAL":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

export const ClaimsTab = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Action handlers
  const handleViewDetail = (claimId: number) => {
    toast.info(`Opening claim file #${claimId}`);
  };

  const handleSendUpdate = (claimId: number) => {
    toast.success(`Update sent for claim #${claimId}`);
  };

  const handleResendDocs = (claimId: number) => {
    toast.success(`Documents resent for claim #${claimId}`);
  };

  return (
    <>
      <div className="p-4 bg-white border-b flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search claims..." 
              className="max-w-xs pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Motor">Motor</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="FNOL">FNOL</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Settled">Settled</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Linked Policy</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Filed</TableHead>
              <TableHead>Insurer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claimsData.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.claimId}</TableCell>
                <TableCell>{claim.linkedPolicy}</TableCell>
                <TableCell>{claim.type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(claim.dateFiled).toLocaleDateString()}</TableCell>
                <TableCell>{claim.insurer}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetail(claim.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Open Claim File
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendUpdate(claim.id)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Update
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleResendDocs(claim.id)}>
                        <FileUp className="mr-2 h-4 w-4" />
                        Resend Docs
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
          Showing <b>3</b> of <b>3</b> claims
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
