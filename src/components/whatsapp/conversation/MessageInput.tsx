
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile } from "lucide-react";

interface MessageInputProps {
  autoFocus?: boolean;
  onSendMessage?: (content: string) => void;
}

export default function MessageInput({ autoFocus = false, onSendMessage }: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageText, setMessageText] = useState("");

  // Focus input when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !onSendMessage) return;
    
    onSendMessage(messageText);
    setMessageText("");
    
    // Refocus the input field after sending
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-3 border-t">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <Input 
          ref={inputRef}
          placeholder="Type a message..."
          className="h-9 text-sm"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        
        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
          <Smile className="h-4 w-4" />
        </Button>
        
        <Button 
          size="icon" 
          className="rounded-full h-9 w-9 bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
