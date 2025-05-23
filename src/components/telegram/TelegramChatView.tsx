
import { useState } from "react";
import { TelegramChat, TelegramMessage } from "@/data/telegramData";
import { ChatHeader } from "./chat/ChatHeader";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { EmptyChat } from "./chat/EmptyChat";

interface TelegramChatViewProps {
  chat: TelegramChat | null;
  messages: TelegramMessage[];
}

export default function TelegramChatView({ chat, messages }: TelegramChatViewProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (newMessage: string) => {
    console.log("Sending message:", newMessage);
    // In a real app, you'd send this message to your backend
  };

  if (!chat) {
    return <EmptyChat />;
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <ChatHeader chat={chat} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
