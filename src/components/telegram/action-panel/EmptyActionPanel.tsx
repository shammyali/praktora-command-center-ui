
import { FileText } from "lucide-react";

export function EmptyActionPanel() {
  return (
    <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-3" />
      <h3 className="font-medium">No conversation selected</h3>
      <p className="text-muted-foreground text-sm">
        Select a conversation to see P²RA actions
      </p>
    </div>
  );
}
