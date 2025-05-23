
import { Badge } from "@/components/ui/badge";
import { TelegramChat } from "@/data/telegramData";

interface IntentSectionProps {
  chat: TelegramChat;
}

export function IntentSection({ chat }: IntentSectionProps) {
  return (
    <div className="mb-3">
      <div className="text-sm font-medium mb-1">Detected Intent</div>
      <Badge className="bg-blue-100 text-blue-800">
        {chat.aiIntentClassification || "Unknown Intent"}
      </Badge>
    </div>
  );
}
