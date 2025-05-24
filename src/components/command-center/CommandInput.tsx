
import { useState, KeyboardEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CommandToolbar from "./CommandToolbar";
import { useDocuments } from "./DocumentContext";
import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommandInputProps {
  command: string;
  characterCount: number;
  isLoading: boolean;
  onCommandChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  executeCommand: () => void;
}

// Define template types for use in the component
export type PromptTemplate = {
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
  // Mock templates grouped by category - in a real app these would come from an API
  const [templates] = useState<Record<string, PromptTemplate[]>>({
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
  
  const { uploadedDocuments, removeDocument } = useDocuments();

  // Handle Enter key press to execute command
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter was pressed without Shift (for new lines)
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && command.trim()) {
      e.preventDefault(); // Prevent default to avoid new line
      executeCommand();
    }
  };

  return (
    <Card className="shadow-md border-[#9C2D55]/20 flex flex-col z-50">
      <CardContent className="p-3 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-base">P²RA Command Console</h3>
          <span className={`text-xs ${characterCount > 1900 ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/2000
          </span>
        </div>
        <Separator className="my-1" />
        
        {/* Show attached documents if any */}
        {uploadedDocuments.length > 0 && (
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">Attached documents:</div>
            <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto">
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center bg-gray-100 rounded-md text-xs p-1 pr-2">
                  <FileText className="h-3 w-3 mr-1 text-gray-500" />
                  <span className="truncate max-w-[100px]">{doc.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => removeDocument(doc.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Separator className="my-2" />
          </div>
        )}
        
        <div className="flex-1 min-h-[80px] mb-1">
          <Textarea 
            placeholder="Ask any question about clients, policies, or market trends..." 
            className="min-h-24 h-full w-full resize-none focus-visible:ring-0 border-none bg-transparent"
            value={command}
            onChange={onCommandChange}
            onKeyDown={handleKeyDown}
            maxLength={2000}
            rows={3}
          />
        </div>
        
        <CommandToolbar
          isLoading={isLoading}
          command={command}
          templates={templates}
          onSuggestionClick={onSuggestionClick}
          executeCommand={executeCommand}
        />
      </CardContent>
    </Card>
  );
};

export default CommandInput;
