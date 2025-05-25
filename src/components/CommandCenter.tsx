
import { SparklesIcon } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import { useState, useEffect } from "react";
import { praktoraWebApi } from "@/services/api/praktoraWebApi";
import { toast } from "sonner";
import InstantCommandsPanel from "./command-center/InstantCommandsPanel";
import ActiveEngagementsPanel from "./command-center/ActiveEngagementsPanel";
import CommandPromptArea from "./command-center/CommandPromptArea";

const CommandCenter = () => {
  const [activeEngagements, setActiveEngagements] = useState<any[]>([]);
  const [commandText, setCommandText] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load active engagements on component mount
  useEffect(() => {
    loadActiveEngagements();
  }, []);

  const loadActiveEngagements = async () => {
    try {
      setIsLoading(true);
      const engagements = await praktoraWebApi.getActiveEngagements();
      setActiveEngagements(engagements);
    } catch (error) {
      console.error("Failed to load active engagements:", error);
      setActiveEngagements([]);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCommand = async () => {
    if (!commandText.trim()) {
      toast.error("Please enter a command");
      return;
    }

    try {
      setIsExecuting(true);
      const result = await praktoraWebApi.executeCommand(commandText);
      
      toast.success(`Command executed successfully: ${result.result}`);
      setCommandText("");
      
      // Refresh engagements after command execution
      await loadActiveEngagements();
    } catch (error) {
      console.error("Command execution failed:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCommandText(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeCommand();
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="flex flex-col h-full">
        {/* Right Panel for Instant Commands and Active Engagements */}
        <div className="fixed top-16 right-0 bottom-0 w-80 border-l border-gray-200 bg-white p-5 overflow-auto z-10">
          <InstantCommandsPanel />
          <ActiveEngagementsPanel 
            activeEngagements={activeEngagements}
            isLoading={isLoading}
            onRefresh={loadActiveEngagements}
          />
        </div>
        
        {/* Main Content Area */}
        <div className="fixed left-60 right-80 bottom-0 top-16 overflow-hidden">
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Display Area - 75% of the available space initially */}
            <ResizablePanel defaultSize={75} minSize={60}>
              <div className="h-full p-5 bg-gradient-to-br from-white to-blue-50 overflow-auto">
                <div className="h-full w-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
                      <p className="text-[#5A6B82]/40 italic font-semibold">
                        Try: 'Compare RSA and AXA for MP2118' or 'Create endorsement for GM123/1'
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
                      <p className="text-[#5A6B82]/40 italic font-semibold">
                        Try: 'Upload Emirates ID and generate new enquiry' or 'Convert quote MP2396 to policy'
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
                      <p className="text-[#5A6B82]/40 italic font-semibold">
                        Try: 'Send WhatsApp quote to Ali Qamar' or 'Download AXA motor policies expiring today'
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Prompt Area - 25% of the available space initially */}
            <ResizablePanel defaultSize={25} minSize={15}>
              <CommandPromptArea 
                commandText={commandText}
                setCommandText={setCommandText}
                isExecuting={isExecuting}
                onExecute={executeCommand}
                onSuggestionClick={handleSuggestionClick}
                onKeyDown={handleKeyDown}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
