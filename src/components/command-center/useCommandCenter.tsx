
import { useActiveEngagements } from "@/hooks/useActiveEngagements";
import { useApiProvider, ApiProvider } from "@/hooks/useApiProvider";
import { useCommandExecution } from "@/hooks/useCommandExecution";

export type { ApiProvider };

export const useCommandCenter = () => {
  // Get active engagements
  const activeEngagements = useActiveEngagements();
  
  // Get API provider management
  const { 
    apiProvider, 
    showApiKeyModal,
    setShowApiKeyModal, 
    handleApiProviderChange,
    saveApiKey 
  } = useApiProvider();
  
  // Get command execution functionality
  const { 
    command,
    messages,
    isLoading,
    characterCount,
    handleCommandChange,
    handleSuggestionClick,
    executeCommand
  } = useCommandExecution(apiProvider);

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
