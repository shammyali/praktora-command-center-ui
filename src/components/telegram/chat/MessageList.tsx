
import { useRef, useEffect } from "react";
import { TelegramMessage } from "@/data/telegramData";
import { MessageGroup } from "./MessageGroup";

interface MessageListProps {
  messages: TelegramMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Group messages by date for better UI organization
  const groupedMessages: { date: string; messages: TelegramMessage[] }[] = [];
  let currentDate = "";
  
  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toLocaleDateString();
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({
        date: msgDate,
        messages: [msg],
      });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/10">
      {groupedMessages.map((group, groupIndex) => (
        <MessageGroup key={groupIndex} date={group.date} messages={group.messages} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
