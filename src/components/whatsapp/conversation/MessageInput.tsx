
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile } from "lucide-react";

interface MessageInputProps {
  autoFocus?: boolean;
}

export default function MessageInput({ autoFocus = false }: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

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
        />
        
        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
          <Smile className="h-4 w-4" />
        </Button>
        
        <Button size="icon" className="rounded-full h-9 w-9 bg-praktora-burgundy hover:bg-praktora-burgundy/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
