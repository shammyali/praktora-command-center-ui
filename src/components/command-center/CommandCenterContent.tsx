
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";
import MessageList from "./MessageList";
import SuggestionsDisplay from "./SuggestionsDisplay";
import CommandInput from "./CommandInput";
import { MessageType } from "./types";

interface CommandCenterContentProps {
  messages: MessageType[];
  command: string;
  characterCount: number;
  isLoading: boolean;
  onCommandChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSuggestionClick: (suggestionText: string) => void;
  executeCommand: () => void;
}

const CommandCenterContent = ({
  messages,
  command,
  characterCount,
  isLoading,
  onCommandChange,
  onSuggestionClick,
  executeCommand
}: CommandCenterContentProps) => {
  return (
    <div className="fixed left-60 right-80 bottom-0 top-16 overflow-hidden">
      <ResizablePanelGroup direction="vertical" className="h-full">
        {/* Display Area - 75% of the available space initially */}
        <ResizablePanel defaultSize={75} minSize={60}>
          <div className="h-full p-5 bg-gradient-to-br from-white to-blue-50 overflow-auto">
            {messages.length === 0 ? (
              <SuggestionsDisplay />
            ) : (
              <MessageList messages={messages} />
            )}
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Prompt Area - 25% of the available space initially to make it more compact */}
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="h-full p-5 bg-white overflow-visible relative">
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
  );
};

export default CommandCenterContent;
