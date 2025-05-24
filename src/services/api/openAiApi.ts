
import { openAiApiClient } from "./openAiApiClient";
import { openAiStorageManager } from "./utils/openAiStorageUtils";

// Re-export the API client instance as openAiApi for backward compatibility
const openAiApi = openAiApiClient;

// Export everything
export { 
  openAiApi,
  openAiStorageManager
};
