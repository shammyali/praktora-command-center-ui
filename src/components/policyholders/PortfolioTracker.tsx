
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  RefreshCw, 
  AlertTriangle, 
  Eye, 
  Plus,
  Search,
  CreditCard,
  FileUp,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";

// Sample data - would be fetched from API in production
const policiesData = [
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

const enquiriesData = [
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

const claimsData = [
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

const financialData = {
  outstandingTotal: "AED 16,400",
  lastPaymentDate: "2024-04-15",
  nextInvoiceDate: "2024-06-01",
};

const PortfolioTracker = () => {
  const [activeTab, setActiveTab] = useState("policies");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters (simplified implementation)
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [advisorFilter, setAdvisorFilter] = useState("all");
  
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
      case "IN PROCESS":
        return "bg-blue-500";
      case "QUOTED":
        return "bg-cyan-500";
      case "LOST":
        return "bg-red-500";
      case "CONVERTED":
        return "bg-green-500";
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

  // Action handlers
  const handleSendReminder = (itemId: number, type: string) => {
    toast.success(`Reminder sent for ${type} #${itemId}`);
  };

  const handleViewDetail = (itemId: number, type: string) => {
    toast.info(`Opening ${type} #${itemId} in detail view`);
  };

  const handleOpenWorkflow = (itemId: number, type: string) => {
    toast.info(`Opening ${type} #${itemId} in workflow`);
  };

  const handleSendRenewalNotification = (policyId: number) => {
    toast.success(`Renewal notification sent for policy #${policyId}`);
  };

  const handleSendStatement = (method: string) => {
    toast.success(`Statement sent via ${method}`);
  };

  const handleSetReminder = () => {
    toast.success("Reminder set for finance team");
  };

  const handleGeneratePDF = () => {
    toast.success("Generating Outstanding Summary PDF...");
  };

  return (
    <Card className="mt-6">
      <CardHeader className="bg-[#F8F8F8] border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-praktora-burgundy" />
          Portfolio Tracker — Policies, Enquiries, Claims & Finance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="policies" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start p-0 bg-gray-100 rounded-none border-b">
            <TabsTrigger 
              value="policies" 
              className="rounded-none border-r data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Policies
            </TabsTrigger>
            <TabsTrigger 
              value="enquiries"
              className="rounded-none border-r data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Enquiries
            </TabsTrigger>
            <TabsTrigger 
              value="claims"
              className="rounded-none border-r data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Claims
            </TabsTrigger>
            <TabsTrigger 
              value="financials"
              className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Financial Actions
            </TabsTrigger>
          </TabsList>
          
          {/* Policies Tab */}
          <TabsContent value="policies" className="p-0">
            <div className="p-4 bg-white border-b flex flex-wrap gap-2 items-center">
              <div className="flex-1 min-w-[200px]">
                <Input 
                  placeholder="Search policies..." 
                  className="max-w-xs"
                  prefix={<Search className="h-4 w-4 mr-2" />}
                />
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
                            <DropdownMenuItem onClick={() => handleViewDetail(policy.id, "policy")}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(policy.id, "policy")}>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenWorkflow(policy.id, "policy")}>
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
          </TabsContent>
          
          {/* Enquiries Tab */}
          <TabsContent value="enquiries" className="p-0">
            <div className="p-4 bg-white border-b flex flex-wrap gap-2 items-center">
              <div className="flex-1 min-w-[200px]">
                <Input 
                  placeholder="Search enquiries..." 
                  className="max-w-xs"
                  prefix={<Search className="h-4 w-4 mr-2" />}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select defaultValue="all">
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
                
                <Select defaultValue="all">
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
                
                <Select defaultValue="all">
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
                            <DropdownMenuItem onClick={() => handleViewDetail(enquiry.id, "enquiry")}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(enquiry.id, "enquiry")}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Follow-up
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Mark Lost
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
          </TabsContent>
          
          {/* Claims Tab */}
          <TabsContent value="claims" className="p-0">
            <div className="p-4 bg-white border-b flex flex-wrap gap-2 items-center">
              <div className="flex-1 min-w-[200px]">
                <Input 
                  placeholder="Search claims..." 
                  className="max-w-xs"
                  prefix={<Search className="h-4 w-4 mr-2" />}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select defaultValue="all">
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
                
                <Select defaultValue="all">
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
                            <DropdownMenuItem onClick={() => handleViewDetail(claim.id, "claim")}>
                              <Eye className="mr-2 h-4 w-4" />
                              Open Claim File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(claim.id, "claim")}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Update
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
          </TabsContent>
          
          {/* Financial Actions Tab */}
          <TabsContent value="financials" className="p-0">
            <div className="p-6 grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Outstanding Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-3xl font-bold text-praktora-burgundy">{financialData.outstandingTotal}</p>
                        <p className="text-sm text-muted-foreground mt-1">Last payment: {new Date(financialData.lastPaymentDate).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">Next invoice: {new Date(financialData.nextInvoiceDate).toLocaleDateString()}</p>
                      </div>
                      <CreditCard className="h-12 w-12 text-praktora-burgundy opacity-20" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => handleSendStatement('Email')}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email Statement
                      </Button>
                      <Button variant="outline" onClick={() => handleSendStatement('WhatsApp')}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp Statement
                      </Button>
                      <Button variant="outline" onClick={handleGeneratePDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Financial Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <p className="text-sm font-medium">Set payment reminder</p>
                        <div className="flex gap-2">
                          <Input 
                            type="date" 
                            className="max-w-[200px]"
                          />
                          <Button onClick={handleSetReminder}>Set Reminder</Button>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <p className="text-sm font-medium">Payment History</p>
                        <Button variant="outline" className="w-fit">
                          <Eye className="mr-2 h-4 w-4" />
                          View Payment History
                        </Button>
                      </div>
                      
                      <div className="grid gap-2">
                        <p className="text-sm font-medium">Quick Actions</p>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">Mark as Paid</Button>
                          <Button variant="outline" size="sm">Add Note</Button>
                          <Button variant="outline" size="sm">Payment Plan</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PortfolioTracker;
