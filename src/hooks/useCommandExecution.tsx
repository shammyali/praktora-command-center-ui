
import { useState } from "react";
import { MessageType } from "@/components/command-center/types";
import { toast } from "sonner";
import { ApiProvider } from "./useApiProvider";
import { useDocuments } from "@/components/command-center/DocumentContext";
import { useDocumentProcessor } from "./useDocumentProcessor";
import { useApiExecutor } from "./useApiExecutor";

export const useCommandExecution = (apiProvider: ApiProvider) => {
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  
  // Access document context
  const { uploadedDocuments, clearDocuments } = useDocuments();
  
  // Import utilities from extracted hooks
  const { createUserMessage } = useDocumentProcessor();
  const { executeWithProvider } = useApiExecutor();

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
      
      // Create user message with document attachments if any
      const userMessage = createUserMessage(command, uploadedDocuments);
      
      // Add user message to the conversation
      setMessages(prev => [...prev, userMessage]);
      
      // Prepare the enriched command to send to the API
      const { enrichedCommand } = userMessage.attachments 
        ? { enrichedCommand: command + "\n\n[Documents attached]" }
        : { enrichedCommand: command };
      
      // Execute the command with the selected provider
      const response = await executeWithProvider({
        apiProvider,
        messages,
        command: enrichedCommand,
        uploadedDocuments
      });
      
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
