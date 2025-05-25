
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import CommandSuggestion from "./CommandSuggestion";
import DocumentUploadZone from "@/components/documents/DocumentUploadZone";

interface CommandPromptAreaProps {
  commandText: string;
  setCommandText: (text: string) => void;
  isExecuting: boolean;
  onExecute: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const CommandPromptArea = ({
  commandText,
  setCommandText,
  isExecuting,
  onExecute,
  onSuggestionClick,
  onKeyDown
}: CommandPromptAreaProps) => {
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const handleDocumentUploadClose = () => {
    setShowDocumentUpload(false);
  };

  return (
    <div className="h-full p-5 bg-white">
      {showDocumentUpload && (
        <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <DocumentUploadZone onClose={handleDocumentUploadClose} />
          </div>
        </div>
      )}
      
      <Card className="shadow-md h-full border-[#9C2D55]/20 flex flex-col">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">P²RA Command Console</h3>
            <span className="text-xs text-gray-500">{commandText.length}/2000</span>
          </div>
          <Separator className="my-3" />
          
          <div className="flex gap-2 mb-3 flex-wrap">
            <CommandSuggestion 
              text="Upload Emirates ID" 
              onClick={() => onSuggestionClick("Upload Emirates ID and generate new enquiry")}
            />
            <CommandSuggestion 
              text="Convert quote MP2396" 
              onClick={() => onSuggestionClick("Convert quote MP2396 to policy and issue invoice")}
            />
            <CommandSuggestion 
              text="Send WhatsApp quote" 
              onClick={() => onSuggestionClick("Send WhatsApp quote to Ali Qamar")}
            />
          </div>
          
          <Textarea 
            placeholder="Ask any question about clients, policies, or market trends... (Press Enter to execute)" 
            className="min-h-16 flex-grow resize-none focus-visible:ring-0 border-none bg-transparent" 
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={2000}
          />
          <div className="flex items-center justify-between mt-4 pt-2">
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDocumentUpload(true)}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload documents or images to include with your query</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">Templates</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Access saved command templates for common tasks</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-[#9C2D55] hover:bg-[#9C2D55]/90 text-white whitespace-nowrap"
                  onClick={onExecute}
                  disabled={isExecuting || !commandText.trim()}
                >
                  {isExecuting ? "Processing..." : "Execute Command"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Process your query and provide intelligent assistance (or press Enter)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommandPromptArea;
