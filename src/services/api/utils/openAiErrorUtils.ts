
/**
 * Maps HTTP status codes to user-friendly error messages
 */
export const getOpenAiErrorMessage = (statusCode: number): string => {
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
};
