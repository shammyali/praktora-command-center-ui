
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { openAiApi } from "@/services/api/openAiApi";

// API Provider type
export type ApiProvider = "mistral" | "openai";

export const useApiProvider = () => {
  // API provider state
  const [apiProvider, setApiProvider] = useState<ApiProvider>("mistral");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Load saved API provider preference
  useEffect(() => {
    const savedProvider = localStorage.getItem("p2ra_api_provider");
    if (savedProvider === "mistral" || savedProvider === "openai") {
      setApiProvider(savedProvider);
    }
    
    // Check if OpenAI API key is set
    const openAiKeyExists = !!openAiApi.getApiKey();
    if (savedProvider === "openai" && !openAiKeyExists) {
      toast.warning("OpenAI API key is not set. Please configure your API key.");
    }

    // Clear any temporary OpenAI key on page refresh
    if (openAiApi.isUsingTemporaryKey()) {
      const tempKey = openAiApi.getApiKey();
      // We'll save it to session storage so it persists until browser is closed
      if (tempKey) {
        sessionStorage.setItem("openai_temp_key", tempKey);
      }
    }
  }, []);

  // Handle API provider change
  const handleApiProviderChange = (value: string) => {
    const provider = value as ApiProvider;
    setApiProvider(provider);
    localStorage.setItem("p2ra_api_provider", provider);
    
    if (provider === "openai" && !openAiApi.getApiKey()) {
      setShowApiKeyModal(true);
    }
  };
  
  // Save API key
  const saveApiKey = (apiKey: string) => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    openAiApi.setApiKey(apiKey);
    setShowApiKeyModal(false);
    toast.success("API key saved successfully");
  };

  return {
    apiProvider,
    showApiKeyModal,
    setShowApiKeyModal,
    handleApiProviderChange,
    saveApiKey
  };
};
