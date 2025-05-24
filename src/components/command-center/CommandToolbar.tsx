
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, PaperclipIcon } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocumentUploadZone from "../documents/DocumentUploadZone";
import TemplateDropdown from "./TemplateDropdown";
import { toast } from "sonner";

export type PromptTemplate = {
  id: number;
  name: string;
  content: string;
  category: string;
};

interface CommandToolbarProps {
  isLoading: boolean;
  command: string;
  templates: Record<string, PromptTemplate[]>;
  onSuggestionClick: (suggestion: string) => void;
  executeCommand: () => void;
}

const CommandToolbar = ({
  isLoading,
  command,
  templates,
  onSuggestionClick,
  executeCommand
}: CommandToolbarProps) => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const handleAttachClick = () => {
    setShowUploadDialog(true);
  };

  const handleUploadComplete = () => {
    setShowUploadDialog(false);
    toast.success("Documents attached to command", {
      description: "Your documents will be processed with your query"
    });
  };

  return (
    <div className="flex items-center justify-between pt-2 relative z-10">
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAttachClick}
                className="bg-white"
              >
                <PaperclipIcon className="h-4 w-4 mr-1" />
                Attach
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload documents or images to include with your query</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TemplateDropdown 
          templates={templates} 
          onTemplateClick={onSuggestionClick} 
        />
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="sm" 
              className="bg-[#9C2D55] hover:bg-[#9C2D55]/90 text-white whitespace-nowrap z-10"
              onClick={executeCommand}
              disabled={isLoading || !command.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Execute Command"
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Process your query and provide intelligent assistance</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* File upload dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-lg">
          <DocumentUploadZone onClose={handleUploadComplete} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommandToolbar;
