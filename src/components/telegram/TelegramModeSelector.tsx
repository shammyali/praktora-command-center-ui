
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, User } from "lucide-react";

interface TelegramModeSelectorProps {
  activeMode: "Standard" | "Bot";
  onModeChange: (mode: "Standard" | "Bot") => void;
}

export default function TelegramModeSelector({
  activeMode,
  onModeChange
}: TelegramModeSelectorProps) {
  return (
    <Tabs value={activeMode} onValueChange={(v) => onModeChange(v as "Standard" | "Bot")}>
      <TabsList>
        <TabsTrigger value="Standard" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          Standard Chat Mode
        </TabsTrigger>
        <TabsTrigger value="Bot" className="flex items-center gap-1">
          <Bot className="h-4 w-4" />
          Bot Intelligence Mode
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
