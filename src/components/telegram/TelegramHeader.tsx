
import { PanelLeft, PanelRight, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TelegramModeSelector from "./TelegramModeSelector";

interface TelegramHeaderProps {
  activeMode: "Standard" | "Bot";
  showActionPanel: boolean;
  onModeChange: (mode: "Standard" | "Bot") => void;
  onToggleActionPanel: () => void;
}

export default function TelegramHeader({
  activeMode,
  showActionPanel,
  onModeChange,
  onToggleActionPanel
}: TelegramHeaderProps) {
  return (
    <div className="px-4 flex justify-between items-center">
      <div className="flex gap-4">
        <TelegramModeSelector 
          activeMode={activeMode} 
          onModeChange={onModeChange} 
        />
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onToggleActionPanel}>
          <PanelRight className="h-4 w-4 mr-1" /> {showActionPanel ? "Hide" : "Show"} Actions
        </Button>
        <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/80">
          <SparklesIcon className="h-4 w-4 mr-1" /> Auto-Process
        </Button>
      </div>
    </div>
  );
}
