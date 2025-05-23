
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
      
      // Make the API call
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Handle potential errors
      if (!response.ok) {
        const errorData = await response.text();
        const errorMessage = this.getErrorMessage(response.status);
        console.error("Mistral API error:", errorData);
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
      console.error("Error calling Mistral LLM:", error);
      toast.error("Failed to process your command. Please try again.");
      throw error;
    }
  }
  
  // Get appropriate error messages based on status codes
  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "Bad request: The command format is invalid.";
      case 401:
        return "Authorization failed: Unable to access the LLM.";
      case 429:
        return "Too many requests: The LLM service is currently overloaded.";
      case 500:
        return "Server error: The LLM service is currently unavailable.";
      default:
        return "An unknown error occurred while processing your command.";
    }
  }
}

// Export singleton instance
const mistralApi = new MistralApi();
export { mistralApi };
