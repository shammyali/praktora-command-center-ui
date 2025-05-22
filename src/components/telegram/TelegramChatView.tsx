
import { useState, useRef, useEffect } from "react";
import { SendIcon, Paperclip, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TelegramChat, TelegramMessage } from "@/data/telegramData";

interface TelegramChatViewProps {
  chat: TelegramChat | null;
  messages: TelegramMessage[];
}

export default function TelegramChatView({ chat, messages }: TelegramChatViewProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!chat) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 bg-muted/30">
        <Bot className="h-16 w-16 text-muted-foreground mb-3" />
        <p className="text-lg font-medium">No conversation selected</p>
        <p className="text-muted-foreground">Select a conversation to view messages</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
      // In a real app, you'd send this message to your backend
    }
  };

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
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/10">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <div className="flex justify-center my-2">
              <Badge variant="outline" className="bg-background">
                {new Date(group.date).toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Badge>
            </div>

            {group.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isIncoming ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={cn(
                    "max-w-[75%] rounded-lg p-3 space-y-1",
                    msg.isIncoming 
                      ? "bg-muted text-foreground" 
                      : "bg-praktora-burgundy text-white"
                  )}
                >
                  {/* Special message formatting based on type */}
                  {msg.type === "command" && (
                    <div className="font-mono bg-black/10 rounded px-1 py-0.5 text-sm mb-1">
                      {msg.content}
                    </div>
                  )}
                  
                  {msg.type === "button" && (
                    <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 text-blue-700 text-sm mb-1">
                      {msg.content}
                    </div>
                  )}
                  
                  {msg.type === "text" && <div>{msg.content}</div>}
                  
                  {msg.type === "image" && (
                    <div className="space-y-2">
                      {msg.content && <div>{msg.content}</div>}
                      {msg.attachmentUrl && (
                        <img 
                          src={msg.attachmentUrl} 
                          alt="Attachment" 
                          className="rounded-lg max-h-48 w-auto" 
                        />
                      )}
                    </div>
                  )}
                  
                  {msg.type === "document" && (
                    <div className="space-y-2">
                      {msg.content && <div>{msg.content}</div>}
                      <div className="flex items-center gap-2 bg-black/5 p-2 rounded">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm truncate flex-1">
                          {msg.attachmentName || "Document"}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {msg.type === "form" && msg.formData && (
                    <div className="space-y-2">
                      <div>{msg.content}</div>
                      <Card className="bg-white border shadow-sm">
                        <CardContent className="p-2 space-y-2">
                          <div className="flex items-center gap-2 border-b pb-1">
                            <Bot className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-sm">Form Submission</span>
                          </div>
                          {Object.entries(msg.formData).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                              <span className="text-muted-foreground font-medium">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 flex justify-end">
                    {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-praktora-burgundy hover:bg-praktora-burgundy/80">
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
