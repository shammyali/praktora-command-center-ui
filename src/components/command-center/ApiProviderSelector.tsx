
import { Key, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// API Provider type
export type ApiProvider = "mistral" | "openai";

interface ApiProviderSelectorProps {
  apiProvider: ApiProvider;
  onApiProviderChange: (value: string) => void;
  onOpenApiKeyModal: () => void;
}

const ApiProviderSelector = ({
  apiProvider,
  onApiProviderChange,
  onOpenApiKeyModal
}: ApiProviderSelectorProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white border-b">
      <div className="flex items-center">
        <Select value={apiProvider} onValueChange={onApiProviderChange}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Select AI Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mistral">Mistral LLM</SelectItem>
            <SelectItem value="openai">OpenAI</SelectItem>
          </SelectContent>
        </Select>
        
        {apiProvider === "openai" && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 h-8" 
            onClick={onOpenApiKeyModal}
          >
            <Key className="h-4 w-4 mr-1" />
            API Key
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full ${apiProvider === "mistral" ? 'bg-green-500' : 'bg-blue-500'} mr-1 animate-pulse`}></span>
          Using {apiProvider === "mistral" ? "Mistral LLM" : "OpenAI"}
        </span>
      </div>
    </div>
  );
};

export default ApiProviderSelector;
