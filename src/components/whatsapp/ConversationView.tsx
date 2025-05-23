
import { useEffect } from "react";
import { WhatsAppMessage, WhatsAppConversation } from "@/data/whatsapp/types";
import ConversationHeader from "./conversation/ConversationHeader";
import MessageList from "./conversation/MessageList";
import MessageInput from "./conversation/MessageInput";
import EmptyConversation from "./conversation/EmptyConversation";

interface ConversationViewProps {
  conversation: WhatsAppConversation | null;
  messages: WhatsAppMessage[];
  autoFocusInput?: boolean;
  onSendMessage?: (content: string) => void;
}

export default function ConversationView({
  conversation,
  messages,
  autoFocusInput = false,
  onSendMessage
}: ConversationViewProps) {
  // Focus input when conversation changes or autoFocus is true
  useEffect(() => {
    // This effect is now handled in the MessageInput component
    // But we keep the effect declaration here for consistency with the original component
  }, [conversation, autoFocusInput]);
  
  if (!conversation) {
    return <EmptyConversation />;
  }

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader conversation={conversation} />
      <MessageList messages={messages} />
      <MessageInput autoFocus={autoFocusInput} onSendMessage={onSendMessage} />
    </div>
  );
}
