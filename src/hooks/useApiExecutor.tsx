
import { MessageType } from "@/components/command-center/types";
import { mistralApi } from "@/services/api/mistralApi";
import { openAiApi } from "@/services/api/openAiApi";
import { ApiProvider } from "./useApiProvider";
import { UploadedDocument } from "@/components/command-center/DocumentContext";

export interface ApiExecutorOptions {
  apiProvider: ApiProvider;
  messages: MessageType[];
  command: string;
  uploadedDocuments: UploadedDocument[];
}

export const useApiExecutor = () => {
  /**
   * Executes the command with the selected API provider
   */
  const executeWithProvider = async ({
    apiProvider,
    messages,
    command,
    uploadedDocuments
  }: ApiExecutorOptions): Promise<string> => {
    let response: string;
    
    if (apiProvider === "openai") {
      // For OpenAI, format the messages differently
      const contextHistory = messages.map(msg => ({ 
        role: msg.role === "assistant" ? "assistant" as const : "user" as const, 
        content: msg.content 
      }));
      
      // Add document contents for OpenAI if available
      if (uploadedDocuments.length > 0) {
        const documentContents = uploadedDocuments.map(doc => 
          `Document: ${doc.name}\nContent: ${doc.content?.substring(0, 1000)}${doc.content && doc.content.length > 1000 ? '...(truncated)' : ''}`
        ).join('\n\n');
        
        response = await openAiApi.sendCommandWithDocuments(command, contextHistory, documentContents);
      } else {
        response = await openAiApi.sendCommand(command, contextHistory);
      }
    } else {
      // For Mistral, use the existing format
      const contextHistory = messages.map(msg => `${msg.role}: ${msg.content}`);
      
      // Add document contents for Mistral if available
      if (uploadedDocuments.length > 0) {
        const documentContents = uploadedDocuments.map(doc => 
          `Document: ${doc.name}\nContent: ${doc.content?.substring(0, 1000)}${doc.content && doc.content.length > 1000 ? '...(truncated)' : ''}`
        ).join('\n\n');
        
        response = await mistralApi.sendCommandWithDocuments(command, contextHistory, documentContents);
      } else {
        response = await mistralApi.sendCommand(command, contextHistory);
      }
    }
    
    return response;
  };

  return { executeWithProvider };
};
