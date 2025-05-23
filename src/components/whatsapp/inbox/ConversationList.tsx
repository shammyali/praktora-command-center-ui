
import { ScrollArea } from "@/components/ui/scroll-area";
import { WhatsAppConversation } from "@/data/whatsapp/types";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: WhatsAppConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-gray-500">
        <p className="text-sm">No conversations found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-0.5">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversationId === conversation.id}
            onSelect={() => onSelectConversation(conversation.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
