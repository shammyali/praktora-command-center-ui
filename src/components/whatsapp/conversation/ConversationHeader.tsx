
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppConversation } from "@/data/whatsapp/types";
import { AlertTriangle, Clock, MessageCircle } from "lucide-react";

interface ConversationHeaderProps {
  conversation: WhatsAppConversation;
}

export default function ConversationHeader({ conversation }: ConversationHeaderProps) {
  // Function to render intent classification icon
  const renderIntentIcon = () => {
    if (conversation.type === "Claim") return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (conversation.status === "Unlinked") return <Clock className="h-4 w-4 text-blue-500" />;
    return <MessageCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="p-4 border-b flex items-center">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-medium">{conversation.contact.name}</h2>
          <span className="text-xs text-gray-500">{conversation.contact.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {renderIntentIcon()}
          <Badge variant="outline" className="text-xs font-normal h-5 bg-slate-50">
            Intent: {conversation.aiIntentClassification || "Analyzing..."}
          </Badge>
          {conversation.ageInDays > 2 && (
            <Badge variant="outline" className="text-xs font-normal h-5 bg-amber-50 text-amber-700 border-amber-200">
              No reply in {conversation.ageInDays} days
            </Badge>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-8">
          View History
        </Button>
      </div>
    </div>
  );
}
