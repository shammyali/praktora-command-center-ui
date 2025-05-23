
import { cn } from "@/lib/utils";
import { TelegramChat } from "@/data/telegramData";

interface DataQualitySectionProps {
  chat: TelegramChat;
}

export function DataQualitySection({ chat }: DataQualitySectionProps) {
  if (!chat.dataQualityScore) return null;

  return (
    <div className="mb-3">
      <div className="text-sm font-medium mb-1">Data Quality Score</div>
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full",
              chat.dataQualityScore >= 80 ? "bg-green-500" : 
              chat.dataQualityScore >= 50 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${chat.dataQualityScore}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">
          {chat.dataQualityScore}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {chat.dataQualityScore >= 80 
          ? "High quality data, ready for processing"
          : chat.dataQualityScore >= 50
          ? "Medium quality data, review recommended"
          : "Low quality data, manual review required"
        }
      </p>
    </div>
  );
}
