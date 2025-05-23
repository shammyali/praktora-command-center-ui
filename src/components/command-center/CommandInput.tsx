
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Loader2, 
  FileTextIcon, 
  PaperclipIcon, 
  Settings2Icon
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocumentUploadZone from "../documents/DocumentUploadZone";

interface CommandInputProps {
  command: string;
  characterCount: number;
  isLoading: boolean;
  onCommandChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  executeCommand: () => void;
}

// Define template types for use in the component
type PromptTemplate = {
  id: number;
  name: string;
  content: string;
  category: string;
};

const CommandInput = ({
  command,
  characterCount,
  isLoading,
  onCommandChange,
  onSuggestionClick,
  executeCommand
}: CommandInputProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  // Mock templates grouped by category - in a real app these would come from an API
  const [templates, setTemplates] = useState<Record<string, PromptTemplate[]>>({
    "general": [
      { id: 1, name: "Policy Inquiry", content: "Show me the policy details for client [CLIENT_NAME]", category: "general" },
      { id: 2, name: "Risk Assessment", content: "Generate a risk assessment for [CLIENT_NAME]", category: "general" },
    ],
    "claims": [
      { id: 3, name: "Claims Status Update", content: "What's the status of claim #[CLAIM_NUMBER] for [CLIENT_NAME]?", category: "claims" },
      { id: 4, name: "Claims History", content: "Show claims history for [CLIENT_NAME] over the last [TIME_PERIOD]", category: "claims" },
    ],
    "quotes": [
      { id: 5, name: "Premium Calculation", content: "Calculate premium for a [VEHICLE_TYPE] with value of [VEHICLE_VALUE] for a [CLIENT_TYPE] client", category: "quotes" },
    ],
  });
  
  const handleTemplateClick = (templateContent: string) => {
    onSuggestionClick(templateContent);
    toast.info("Template applied", {
      description: "You can customize the placeholders before executing"
    });
  };
  
  const handleManageTemplates = () => {
    // Navigate to settings with the prompt-templates tab selected
    navigate("/settings");
    // Add a slight delay to allow the settings page to load before selecting the tab
    setTimeout(() => {
      const settingsTabsElement = document.querySelector('[data-value="prompt-templates"]');
      if (settingsTabsElement) {
        (settingsTabsElement as HTMLElement).click();
      }
    }, 100);
    
    toast.info("Opening Prompt Templates Settings", {
      description: "Manage your saved command templates"
    });
  };

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
    <Card className="shadow-md h-[150px] border-[#9C2D55]/20 flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">P²RA Command Console</h3>
          <span className={`text-xs ${characterCount > 1900 ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/2000
          </span>
        </div>
        <Separator className="my-2" />
        
        <Textarea 
          placeholder="Ask any question about clients, policies, or market trends..." 
          className="min-h-16 flex-grow resize-none focus-visible:ring-0 border-none bg-transparent"
          value={command}
          onChange={onCommandChange}
          maxLength={2000}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAttachClick}
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

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileTextIcon className="h-4 w-4 mr-1" />
                        Templates
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-72">
                      {Object.entries(templates).map(([category, categoryTemplates]) => (
                        <div key={category}>
                          <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase">
                            {category}
                          </div>
                          {categoryTemplates.map((template) => (
                            <DropdownMenuItem 
                              key={template.id}
                              onClick={() => handleTemplateClick(template.content)}
                              className="cursor-pointer"
                            >
                              <span className="font-medium">{template.name}</span>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      ))}
                      <Separator className="my-1" />
                      <DropdownMenuItem onClick={handleManageTemplates}>
                        <Settings2Icon className="h-4 w-4 mr-2" />
                        <span>Manage Templates</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Access saved command templates for common tasks</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-[#9C2D55] hover:bg-[#9C2D55]/90 text-white whitespace-nowrap"
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
        </div>
      </CardContent>
      
      {/* File upload dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-lg">
          <DocumentUploadZone onClose={handleUploadComplete} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CommandInput;
