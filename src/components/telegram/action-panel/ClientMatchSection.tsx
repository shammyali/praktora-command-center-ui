import { cn } from "@/lib/utils";
import { TelegramChat } from "@/data/telegram";

interface ClientMatchSectionProps {
  chat: TelegramChat;
}

export function ClientMatchSection({ chat }: ClientMatchSectionProps) {
  return (
    <div className="mb-3">
      <div className="text-sm font-medium mb-1">Client Match</div>
      {chat.hasWorkflowLinks ? (
        <div className="flex items-center gap-1 text-sm">
          <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">
            Linked
          </span>
          <span>Gulf Trading LLC</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-sm">
          <span className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded text-xs">
            Likely Match
          </span>
          <span>Gulf Trading LLC</span>
        </div>
      )}
    </div>
  );
}
