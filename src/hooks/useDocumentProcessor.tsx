
import { MessageType } from "@/components/command-center/types";
import { UploadedDocument } from "@/components/command-center/DocumentContext";

export const useDocumentProcessor = () => {
  /**
   * Prepares document attachments for messages
   */
  const prepareDocumentAttachments = (documents: UploadedDocument[]) => {
    return documents.map(doc => ({
      id: doc.id,
      name: doc.name
    }));
  };

  /**
   * Enriches a command with document information
   */
  const enrichCommandWithDocuments = (
    command: string, 
    documents: UploadedDocument[]
  ): { enrichedCommand: string; userMessageDisplay: string; docAttachments: { id: string; name: string }[] } => {
    // Start with original command
    let enrichedCommand = command;
    let userMessageDisplay = command;
    
    // Prepare document attachments for the message
    const docAttachments = prepareDocumentAttachments(documents);
    
    if (documents.length > 0) {
      // Add document references to the command for display
      const docNames = documents.map(doc => doc.name).join(", ");
      userMessageDisplay = `${command}\n\n[Attached: ${docNames}]`;
      
      // Add document references to the actual command sent to API
      enrichedCommand += `\n\n[Documents attached: ${docNames}]`;
    }
    
    return {
      enrichedCommand,
      userMessageDisplay,
      docAttachments
    };
  };

  /**
   * Creates a user message with document attachments if available
   */
  const createUserMessage = (
    command: string, 
    documents: UploadedDocument[]
  ): MessageType => {
    const { userMessageDisplay, docAttachments } = enrichCommandWithDocuments(command, documents);
    
    return {
      role: "user",
      content: userMessageDisplay,
      attachments: documents.length > 0 ? docAttachments : undefined
    };
  };

  return {
    prepareDocumentAttachments,
    enrichCommandWithDocuments,
    createUserMessage
  };
};
