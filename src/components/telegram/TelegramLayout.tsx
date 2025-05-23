
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface TelegramLayoutProps {
  header: ReactNode;
  inboxComponent: ReactNode;
  chatComponent: ReactNode;
  actionPanel?: ReactNode;
  showActionPanel: boolean;
}

export default function TelegramLayout({
  header,
  inboxComponent,
  chatComponent,
  actionPanel,
  showActionPanel
}: TelegramLayoutProps) {
  return (
    <>
      {header}
      
      <Separator className="mt-2" />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[320px] border-r flex flex-col overflow-hidden">
          {inboxComponent}
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {chatComponent}
        </div>
        
        {showActionPanel && actionPanel && (
          <div className="w-[280px] border-l flex flex-col overflow-hidden">
            {actionPanel}
          </div>
        )}
      </div>
    </>
  );
}
