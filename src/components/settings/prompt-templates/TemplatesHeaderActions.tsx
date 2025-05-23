
import { Button } from "@/components/ui/button";
import { DownloadIcon, UploadIcon } from "lucide-react";

interface TemplatesHeaderActionsProps {
  onSyncTemplates: () => void;
  onImportTemplates: () => void;
  onExportTemplates: () => void;
}

const TemplatesHeaderActions = ({
  onSyncTemplates,
  onImportTemplates,
  onExportTemplates
}: TemplatesHeaderActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onImportTemplates}
      >
        <UploadIcon className="h-4 w-4 mr-2" />
        Import
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onExportTemplates}
      >
        <DownloadIcon className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button 
        onClick={onSyncTemplates}
        className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
      >
        Sync with PraktoraWeb
      </Button>
    </div>
  );
};

export default TemplatesHeaderActions;
