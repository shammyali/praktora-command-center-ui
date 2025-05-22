import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { MoreHorizontal, MessageCircle, Mail, CheckCircle, XCircle, AlertTriangle, Lightbulb, FileText } from "lucide-react";
import { EnquiryItem } from "@/data/enquiriesData";
import EnquiryStageIndicator from "./EnquiryStageIndicator";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface EnquiryTableProps {
  enquiries: EnquiryItem[];
  onSelectEnquiry: (enquiry: EnquiryItem) => void;
  selectedEnquiryId: string | null;
}

const EnquiryTable = ({ 
  enquiries,
  onSelectEnquiry,
  selectedEnquiryId
}: EnquiryTableProps) => {
  const [quotePreviewOpen, setQuotePreviewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<EnquiryItem | null>(null);

  // Function to get status color
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'Enquiry': 'bg-blue-100 text-blue-800',
      'In Process': 'bg-blue-100 text-blue-800',
      'Quoted': 'bg-amber-100 text-amber-800',
      'Quote Ready': 'bg-green-100 text-green-800',
      'Awaiting Client': 'bg-amber-100 text-amber-800',
      'Awaiting Client Confirmation': 'bg-amber-100 text-amber-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Lost': 'bg-red-100 text-red-800'
    };
    
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Function to render communication link icon
  const renderCommunicationLink = (enquiry: EnquiryItem) => {
    if (!enquiry.communicationLink) return null;
    
    if (enquiry.communicationLink.includes('whatsapp')) {
      return (
        <a 
          href={enquiry.communicationLink}
          onClick={(e) => e.stopPropagation()}
          className="text-green-600 hover:text-green-700"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      );
    } 
    
    if (enquiry.communicationLink.includes('mailto')) {
      return (
        <a 
          href={enquiry.communicationLink}
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 hover:text-blue-700"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
        </a>
      );
    }
    
    return null;
  };

  // Handler for action buttons
  const handleAction = (action: string, enquiry: EnquiryItem) => {
    toast.success(`${action} for ${enquiry.customerName}`);
  };

  // Check if an enquiry is urgent based on age and quoteSent status
  const isUrgentEnquiry = (enquiry: EnquiryItem) => {
    const daysOld = enquiry.age !== 'Today' ? parseInt(enquiry.age) : 0;
    return (daysOld > 2 && !enquiry.quoteSent) || enquiry.aiSuggestionPriority === 'high';
  };

  // NEW: Generate AI suggestion based on enquiry data
  const getAISuggestion = (enquiry: EnquiryItem) => {
    const daysOld = enquiry.age !== 'Today' ? parseInt(enquiry.age) : 0;
    
    if (!enquiry.quoteSent && daysOld > 1) {
      return "Quote not sent — recommend sending within SLA";
    } else if (enquiry.quoteSent && !enquiry.policyIssued && daysOld > 3) {
      return "Client hasn't responded in " + daysOld + " days — suggest follow-up";
    } else if (enquiry.quoteSent && enquiry.status === "Awaiting Client Confirmation" && daysOld > 2) {
      return "Follow up on client decision — conversion opportunity";
    } else if (enquiry.status === "Quote Ready" && daysOld > 1) {
      return "Quote ready but not sent — action required";
    } else if (enquiry.quoteSent && enquiry.status === "Quoted" && daysOld > 4) {
      return "No policy issued after confirmation — review conversion risk";
    }
    
    return null;
  };

  // NEW: Get age color for visual indicator
  const getAgeColor = (days: number) => {
    if (days < 2) return "bg-green-500"; 
    if (days >= 2 && days <= 4) return "bg-orange-500";
    return "bg-red-500";
  };

  // NEW: Calculate progress value for age bar (capped at 100% after 7 days)
  const getAgeProgress = (days: number) => {
    return Math.min(days * 14, 100);
  };

  // NEW: Handle quote preview click
  const handleQuotePreview = (enquiry: EnquiryItem) => {
    if (enquiry.quoteSent) {
      setSelectedQuote(enquiry);
      setQuotePreviewOpen(true);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Enquiry ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Class / Line</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Assigned Agent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[120px]">Age</TableHead>
            <TableHead className="w-[80px] text-center">Quote</TableHead>
            <TableHead className="w-[80px] text-center">Policy</TableHead>
            <TableHead className="w-[50px]">Link</TableHead>
            <TableHead className="w-[50px]">P²RA</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => {
            const isUrgent = isUrgentEnquiry(enquiry);
            const isSelected = selectedEnquiryId === enquiry.id;
            const aiSuggestion = getAISuggestion(enquiry);
            const daysOld = enquiry.age !== 'Today' ? parseInt(enquiry.age) : 0;
            const ageColor = getAgeColor(daysOld);
            
            return (
              <TableRow 
                key={enquiry.id} 
                onClick={() => onSelectEnquiry(enquiry)}
                className={`
                  cursor-pointer transition-colors
                  ${isUrgent ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}
                  ${isSelected ? 'bg-praktora-burgundy/10 hover:bg-praktora-burgundy/20' : ''}
                `}
              >
                <TableCell className="font-medium">
                  {isUrgent && (
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-4 w-4 text-red-500 inline mr-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Urgent attention required</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {enquiry.id}
                </TableCell>
                <TableCell>{enquiry.customerName}</TableCell>
                <TableCell>
                  {enquiry.businessClass}
                  {enquiry.businessLine && <span className="text-gray-500"> / {enquiry.businessLine}</span>}
                </TableCell>
                <TableCell>{enquiry.source}</TableCell>
                <TableCell>{enquiry.assignedAgent}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(enquiry.status)}>
                    {enquiry.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className={parseInt(enquiry.age) > 3 && !enquiry.quoteSent ? 'text-red-500 font-medium' : ''}>
                      {enquiry.age}
                    </span>
                    <Progress 
                      value={getAgeProgress(daysOld)} 
                      className="h-1.5" 
                      indicatorClassName={ageColor}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                  {enquiry.quoteSent ? 
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 p-0"
                          onClick={() => handleQuotePreview(enquiry)}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to preview quote</p>
                      </TooltipContent>
                    </Tooltip> : 
                    <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                  }
                </TableCell>
                <TableCell className="text-center">
                  {enquiry.policyIssued ? 
                    <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : 
                    <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                  }
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    {renderCommunicationLink(enquiry)}
                  </div>
                </TableCell>
                <TableCell>
                  {aiSuggestion && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[250px]">
                        <p>{aiSuggestion}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction('Viewing details', enquiry)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Following up', enquiry)}>
                        Follow Up
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Converting to Policy', enquiry)}>
                        Convert to Policy
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Marked as Lost', enquiry)}>
                        Mark as Lost
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Quote Preview Dialog */}
      <Dialog open={quotePreviewOpen} onOpenChange={setQuotePreviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quote Preview
            </DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedQuote.customerName}</h3>
                <p className="text-sm text-muted-foreground">{selectedQuote.id}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium">Business Class</p>
                  <p className="text-praktora-burgundy">{selectedQuote.businessClass}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Line</p>
                  <p>{selectedQuote.businessLine || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Premium</p>
                  <p className="text-lg font-semibold">AED 4,750.00</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Insurer</p>
                  <p>Praktora Insurance Co.</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm font-medium">Key Terms</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Coverage: Comprehensive</li>
                  <li>• Deductible: AED 1,000</li>
                  <li>• Validity: 12 months</li>
                </ul>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setQuotePreviewOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={() => {
                  toast.success("Quote document downloaded");
                  setQuotePreviewOpen(false);
                }}>
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnquiryTable;
