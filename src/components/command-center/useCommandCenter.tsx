
import { useState, useEffect } from "react";
import { MessageType, ActiveEngagement } from "./types";
import { mistralApi } from "@/services/api/mistralApi";
import { openAiApi } from "@/services/api/openAiApi";
import { toast } from "sonner";

// API Provider type
export type ApiProvider = "mistral" | "openai";

export const useCommandCenter = () => {
  const [activeEngagements] = useState<ActiveEngagement[]>([
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
  const saveApiKey = (apiKey: string) => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    openAiApi.setApiKey(apiKey);
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

  return {
    activeEngagements,
    command,
    messages,
    isLoading,
    characterCount,
    apiProvider,
    showApiKeyModal,
    setShowApiKeyModal,
    handleCommandChange,
    handleSuggestionClick,
    handleApiProviderChange,
    saveApiKey,
    executeCommand
  };
};
