
import { EnquiryItem, mockCommunicationHistory, mockQuotes } from "@/data/enquiriesData";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { SparklesIcon, CheckCircle, Clock, XIcon } from "lucide-react";
import { toast } from "sonner";

interface EnquirySidebarProps {
  enquiry: EnquiryItem | null;
  onClose: () => void;
}

const EnquirySidebar = ({ enquiry, onClose }: EnquirySidebarProps) => {
  if (!enquiry) return null;

  const communicationHistory = mockCommunicationHistory[enquiry.id] || [];
  const quotes = mockQuotes[enquiry.id] || [];

  const handleAction = (action: string) => {
    toast.success(`${action} for ${enquiry.customerName}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {enquiry.customerName}
            <span className="text-sm font-normal text-gray-500">{enquiry.id}</span>
          </h2>
          <p className="text-sm text-gray-500">
            {enquiry.businessClass}
            {enquiry.businessLine && ` / ${enquiry.businessLine}`}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {/* Status Summary */}
          <div className="bg-gray-50 rounded-md p-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <Badge 
                  className={
                    enquiry.status === 'Lost' 
                      ? "bg-red-100 text-red-800 hover:bg-red-200" 
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }
                >
                  {enquiry.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500">Age</p>
                <p className="text-sm font-medium">{enquiry.age}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Quote Sent</p>
                <p>
                  {enquiry.quoteSent ? 
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Yes
                    </span> : 
                    <span className="text-red-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Pending
                    </span>
                  }
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Source</p>
                <p className="text-sm">{enquiry.source}</p>
              </div>
            </div>
          </div>

          {/* P²RA Suggestion */}
          {enquiry.aiSuggestion && (
            <div className={cn(
              "border rounded-md p-3",
              enquiry.aiSuggestionPriority === 'high' ? "border-red-300 bg-red-50" :
              enquiry.aiSuggestionPriority === 'medium' ? "border-amber-300 bg-amber-50" :
              "border-blue-300 bg-blue-50"
            )}>
              <div className="flex items-start gap-2">
                <SparklesIcon className="h-5 w-5 text-praktora-burgundy mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">P²RA Suggested Action:</h4>
                  <p className="text-sm">{enquiry.aiSuggestion}</p>
                </div>
              </div>
            </div>
          )}

          {/* Missing Documents */}
          {enquiry.missingDocuments && enquiry.missingDocuments.length > 0 && (
            <div className="border border-orange-300 rounded-md p-3 bg-orange-50">
              <h4 className="text-sm font-medium mb-2">Missing Documents:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {enquiry.missingDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quotes */}
          {quotes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Quotes</h3>
              <div className="space-y-2">
                {quotes.map((quote, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "border rounded-md p-3",
                      quote.isRecommended ? "border-green-300 bg-green-50" : ""
                    )}
                  >
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">{quote.provider}</span>
                        <p className="text-xs text-gray-500">{quote.coverage}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{quote.amount.toLocaleString()} {quote.currency}</div>
                        <p className="text-xs text-gray-500">
                          Valid until {new Date(quote.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {quote.isRecommended && (
                      <Badge className="bg-green-100 text-green-800 mt-2">Recommended</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communication History */}
          <div>
            <h3 className="text-sm font-medium mb-2">Communication History</h3>
            <div className="space-y-3">
              {communicationHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "rounded-lg p-3 max-w-[95%]",
                    message.type === 'client' 
                      ? "bg-gray-100 text-gray-800" 
                      : "bg-praktora-burgundy/10 text-gray-800 ml-auto"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(message.timestamp))} ago
                  </p>
                </div>
              ))}
              
              {communicationHistory.length === 0 && (
                <p className="text-sm text-gray-500 italic">No communication history available</p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t p-3 bg-gray-50">
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm"
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/80"
            onClick={() => handleAction('Viewing details')}
          >
            View Full Details
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleAction('Following up')}
          >
            Follow Up
          </Button>
          <Button 
            size="sm" 
            variant={enquiry.status === 'Quote Ready' ? "default" : "outline"}
            className={enquiry.status === 'Quote Ready' ? "bg-green-600 hover:bg-green-700" : ""}
            onClick={() => handleAction('Sending quote')}
          >
            Send Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnquirySidebar;
