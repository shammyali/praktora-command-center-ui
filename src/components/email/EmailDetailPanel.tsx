
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileIcon, 
  Image, 
  FileTextIcon, 
  SparklesIcon,
  DownloadIcon,
  ExternalLinkIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailDetailPanelProps {
  email: any;
  className?: string;
}

const EmailDetailPanel = ({ email, className }: EmailDetailPanelProps) => {
  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <Image className="h-4 w-4" />;
    if (type.includes("pdf")) return <FileTextIcon className="h-4 w-4" />;
    return <FileIcon className="h-4 w-4" />;
  };

  const getFormattedDate = (timeString: string) => {
    // In a real app, this would parse the actual timestamp
    // For now, we'll just display the mock data
    return `Today, ${timeString}`;
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="bg-muted p-2 border-b flex justify-between items-center">
        <span className="font-medium">Email Details</span>
      </div>
      
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-2">{email.subject}</h2>
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <span className="mr-2">From:</span>
          <span className="font-medium">{email.sender}</span>
          <span className="mx-1">&lt;{email.senderEmail}&gt;</span>
        </div>
        <div className="text-sm text-muted-foreground mb-3">
          <span className="mr-2">Received:</span>
          <span>{getFormattedDate(email.receivedTime)}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            className={cn(
              email.detectedType === "Quote Request" && "bg-blue-100 text-blue-800",
              email.detectedType === "Renewal" && "bg-green-100 text-green-800",
              email.detectedType === "Claim" && "bg-amber-100 text-amber-800",
              email.detectedType === "Complaint" && "bg-red-100 text-red-800",
              email.detectedType === "Unknown" && "bg-gray-100 text-gray-800"
            )}
          >
            {email.detectedType}
          </Badge>
          
          {email.clientMatch && (
            <Badge className="bg-purple-100 text-purple-800">
              Client: {email.clientMatch}
            </Badge>
          )}
          
          <Badge 
            className={cn(
              "ml-auto",
              email.priority === "high" && "bg-red-100 text-red-800",
              email.priority === "medium" && "bg-amber-100 text-amber-800",
              email.priority === "low" && "bg-green-100 text-green-800"
            )}
          >
            {email.priority} priority
          </Badge>
        </div>

        <div className="bg-muted/50 rounded-md p-3 mb-4 text-sm">
          <div className="flex gap-2 items-start">
            <SparklesIcon className="h-5 w-5 text-praktora-burgundy mt-0.5" />
            <div>
              <div className="font-medium mb-1">P²RA Analysis:</div>
              <p>{email.aiSummary}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="message">
        <div className="px-2 border-b">
          <TabsList className="w-full bg-transparent">
            <TabsTrigger value="message" className="flex-1">Message</TabsTrigger>
            <TabsTrigger value="attachments" className="flex-1">
              Attachments ({email.attachments.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="message" className="p-0 m-0 flex-1">
          <ScrollArea className="h-[calc(100vh-560px)]">
            <div className="p-4 whitespace-pre-wrap">{email.content}</div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="attachments" className="p-0 m-0 flex-1">
          <ScrollArea className="h-[calc(100vh-560px)]">
            <div className="p-4">
              {email.attachments.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {email.attachments.map((attachment: any, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="bg-muted rounded-md p-2 mr-3">
                          {getFileIcon(attachment.type)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{attachment.name}</div>
                          <div className="text-xs text-muted-foreground">{attachment.size}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">No attachments found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailDetailPanel;
