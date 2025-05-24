
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";
import MessageList from "./MessageList";
import SuggestionsDisplay from "./SuggestionsDisplay";
import CommandInput from "./CommandInput";
import ApiProviderSelector from "./ApiProviderSelector";
import { MessageType } from "./types";
import { ApiProvider } from "./useCommandCenter";

interface CommandCenterContentProps {
  messages: MessageType[];
  command: string;
  characterCount: number;
  isLoading: boolean;
  apiProvider: ApiProvider;
  onCommandChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSuggestionClick: (suggestionText: string) => void;
  onApiProviderChange: (value: string) => void;
  onOpenApiKeyModal: () => void;
  executeCommand: () => void;
}

const CommandCenterContent = ({
  messages,
  command,
  characterCount,
  isLoading,
  apiProvider,
  onCommandChange,
  onSuggestionClick,
  onApiProviderChange,
  onOpenApiKeyModal,
  executeCommand
}: CommandCenterContentProps) => {
  return (
    <div className="fixed left-60 right-80 bottom-0 top-16 overflow-hidden flex flex-col">
      {/* API Provider Selector */}
      <ApiProviderSelector 
        apiProvider={apiProvider}
        onApiProviderChange={onApiProviderChange}
        onOpenApiKeyModal={onOpenApiKeyModal}
      />
      
      <div className="flex-1">
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* Display Area - 50% of the available space initially */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-5 bg-gradient-to-br from-white to-blue-50 overflow-auto">
              {messages.length === 0 ? (
                <SuggestionsDisplay />
              ) : (
                <MessageList messages={messages} />
              )}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Prompt Area - 50% of the available space for better visibility */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full bg-white overflow-hidden">
              <CommandInput
                command={command}
                characterCount={characterCount}
                isLoading={isLoading}
                onCommandChange={onCommandChange}
                onSuggestionClick={onSuggestionClick}
                executeCommand={executeCommand}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CommandCenterContent;
