
import { useState } from "react";
import { MessageType } from "@/components/command-center/types";
import { mistralApi } from "@/services/api/mistralApi";
import { openAiApi } from "@/services/api/openAiApi";
import { toast } from "sonner";
import { ApiProvider } from "./useApiProvider";
import { useDocuments } from "@/components/command-center/DocumentContext";

export const useCommandExecution = (apiProvider: ApiProvider) => {
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  
  // Access document context
  const { uploadedDocuments, clearDocuments } = useDocuments();

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

  // Execute the command by sending it to the selected AI provider
  const executeCommand = async () => {
    if (!command.trim()) {
      toast.warning("Please enter a command to execute");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Prepare the command with documents if any
      let enrichedCommand = command;
      let userMessageDisplay = command;
      
      // Prepare document attachments for the message
      const docAttachments = uploadedDocuments.map(doc => ({
        id: doc.id,
        name: doc.name
      }));
      
      if (uploadedDocuments.length > 0) {
        // Add document references to the command for display
        const docNames = uploadedDocuments.map(doc => doc.name).join(", ");
        userMessageDisplay = `${command}\n\n[Attached: ${docNames}]`;
        
        // Add document references to the actual command sent to API
        enrichedCommand += `\n\n[Documents attached: ${docNames}]`;
      }
      
      // Add user message to the conversation
      const userMessage: MessageType = {
        role: "user",
        content: userMessageDisplay,
        attachments: uploadedDocuments.length > 0 ? docAttachments : undefined
      };
      setMessages(prev => [...prev, userMessage]);
      
      let response: string;
      
      if (apiProvider === "openai") {
        // For OpenAI, we'll format the messages differently
        const contextHistory = messages.map(msg => ({ 
          role: msg.role === "assistant" ? "assistant" as const : "user" as const, 
          content: msg.content 
        }));
        
        // Add document contents for OpenAI if available
        if (uploadedDocuments.length > 0) {
          const documentContents = uploadedDocuments.map(doc => 
            `Document: ${doc.name}\nContent: ${doc.content?.substring(0, 1000)}${doc.content && doc.content.length > 1000 ? '...(truncated)' : ''}`
          ).join('\n\n');
          
          response = await openAiApi.sendCommandWithDocuments(enrichedCommand, contextHistory, documentContents);
        } else {
          response = await openAiApi.sendCommand(enrichedCommand, contextHistory);
        }
      } else {
        // For Mistral, use the existing format
        const contextHistory = messages.map(msg => `${msg.role}: ${msg.content}`);
        
        // Add document contents for Mistral if available
        if (uploadedDocuments.length > 0) {
          const documentContents = uploadedDocuments.map(doc => 
            `Document: ${doc.name}\nContent: ${doc.content?.substring(0, 1000)}${doc.content && doc.content.length > 1000 ? '...(truncated)' : ''}`
          ).join('\n\n');
          
          response = await mistralApi.sendCommandWithDocuments(enrichedCommand, contextHistory, documentContents);
        } else {
          response = await mistralApi.sendCommand(enrichedCommand, contextHistory);
        }
      }
      
      // Add assistant message to the conversation
      const assistantMessage: MessageType = {
        role: "assistant",
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Clear the command input and documents
      setCommand("");
      setCharacterCount(0);
      clearDocuments();
      
    } catch (error) {
      console.error("Error executing command:", error);
      // Error already toasted in the API service
    } finally {
      setIsLoading(false);
    }
  };

  return {
    command,
    messages,
    isLoading,
    characterCount,
    handleCommandChange,
    handleSuggestionClick,
    executeCommand
  };
};
