
import { toast } from "sonner";

// Interface for the request to OpenAI
interface OpenAIRequest {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  max_tokens?: number;
}

// Interface for the response from OpenAI
interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Class for handling OpenAI API operations
class OpenAiApi {
  private baseUrl: string = "https://api.openai.com/v1/chat/completions";
  private apiKey: string | null = null;
  private defaultModel: string = "gpt-4o-mini"; // Using a modern model with good performance/cost ratio
  
  // Set the API key
  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem("openai_api_key", key);
    toast.success("OpenAI API key saved");
    return true;
  }
  
  // Get the API key (from localStorage if not set yet)
  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem("openai_api_key");
    }
    return this.apiKey;
  }
  
  // Clear the API key
  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem("openai_api_key");
    toast.success("OpenAI API key removed");
  }
  
  // Send a command to OpenAI
  async sendCommand(command: string, contextHistory: Array<{role: string, content: string}> = []): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      toast.error("OpenAI API key not set. Please configure your API key in settings.");
      throw new Error("API key not configured");
    }
    
    try {
      // Prepare the messages array for OpenAI
      const messages = [
        {
          role: "system",
          content: "You are P²RA, an AI assistant specialized in insurance operations. You're part of the Praktora Práxis system, designed to help insurance professionals with their daily tasks. Your responses should be concise, professional and actionable."
        },
        ...contextHistory,
        {
          role: "user", 
          content: command
        }
      ];
      
      const requestBody: OpenAIRequest = {
        model: this.defaultModel,
        messages,
        temperature: 0.7,
      };
      
      console.log("Sending request to OpenAI:", requestBody);
      
      // Make the API call
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
      
      // Handle potential errors
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Error: ${response.status} ${response.statusText}`, errorData);
        
        const errorMessage = this.getErrorMessage(response.status);
        throw new Error(errorMessage);
      }
      
      // Parse the successful response
      const data = await response.json() as OpenAIResponse;
      console.log("Received response from OpenAI:", data);
      
      // Extract the generated text from the response
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No response generated from OpenAI");
      }
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(errorMessage.includes("API key") ? errorMessage : "Failed to process your command with OpenAI. Please try again.");
      
      throw error;
    }
  }
  
  // Get appropriate error messages based on status codes
  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 401:
        return "Invalid API key. Please check your OpenAI API key.";
      case 429:
        return "Too many requests or exceeded rate limit. Please try again later.";
      case 400:
        return "Bad request: The command format is invalid.";
      case 500:
        return "OpenAI server error. Please try again later.";
      case 503:
        return "OpenAI service unavailable. Please try again later.";
      default:
        return `An error (${statusCode}) occurred while processing your command.`;
    }
  }
  
  // Test connection to OpenAI
  async testConnection(): Promise<boolean> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return false;
    }
    
    try {
      // Simple test request with minimal tokens
      const response = await this.sendCommand("Hello, can you respond with just the word 'Connected'?");
      return response.includes("Connected");
    } catch (error) {
      console.error("Connection test to OpenAI failed:", error);
      return false;
    }
  }
  
  // Change the model
  setModel(model: string) {
    this.defaultModel = model;
    localStorage.setItem("openai_model", model);
    toast.success(`OpenAI model updated to: ${model}`);
  }
  
  // Get the current model
  getModel(): string {
    const storedModel = localStorage.getItem("openai_model");
    return storedModel || this.defaultModel;
  }
}

// Export singleton instance
const openAiApi = new OpenAiApi();
export { openAiApi };
