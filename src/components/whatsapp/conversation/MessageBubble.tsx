
import { cn } from "@/lib/utils";
import { WhatsAppMessage } from "@/data/whatsapp/types";
import { format } from "date-fns";
import { Paperclip } from "lucide-react";

interface MessageBubbleProps {
  message: WhatsAppMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div 
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
  );
}
