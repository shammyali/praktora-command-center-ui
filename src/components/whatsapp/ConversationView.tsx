
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WhatsAppMessage, WhatsAppConversation } from "@/data/whatsAppData";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Smile, AlertTriangle, Clock, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ConversationViewProps {
  conversation: WhatsAppConversation | null;
  messages: WhatsAppMessage[];
  autoFocusInput?: boolean;
}

export default function ConversationView({
  conversation,
  messages,
  autoFocusInput = false
}: ConversationViewProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  // Focus input when conversation changes or autoFocus is true
  useEffect(() => {
    if (autoFocusInput && conversation && inputRef.current) {
      inputRef.current.focus();
    }
  }, [conversation, autoFocusInput]);
  
  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
        <MessageCircle className="h-12 w-12 mb-2 opacity-20" />
        <p className="text-sm">Select a conversation from the list</p>
      </div>
    );
  }
  
  // Function to render intent classification icon
  const renderIntentIcon = () => {
    if (conversation.type === "Claim") return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (conversation.status === "Unlinked") return <Clock className="h-4 w-4 text-blue-500" />;
    return <MessageCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="flex flex-col h-full">
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
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex",
                message.isIncoming ? "justify-start" : "justify-end"
              )}
            >
              <div 
                className={cn(
                  "max-w-[75%] rounded-lg p-3 shadow-sm",
                  message.isIncoming 
                    ? "bg-white border border-gray-200" 
                    : "bg-praktora-burgundy text-white"
                )}
              >
                {message.type === "text" && (
                  <p className="text-sm">{message.content}</p>
                )}
                
                {message.type === "image" && (
                  <div className="space-y-2">
                    <p className="text-sm">{message.content}</p>
                    <div className="rounded-md overflow-hidden border border-gray-200">
                      <img 
                        src={message.attachmentUrl} 
                        alt="Attachment" 
                        className="w-full h-auto max-h-60 object-cover"
                      />
                    </div>
                    <p className="text-xs opacity-70">{message.attachmentName}</p>
                  </div>
                )}
                
                {message.type === "document" && (
                  <div className="space-y-2">
                    <p className="text-sm">{message.content}</p>
                    <div className="rounded-md overflow-hidden border border-gray-200 bg-gray-50 p-3 flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm">{message.attachmentName}</span>
                    </div>
                  </div>
                )}
                
                <div 
                  className={cn(
                    "text-[10px] mt-1",
                    message.isIncoming ? "text-gray-500" : "text-white/70"
                  )}
                >
                  {format(new Date(message.timestamp), "HH:mm")}
                  {!message.isIncoming && message.status && (
                    <span className="ml-1">{message.status === "read" ? "✓✓" : "✓"}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input 
            ref={inputRef}
            placeholder="Type a message..."
            className="h-9 text-sm"
          />
          
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
            <Smile className="h-4 w-4" />
          </Button>
          
          <Button size="icon" className="rounded-full h-9 w-9 bg-praktora-burgundy hover:bg-praktora-burgundy/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
