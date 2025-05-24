
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TelegramChat } from "@/data/telegramData";
import {
  CheckCircle,
  FileText,
  LinkIcon,
  MessageSquareIcon,
  SparklesIcon,
  ClipboardCheckIcon,
  PlusCircleIcon,
  ForwardIcon,
  CheckIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TelegramActionPanelProps {
  chat: TelegramChat | null;
  onMarkActioned?: () => void;
  onSetInProgress?: () => void;
  className?: string;
}

export default function TelegramActionPanel({
  chat,
  onMarkActioned,
  onSetInProgress,
  className
}: TelegramActionPanelProps) {
  if (!chat) {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="font-medium">No conversation selected</h3>
          <p className="text-muted-foreground text-sm">
            Select a conversation to see P²RA actions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="bg-muted/30 p-3 border-b">
        <h3 className="font-medium">P²RA Smart Actions</h3>
        <p className="text-xs text-muted-foreground">
          AI-suggested actions for this conversation
        </p>
      </div>

      <div className="p-3 border-b">
        <div className="mb-3">
          <div className="text-sm font-medium mb-1">Detected Intent</div>
          <Badge className="bg-blue-100 text-blue-800">
            {chat.aiIntentClassification || "Unknown Intent"}
          </Badge>
        </div>

        <div className="mb-3">
          <div className="text-sm font-medium mb-1">Client Match</div>
          {chat.hasWorkflowLinks ? (
            <div className="flex items-center gap-1 text-sm">
              <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">
                Linked
              </span>
              <span>Gulf Trading LLC</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm">
              <span className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded text-xs">
                Likely Match
              </span>
              <span>Gulf Trading LLC</span>
            </div>
          )}
        </div>

        {chat.dataQualityScore && (
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Data Quality Score</div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    chat.dataQualityScore >= 80 ? "bg-green-500" : 
                    chat.dataQualityScore >= 50 ? "bg-amber-500" : "bg-red-500"
                  )}
                  style={{ width: `${chat.dataQualityScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {chat.dataQualityScore}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {chat.dataQualityScore >= 80 
                ? "High quality data, ready for processing"
                : chat.dataQualityScore >= 50
                ? "Medium quality data, review recommended"
                : "Low quality data, manual review required"
              }
            </p>
          </div>
        )}
      </div>

      <div className="p-3 overflow-y-auto flex-1">
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Suggested Actions</h4>
          <div className="space-y-2">
            <Button 
              className="w-full justify-start bg-praktora-burgundy hover:bg-praktora-burgundy/90"
              size="sm"
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              {chat.aiSuggestion || "Create New Enquiry"}
            </Button>
            
            {chat.type === "FNOL" && (
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="sm"
              >
                <ClipboardCheckIcon className="w-4 h-4 mr-2" />
                Initiate Claim
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Link to Workflow
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
            >
              <ForwardIcon className="w-4 h-4 mr-2" />
              Forward to Agent
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">AI Actions</h4>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
              disabled={chat.status === "Actioned"}
              onClick={onMarkActioned}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Actioned
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
              disabled={chat.status === "In Progress"}
              onClick={onSetInProgress}
            >
              <CheckIcon className="w-4 h-4 mr-2" />
              Set In Progress
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              Generate Smart Reply
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Bot Commands</h4>
          <div className="space-y-1.5 text-sm">
            <div className="font-mono bg-muted p-1 rounded text-xs">/quote [product]</div>
            <div className="font-mono bg-muted p-1 rounded text-xs">/renew [policy-number]</div>
            <div className="font-mono bg-muted p-1 rounded text-xs">/claim [policy-number]</div>
            <div className="font-mono bg-muted p-1 rounded text-xs">/upload [document-type]</div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-3 border-t">
        <Button 
          className="w-full flex items-center gap-2"
          size="sm"
        >
          <MessageSquareIcon className="w-4 h-4" />
          <span>Open Analytics</span>
        </Button>
      </div>
    </div>
  );
}
