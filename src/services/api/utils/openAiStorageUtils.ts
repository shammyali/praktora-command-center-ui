
/**
 * Manages storage operations for OpenAI API key
 */
export class OpenAIStorageManager {
  private localStorageKey: string = "p2ra_openai_api_key";
  private sessionStorageKey: string = "openai_temp_key";

  /**
   * Get the API key from storage
   */
  getApiKey(): string | null {
    // First check for a temporary session key
    const sessionKey = sessionStorage.getItem(this.sessionStorageKey);
    if (sessionKey) {
      return sessionKey;
    }
    // Fall back to stored key
    return localStorage.getItem(this.localStorageKey);
  }

  /**
   * Set the API key in local storage for permanent storage
   */
  setApiKey(apiKey: string): void {
    localStorage.setItem(this.localStorageKey, apiKey);
    // Remove any temporary key
    sessionStorage.removeItem(this.sessionStorageKey);
  }

  /**
   * Set a temporary API key in session storage
   */
  setTemporaryApiKey(apiKey: string): void {
    sessionStorage.setItem(this.sessionStorageKey, apiKey);
  }

  /**
   * Check if using a temporary key
   */
  isUsingTemporaryKey(): boolean {
    return !!sessionStorage.getItem(this.sessionStorageKey);
  }

  /**
   * Clear any stored key
   */
  clearApiKey(): void {
    localStorage.removeItem(this.localStorageKey);
    sessionStorage.removeItem(this.sessionStorageKey);
  }
}

// Export singleton instance
export const openAiStorageManager = new OpenAIStorageManager();
