
import { useState, FormEvent } from "react";
import { SendIcon, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
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
  );
}
