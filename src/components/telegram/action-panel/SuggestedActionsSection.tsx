
import { Button } from "@/components/ui/button";
import { TelegramChat } from "@/data/telegram";
import {
  PlusCircleIcon,
  ClipboardCheckIcon,
  LinkIcon,
  ForwardIcon
} from "lucide-react";

interface SuggestedActionsSectionProps {
  chat: TelegramChat;
}

export function SuggestedActionsSection({ chat }: SuggestedActionsSectionProps) {
  return (
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
  );
}
