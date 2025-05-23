
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Bot, User } from "lucide-react";
import { TelegramChat } from "@/data/telegramData";

interface ChatHeaderProps {
  chat: TelegramChat;
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div className="p-3 border-b flex items-center justify-between bg-muted/30">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            {chat.contact.avatar ? (
              <img 
                src={chat.contact.avatar} 
                alt={chat.contact.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                {chat.contact.name.charAt(0)}
              </div>
            )}
          </div>
          <div 
            className={cn(
              "absolute -bottom-1 -right-1 rounded-full p-0.5",
              chat.source === "Bot" ? "bg-blue-100" : "bg-green-100"
            )}
          >
            {chat.source === "Bot" ? (
              <Bot className="h-3.5 w-3.5 text-blue-600" />
            ) : (
              <User className="h-3.5 w-3.5 text-green-600" />
            )}
          </div>
        </div>
        <div>
          <div className="font-medium">{chat.contact.name}</div>
          <div className="text-xs text-muted-foreground">{chat.contact.username}</div>
        </div>
      </div>
      <div>
        <Badge className={cn(
          chat.source === "Bot" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
        )}>
          {chat.source}
        </Badge>
      </div>
    </div>
  );
}
