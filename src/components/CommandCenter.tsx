import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import { mistralApi } from "@/services/api/mistralApi";
import { toast } from "sonner";
import SidePanel from "./command-center/SidePanel";
import SuggestionsDisplay from "./command-center/SuggestionsDisplay";
import MessageList from "./command-center/MessageList";
import CommandInput from "./command-center/CommandInput";
import { MessageType, ActiveEngagement } from "./command-center/types";

const CommandCenter = () => {
  const [activeEngagements, setActiveEngagements] = useState<ActiveEngagement[]>([
    {
      title: "Workmen's Compensation Renewal -",
      customerName: "Tom Robers",
      description: "Comprehensive coverage renewal assessment required",
      status: "Awaiting Confirmation",
      statusColor: "yellow" as const,
      animate: true,
      kycStatus: "NO" as const
    }, {
      title: "New Motor Quote -",
      customerName: "Abdullah Ali",
      description: "Comprehensive coverage proposal ready for review",
      status: "Quoted",
      statusColor: "yellow" as const,
      animate: false,
      kycStatus: "YES" as const
    }, {
      title: "Medical Claim -",
      customerName: "Vijay Singh",
      description: "Claim assessment completed and approved",
      status: "Claim Settled",
      statusColor: "green" as const,
      animate: false,
      kycStatus: "PEP" as const
    }, {
      title: "Risk Assessment",
      customerName: "Mohan Lal",
      description: "Complete risk profile for healthcare client",
      status: "In Progress",
      statusColor: "blue" as const,
      animate: false,
      kycStatus: "Request" as const
    }
  ]);

  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  
  // Handle change in the command textarea
  const handleCommandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommand(value);
    setCharacterCount(value.length);
  };
  
  // Handle click on a command suggestion - simplified to just set the command
  const handleSuggestionClick = (suggestionText: string) => {
    setCommand(suggestionText);
    setCharacterCount(suggestionText.length);
  };
  
  // Execute the command by sending it to the Mistral LLM
  const executeCommand = async () => {
    if (!command.trim()) {
      toast.warning("Please enter a command to execute");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Add user message to the conversation
      const userMessage: MessageType = {
        role: "user",
        content: command
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Get conversation history (just the messages content) for context
      const contextHistory = messages.map(msg => `${msg.role}: ${msg.content}`);
      
      // Send command to Mistral API
      const response = await mistralApi.sendCommand(command, contextHistory);
      
      // Add assistant message to the conversation
      const assistantMessage: MessageType = {
        role: "assistant",
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Clear the command input
      setCommand("");
      setCharacterCount(0);
      
    } catch (error) {
      console.error("Error executing command:", error);
      // Error already toasted in the API service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="flex flex-col h-full">
        {/* Right Panel for Instant Commands and Active Engagements */}
        <SidePanel activeEngagements={activeEngagements} />
        
        {/* Main Content Area - Using ResizablePanelGroup for flexible sizing */}
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
              <div className="h-full p-5 bg-white overflow-auto">
                <CommandInput
                  command={command}
                  characterCount={characterCount}
                  isLoading={isLoading}
                  onCommandChange={handleCommandChange}
                  onSuggestionClick={handleSuggestionClick}
                  executeCommand={executeCommand}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
