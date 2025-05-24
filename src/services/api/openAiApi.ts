
import { toast } from "sonner";

type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature: number;
  max_tokens: number;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
    index: number;
  }[];
}

class OpenAIApi {
  private baseUrl: string = "https://api.openai.com/v1/chat/completions";
  private localStorageKey: string = "p2ra_openai_api_key";
  private sessionStorageKey: string = "openai_temp_key";
  private defaultModel: string = "gpt-4o-mini"; // Using a compatible model

  // Get the API key from storage
  getApiKey(): string | null {
    // First check for a temporary session key
    const sessionKey = sessionStorage.getItem(this.sessionStorageKey);
    if (sessionKey) {
      return sessionKey;
    }
    // Fall back to stored key
    return localStorage.getItem(this.localStorageKey);
  }

  // Set the API key in local storage
  setApiKey(apiKey: string): void {
    localStorage.setItem(this.localStorageKey, apiKey);
    // Remove any temporary key
    sessionStorage.removeItem(this.sessionStorageKey);
  }

  // Check if using a temporary key
  isUsingTemporaryKey(): boolean {
    return !!sessionStorage.getItem(this.sessionStorageKey);
  }

  // Clear any stored key
  clearApiKey(): void {
    localStorage.removeItem(this.localStorageKey);
    sessionStorage.removeItem(this.sessionStorageKey);
  }

  // Send a command to the OpenAI API
  async sendCommand(command: string, contextHistory: OpenAIMessage[] = []): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      toast.error("OpenAI API key is not configured");
      throw new Error("API key not found");
    }

    try {
      // Prepare the messages
      const messages: OpenAIMessage[] = [
        {
          role: "system",
          content: "You are P²RA, an advanced insurance assistant with expertise in policy analysis, risk assessment, and claim processing. Provide accurate, concise, and professional responses to insurance-related queries.",
        },
        ...contextHistory,
        {
          role: "user",
          content: command,
        },
      ];

      const requestBody: OpenAIRequest = {
        model: this.defaultModel,
        messages,
        temperature: 0.7,
        max_tokens: 800,
      };

      console.log("Sending request to OpenAI:", { ...requestBody, messages: "messages here" });

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`OpenAI API Error: ${response.status}`, errorData);
        throw new Error(this.getErrorMessage(response.status));
      }

      const data = await response.json() as OpenAIResponse;
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No response generated from OpenAI");
      }
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Error handling for different situations
      if (errorMessage.includes("API key")) {
        toast.error("Invalid OpenAI API key. Please check your API key in settings.");
      } else if (errorMessage.includes("429")) {
        toast.error("OpenAI API rate limit exceeded. Please try again later.");
      } else {
        toast.error("Failed to process your command. Please try again.");
      }
      
      throw error;
    }
  }
  
  // Send a command with document content to OpenAI
  async sendCommandWithDocuments(command: string, contextHistory: OpenAIMessage[] = [], documentContent: string): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      toast.error("OpenAI API key is not configured");
      throw new Error("API key not found");
    }

    try {
      // Prepare the messages with document content
      const messages: OpenAIMessage[] = [
        {
          role: "system",
          content: "You are P²RA, an advanced insurance assistant with expertise in policy analysis, risk assessment, and claim processing. You'll be analyzing documents and responding to queries based on their content."
        }
      ];
      
      // Add document content as a separate user message
      if (documentContent) {
        messages.push({
          role: "user",
          content: `Here are the documents to analyze:\n\n${documentContent}`
        });
        
        // Add system confirmation of document receipt
        messages.push({
          role: "assistant",
          content: "I've received the documents and will analyze them for your query."
        });
      }
      
      // Add previous conversation context
      messages.push(...contextHistory);
      
      // Add the current command
      messages.push({
        role: "user",
        content: command
      });

      const requestBody: OpenAIRequest = {
        model: this.defaultModel,
        messages,
        temperature: 0.5, // Lower temperature for more focused responses with documents
        max_tokens: 1500, // Increase token limit for document processing
      };

      console.log("Sending request with documents to OpenAI");

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`OpenAI API Error: ${response.status}`, errorData);
        throw new Error(this.getErrorMessage(response.status));
      }

      const data = await response.json() as OpenAIResponse;
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No response generated from OpenAI");
      }
    } catch (error) {
      console.error("Error calling OpenAI with documents:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      if (errorMessage.includes("API key")) {
        toast.error("Invalid OpenAI API key. Please check your API key in settings.");
      } else if (errorMessage.includes("429")) {
        toast.error("OpenAI API rate limit exceeded. Please try again later.");
      } else {
        toast.error("Failed to process your command with documents. Please try again.");
      }
      
      throw error;
    }
  }

  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "Bad request: The OpenAI API request was invalid.";
      case 401:
        return "Unauthorized: Invalid OpenAI API key.";
      case 403:
        return "Forbidden: The request was rejected by OpenAI.";
      case 404:
        return "Not found: The requested resource does not exist.";
      case 429:
        return "Too many requests: You've exceeded your OpenAI API rate limit.";
      case 500:
        return "Server error: OpenAI service is currently unavailable.";
      case 502:
        return "Bad gateway: OpenAI service is temporarily unreachable.";
      case 503:
        return "Service unavailable: OpenAI service is down for maintenance.";
      case 504:
        return "Gateway timeout: OpenAI service took too long to respond.";
      default:
        return `An error (${statusCode}) occurred while processing your OpenAI request.`;
    }
  }
}

// Export singleton instance
const openAiApi = new OpenAIApi();
export { openAiApi };
