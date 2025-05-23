
import { Circle, Link, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WhatsAppConversation, ConversationType, ConversationStatus } from "@/data/whatsapp/types";

interface ConversationItemProps {
  conversation: WhatsAppConversation;
  isSelected: boolean;
  onSelect: () => void;
}

export const getTypeBadgeColor = (type: ConversationType) => {
  switch (type) {
    case "New Business":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Claim":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "Renewal":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export const getStatusBadgeColor = (status: ConversationStatus) => {
  switch (status) {
    case "Unlinked":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Actioned":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Resolved":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "";
  }
};

// Function to format timestamp as relative time
export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

export default function ConversationItem({ 
  conversation, 
  isSelected, 
  onSelect 
}: ConversationItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-3 text-left hover:bg-gray-100 transition-colors",
        isSelected && "bg-gray-100"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {conversation.contact.avatar ? (
              <img 
                src={conversation.contact.avatar} 
                alt={conversation.contact.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium">
                {conversation.contact.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          {conversation.unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-praktora-burgundy text-white text-[10px] flex items-center justify-center font-medium">
              {conversation.unreadCount}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="font-medium text-sm truncate">
              {conversation.contact.name}
            </div>
            <div className="text-xs text-gray-500">
              {formatTime(conversation.lastMessage.timestamp)}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 truncate mt-0.5">
            {conversation.lastMessage.content}
          </div>
          
          <div className="flex items-center gap-1.5 mt-1.5">
            <Badge className={cn("text-[10px] px-1.5 py-0", getTypeBadgeColor(conversation.type))}>
              {conversation.type}
            </Badge>
            
            <Badge className={cn("text-[10px] px-1.5 py-0", getStatusBadgeColor(conversation.status))}>
              {conversation.status}
            </Badge>
            
            <div className="flex ml-auto gap-1">
              {conversation.hasAttachments && (
                <Paperclip className="h-3 w-3 text-gray-400" />
              )}
              {conversation.unreadCount > 0 && (
                <Circle className="h-3 w-3 fill-praktora-burgundy text-praktora-burgundy" />
              )}
              {conversation.hasWorkflowLinks && (
                <Link className="h-3 w-3 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
