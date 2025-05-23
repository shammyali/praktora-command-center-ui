
import { Badge } from "@/components/ui/badge";
import { TelegramMessage } from "@/data/telegram";
import { MessageBubble } from "./MessageBubble";

interface MessageGroupProps {
  date: string;
  messages: TelegramMessage[];
}

export function MessageGroup({ date, messages }: MessageGroupProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-center my-2">
        <Badge variant="outline" className="bg-background">
          {new Date(date).toLocaleDateString(undefined, { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Badge>
      </div>

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
