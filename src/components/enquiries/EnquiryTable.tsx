
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { MoreHorizontal, MessageCircle, Mail, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { EnquiryItem } from "@/data/enquiriesData";
import EnquiryStageIndicator from "./EnquiryStageIndicator";
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
            <TableHead className="w-[80px]">Age</TableHead>
            <TableHead className="w-[80px] text-center">Quote</TableHead>
            <TableHead className="w-[80px] text-center">Policy</TableHead>
            <TableHead className="w-[50px]">Link</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => {
            const isUrgent = isUrgentEnquiry(enquiry);
            const isSelected = selectedEnquiryId === enquiry.id;
            
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
                  <span className={parseInt(enquiry.age) > 3 && !enquiry.quoteSent ? 'text-red-500 font-medium' : ''}>
                    {enquiry.age}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {enquiry.quoteSent ? 
                    <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : 
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
    </div>
  );
};

export default EnquiryTable;
