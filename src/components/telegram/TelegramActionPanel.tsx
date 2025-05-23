
import { TelegramChat } from "@/data/telegramData";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { EmptyActionPanel } from "./action-panel/EmptyActionPanel";
import { IntentSection } from "./action-panel/IntentSection";
import { ClientMatchSection } from "./action-panel/ClientMatchSection";
import { DataQualitySection } from "./action-panel/DataQualitySection";
import { SuggestedActionsSection } from "./action-panel/SuggestedActionsSection";
import { AIActionsSection } from "./action-panel/AIActionsSection";
import { BotCommandsSection } from "./action-panel/BotCommandsSection";
import { ActionPanelFooter } from "./action-panel/ActionPanelFooter";

interface TelegramActionPanelProps {
  chat: TelegramChat | null;
  onMarkActioned?: () => void;
  onSetInProgress?: () => void;
  className?: string;
}

export default function TelegramActionPanel({
  chat,
  onMarkActioned,
  onSetInProgress,
  className
}: TelegramActionPanelProps) {
  if (!chat) {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        <EmptyActionPanel />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="bg-muted/30 p-3 border-b">
        <h3 className="font-medium">P²RA Smart Actions</h3>
        <p className="text-xs text-muted-foreground">
          AI-suggested actions for this conversation
        </p>
      </div>

      <div className="p-3 border-b">
        <IntentSection chat={chat} />
        <ClientMatchSection chat={chat} />
        <DataQualitySection chat={chat} />
      </div>

      <div className="p-3 overflow-y-auto flex-1">
        <SuggestedActionsSection chat={chat} />
        
        <Separator className="my-4" />
        
        <AIActionsSection 
          chat={chat} 
          onMarkActioned={onMarkActioned} 
          onSetInProgress={onSetInProgress} 
        />
        
        <Separator className="my-4" />
        
        <BotCommandsSection />
      </div>

      <ActionPanelFooter />
    </div>
  );
}
