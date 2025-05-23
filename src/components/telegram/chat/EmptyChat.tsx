
import { Bot } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-muted/30">
      <Bot className="h-16 w-16 text-muted-foreground mb-3" />
      <p className="text-lg font-medium">No conversation selected</p>
      <p className="text-muted-foreground">Select a conversation to view messages</p>
    </div>
  );
}
