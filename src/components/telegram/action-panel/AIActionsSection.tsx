
import { Button } from "@/components/ui/button";
import { TelegramChat } from "@/data/telegramData";
import {
  CheckCircle,
  CheckIcon,
  SparklesIcon
} from "lucide-react";

interface AIActionsSectionProps {
  chat: TelegramChat;
  onMarkActioned?: () => void;
  onSetInProgress?: () => void;
}

export function AIActionsSection({ 
  chat, 
  onMarkActioned, 
  onSetInProgress 
}: AIActionsSectionProps) {
  return (
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
  );
}
