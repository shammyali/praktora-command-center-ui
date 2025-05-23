
import { cn } from "@/lib/utils";
import { TelegramMessage } from "@/data/telegram";
import { Paperclip, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MessageBubbleProps {
  message: TelegramMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div 
      className={`flex ${message.isIncoming ? 'justify-start' : 'justify-end'}`}
    >
      <div 
        className={cn(
          "max-w-[75%] rounded-lg p-3 space-y-1",
          message.isIncoming 
            ? "bg-muted text-foreground" 
            : "bg-praktora-burgundy text-white"
        )}
      >
        {/* Special message formatting based on type */}
        {message.type === "command" && (
          <div className="font-mono bg-black/10 rounded px-1 py-0.5 text-sm mb-1">
            {message.content}
          </div>
        )}
        
        {message.type === "button" && (
          <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 text-blue-700 text-sm mb-1">
            {message.content}
          </div>
        )}
        
        {message.type === "text" && <div>{message.content}</div>}
        
        {message.type === "image" && (
          <div className="space-y-2">
            {message.content && <div>{message.content}</div>}
            {message.attachmentUrl && (
              <img 
                src={message.attachmentUrl} 
                alt="Attachment" 
                className="rounded-lg max-h-48 w-auto" 
              />
            )}
          </div>
        )}
        
        {message.type === "document" && (
          <div className="space-y-2">
            {message.content && <div>{message.content}</div>}
            <div className="flex items-center gap-2 bg-black/5 p-2 rounded">
              <Paperclip className="h-4 w-4" />
              <span className="text-sm truncate flex-1">
                {message.attachmentName || "Document"}
              </span>
            </div>
          </div>
        )}
        
        {message.type === "form" && message.formData && (
          <div className="space-y-2">
            <div>{message.content}</div>
            <Card className="bg-white border shadow-sm">
              <CardContent className="p-2 space-y-2">
                <div className="flex items-center gap-2 border-b pb-1">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-sm">Form Submission</span>
                </div>
                {Object.entries(message.formData).map(([key, value]) => (
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
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
