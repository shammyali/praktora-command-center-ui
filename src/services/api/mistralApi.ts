
import { toast } from "sonner";

// Interface for the request to Mistral LLM
interface MistralRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  stop?: string[];
}

// Interface for the response from Mistral LLM
interface MistralResponse {
  choices: {
    text: string;
    index: number;
  }[];
  id: string;
  object: string;
  created: number;
  model: string;
}

// Class for handling Mistral LLM API operations
class MistralApi {
  private baseUrl: string = "https://40.120.115.50:5000/v1/completions";
  private defaultModel: string = "mistral-7b";
  
  // Send a command to the Mistral LLM
  async sendCommand(command: string, contextHistory: string[] = []): Promise<string> {
    try {
      // Create the context by joining previous conversation history if provided
      const context = contextHistory.length > 0 
        ? contextHistory.join("\n") + "\n" + command
        : command;
      
      const requestBody: MistralRequest = {
        model: this.defaultModel,
        prompt: context,
        max_tokens: 1000,
        temperature: 0.7,
      };

      console.log("Sending request to Mistral LLM:", requestBody);
      
      // Make the API call with additional options for HTTPS
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        // Add HTTPS specific options
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      // Handle potential errors
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`HTTP Error: ${response.status} ${response.statusText}`, errorData);
        
        // Check for HTTPS specific errors
        if (response.status === 0) {
          throw new Error("Network error: HTTPS connection failed. Please check your SSL/TLS configuration.");
        }
        
        const errorMessage = this.getErrorMessage(response.status);
        throw new Error(errorMessage);
      }
      
      // Parse the successful response
      const data = await response.json() as MistralResponse;
      console.log("Received response from Mistral LLM:", data);
      
      // Extract the generated text from the response
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].text;
      } else {
        throw new Error("No response generated from the LLM");
      }
    } catch (error) {
      // Enhanced error handling
      console.error("Error calling Mistral LLM:", error);
      
      // Detect HTTPS/TLS related errors
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("SSL") || 
          errorMessage.includes("certificate") || 
          errorMessage.includes("TLS")) {
        toast.error("Secure connection error. Please check SSL/TLS configuration.");
      } else if (errorMessage.includes("NetworkError") || errorMessage.includes("Network error")) {
        toast.error("Network error connecting to Mistral LLM. Please check your connection.");
      } else {
        toast.error("Failed to process your command. Please try again.");
      }
      
      throw error;
    }
  }

  // Send a command with document content to the Mistral LLM
  async sendCommandWithDocuments(command: string, contextHistory: string[] = [], documentContent: string = ""): Promise<string> {
    try {
      // Create context with documents
      let context = contextHistory.length > 0 
        ? contextHistory.join("\n") + "\n"
        : "";
      
      // Add document content at the beginning for better context
      if (documentContent) {
        context += "--- DOCUMENT CONTENT START ---\n" + documentContent + "\n--- DOCUMENT CONTENT END ---\n\n";
      }
      
      context += command;
      
      const requestBody: MistralRequest = {
        model: this.defaultModel,
        prompt: context,
        max_tokens: 1500, // Increase token limit for document processing
        temperature: 0.5, // Lower temperature for more focused responses with documents
      };

      console.log("Sending request with documents to Mistral LLM");
      
      // Make the API call
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`HTTP Error: ${response.status} ${response.statusText}`, errorData);
        
        if (response.status === 0) {
          throw new Error("Network error: HTTPS connection failed. Please check your SSL/TLS configuration.");
        }
        
        const errorMessage = this.getErrorMessage(response.status);
        throw new Error(errorMessage);
      }
      
      const data = await response.json() as MistralResponse;
      console.log("Received response from Mistral LLM with documents");
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].text;
      } else {
        throw new Error("No response generated from the LLM");
      }
    } catch (error) {
      console.error("Error calling Mistral LLM with documents:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("SSL") || 
          errorMessage.includes("certificate") || 
          errorMessage.includes("TLS")) {
        toast.error("Secure connection error. Please check SSL/TLS configuration.");
      } else if (errorMessage.includes("NetworkError") || errorMessage.includes("Network error")) {
        toast.error("Network error connecting to Mistral LLM. Please check your connection.");
      } else {
        toast.error("Failed to process your command with documents. Please try again.");
      }
      
      throw error;
    }
  }
  
  // Get appropriate error messages based on status codes
  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 0:
        return "Network error: Failed to establish a secure connection to the LLM service.";
      case 400:
        return "Bad request: The command format is invalid.";
      case 401:
        return "Authorization failed: Unable to access the LLM.";
      case 403:
        return "Forbidden: The request was rejected by the LLM service.";
      case 429:
        return "Too many requests: The LLM service is currently overloaded.";
      case 500:
        return "Server error: The LLM service is currently unavailable.";
      case 502:
        return "Bad gateway: The LLM service is temporarily unreachable.";
      case 503:
        return "Service unavailable: The LLM service is down for maintenance.";
      case 504:
        return "Gateway timeout: The LLM service took too long to respond.";
      default:
        return `An error (${statusCode}) occurred while processing your command.`;
    }
  }
  
  // Test connection to the Mistral LLM
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "HEAD",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      
      return response.ok;
    } catch (error) {
      console.error("Connection test to Mistral LLM failed:", error);
      return false;
    }
  }
}

// Export singleton instance
const mistralApi = new MistralApi();
export { mistralApi };
