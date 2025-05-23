
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CommandToolbar from "./CommandToolbar";

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
