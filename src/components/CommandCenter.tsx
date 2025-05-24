
import { useState, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import { mistralApi } from "@/services/api/mistralApi";
import { openAiApi } from "@/services/api/openAiApi";
import { toast } from "sonner";
import SidePanel from "./command-center/SidePanel";
import SuggestionsDisplay from "./command-center/SuggestionsDisplay";
import MessageList from "./command-center/MessageList";
import CommandInput from "./command-center/CommandInput";
import { MessageType, ActiveEngagement } from "./command-center/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Key } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// API Provider type
type ApiProvider = "mistral" | "openai";

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
  
  // API provider state
  const [apiProvider, setApiProvider] = useState<ApiProvider>("mistral");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  
  // Load saved API provider preference
  useEffect(() => {
    const savedProvider = localStorage.getItem("p2ra_api_provider");
    if (savedProvider === "mistral" || savedProvider === "openai") {
      setApiProvider(savedProvider);
    }
    
    // Check if OpenAI API key is set
    const openAiKeyExists = !!openAiApi.getApiKey();
    if (savedProvider === "openai" && !openAiKeyExists) {
      toast.warning("OpenAI API key is not set. Please configure your API key.");
    }
  }, []);
  
  // Handle change in the command textarea
  const handleCommandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommand(value);
    setCharacterCount(value.length);
  };
  
  // Handle click on a command suggestion
  const handleSuggestionClick = (suggestionText: string) => {
    setCommand(suggestionText);
    setCharacterCount(suggestionText.length);
  };
  
  // Handle API provider change
  const handleApiProviderChange = (value: string) => {
    const provider = value as ApiProvider;
    setApiProvider(provider);
    localStorage.setItem("p2ra_api_provider", provider);
    
    if (provider === "openai" && !openAiApi.getApiKey()) {
      setShowApiKeyModal(true);
    }
  };
  
  // Save API key
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    openAiApi.setApiKey(apiKey);
    setApiKey("");
    setShowApiKeyModal(false);
  };
  
  // Execute the command by sending it to the selected AI provider
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
      
      let response: string;
      
      if (apiProvider === "openai") {
        // For OpenAI, we'll format the messages differently
        const contextHistory = messages.map(msg => ({ 
          role: msg.role === "assistant" ? "assistant" : "user", 
          content: msg.content 
        }));
        
        response = await openAiApi.sendCommand(command, contextHistory);
      } else {
        // For Mistral, use the existing format
        const contextHistory = messages.map(msg => `${msg.role}: ${msg.content}`);
        response = await mistralApi.sendCommand(command, contextHistory);
      }
      
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
          <div className="flex items-center justify-between p-2 bg-white border-b">
            <div className="flex items-center">
              <Select value={apiProvider} onValueChange={handleApiProviderChange}>
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
                  onClick={() => setShowApiKeyModal(true)}
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
          
          <ResizablePanelGroup direction="vertical" className="h-[calc(100%-40px)]">
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
      
      {/* API Key Modal */}
      <Dialog open={showApiKeyModal} onOpenChange={setShowApiKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OpenAI API Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to enable OpenAI integration.
              Your key will be stored securely in your browser's local storage.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApiKeyModal(false)}>Cancel</Button>
            <Button 
              className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
              onClick={saveApiKey}
            >
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommandCenter;
