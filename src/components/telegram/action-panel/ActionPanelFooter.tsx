
import { Button } from "@/components/ui/button";
import { MessageSquareIcon } from "lucide-react";

export function ActionPanelFooter() {
  return (
    <div className="mt-auto p-3 border-t">
      <Button 
        className="w-full flex items-center gap-2"
        size="sm"
      >
        <MessageSquareIcon className="w-4 h-4" />
        <span>Open Analytics</span>
      </Button>
    </div>
  );
}
