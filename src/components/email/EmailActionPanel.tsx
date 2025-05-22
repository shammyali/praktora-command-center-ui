
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  SparklesIcon, 
  PlusCircleIcon, 
  FileTextIcon, 
  SendIcon,
  ForwardIcon,
  LinkIcon,
  CheckIcon,
  ClipboardCheckIcon,
  UserIcon,
  MessageSquareIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface EmailActionPanelProps {
  email: any;
  className?: string;
  onMarkActioned: () => void;
  onSetInProgress: () => void;
}

const EmailActionPanel = ({ 
  email, 
  className,
  onMarkActioned,
  onSetInProgress
}: EmailActionPanelProps) => {
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");
  const { toast } = useToast();

  const handleGenerateReply = () => {
    setIsGeneratingReply(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let reply = "";
      
      if (email.detectedType === "Quote Request") {
        reply = "Thank you for your inquiry. We've received your request for a quote and our team is working on preparing options tailored to your needs. We will share these with you shortly.\n\nIn the meantime, please let us know if you have any specific requirements or questions.\n\nBest regards,\nThe PRAKTORA Team";
      } else if (email.detectedType === "Renewal") {
        reply = "Thank you for your message regarding your policy renewal. We're processing your request and will provide renewal options before your current policy expires.\n\nWe value your continued trust in our services.\n\nBest regards,\nThe PRAKTORA Team";
      } else if (email.detectedType === "Claim") {
        reply = "We've received your claim notification and all attached documents. Your claim has been registered in our system and a claims specialist will be assigned to review it promptly.\n\nClaim reference: CLM-2023-7854\n\nBest regards,\nThe PRAKTORA Team";
      } else {
        reply = "Thank you for your email. We've received your message and our team will respond to your inquiry as soon as possible.\n\nBest regards,\nThe PRAKTORA Team";
      }
      
      setGeneratedReply(reply);
      setIsGeneratingReply(false);
      
      toast({
        title: "Reply generated",
        description: "AI has drafted a response based on email context",
      });
    }, 1500);
  };

  const handleAction = (action: string) => {
    if (action === "mark-actioned") {
      onMarkActioned();
    } else if (action === "in-progress") {
      onSetInProgress();
    } else {
      toast({
        title: "Action triggered",
        description: `${action} action was initiated`,
      });
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="bg-muted p-2 border-b">
        <span className="font-medium">Actions</span>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="bg-praktora-burgundy/10 rounded-md p-3 mb-4">
            <h3 className="font-semibold mb-1 flex items-center">
              <SparklesIcon className="h-4 w-4 mr-2" />
              P²RA Suggested Action
            </h3>
            <p className="text-sm mb-3">{email.suggestedAction}</p>
            <div className="flex justify-end">
              <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/80">
                Execute Suggested Action
              </Button>
            </div>
          </div>
          
          <h3 className="font-semibold mb-2">Create</h3>
          <div className="grid grid-cols-1 gap-2 mb-4">
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={() => handleAction("create-enquiry")}
            >
              <PlusCircleIcon className="h-4 w-4 mr-2" /> Create New Enquiry
            </Button>
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={() => handleAction("create-claim")}
            >
              <FileTextIcon className="h-4 w-4 mr-2" /> Create New Claim
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2 mb-4">
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={() => handleAction("forward")}
            >
              <ForwardIcon className="h-4 w-4 mr-2" /> Forward to Agent
            </Button>
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={() => handleAction("link-workflow")}
            >
              <LinkIcon className="h-4 w-4 mr-2" /> Attach to Workflow
            </Button>
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={() => handleAction("client-match")}
            >
              <UserIcon className="h-4 w-4 mr-2" /> 
              {email.clientMatch ? `Link to ${email.clientMatch}` : "Create New Client"}
            </Button>
          </div>

          <Separator className="my-4" />
          
          <h3 className="font-semibold mb-2">Status Update</h3>
          <div className="grid grid-cols-1 gap-2 mb-4">
            <Button 
              variant={email.status === "In Progress" ? "default" : "outline"} 
              className={cn(
                "justify-start",
                email.status === "In Progress" && "bg-amber-600 hover:bg-amber-700"
              )}
              onClick={() => handleAction("in-progress")}
            >
              <ClipboardCheckIcon className="h-4 w-4 mr-2" /> Mark as In Progress
            </Button>
            <Button 
              variant={email.status === "Done" ? "default" : "outline"} 
              className={cn(
                "justify-start",
                email.status === "Done" && "bg-green-600 hover:bg-green-700"
              )}
              onClick={() => handleAction("mark-actioned")}
            >
              <CheckIcon className="h-4 w-4 mr-2" /> Mark as Actioned
            </Button>
          </div>

          <Separator className="my-4" />

          {!generatedReply ? (
            <>
              <h3 className="font-semibold mb-2">AI Assistance</h3>
              <Button 
                variant="outline" 
                className="w-full justify-start mb-2" 
                onClick={handleGenerateReply}
                disabled={isGeneratingReply}
              >
                {isGeneratingReply ? (
                  <>
                    <SparklesIcon className="h-4 w-4 mr-2 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4 mr-2" /> Generate Reply
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Generated Reply</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setGeneratedReply("")}
                >
                  Reset
                </Button>
              </div>
              <div className="border rounded-md p-3 mb-3 text-sm whitespace-pre-wrap">
                {generatedReply}
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleAction("send-reply")} 
                  className="bg-praktora-burgundy hover:bg-praktora-burgundy/80"
                >
                  <SendIcon className="h-4 w-4 mr-2" /> Send Reply
                </Button>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmailActionPanel;
