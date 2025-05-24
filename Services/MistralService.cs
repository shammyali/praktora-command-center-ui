
using Microsoft.Extensions.Logging;
using P2RA.Models.Command;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace P2RA.Services
{
    public class MistralService : IMistralService
    {
        private readonly ILogger<MistralService> _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _baseUrl = "https://api.mistral.ai/v1/chat/completions";
        private readonly string _defaultModel = "mistral-large-latest"; // Using latest model, adjust as needed

        public MistralService(ILogger<MistralService> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
        }

        public string GetApiKey()
        {
            // First check session storage (temporary key)
            var tempKey = Environment.GetEnvironmentVariable("MISTRAL_TEMP_KEY");
            if (!string.IsNullOrEmpty(tempKey))
            {
                return tempKey;
            }

            // Then check persistent storage
            return Environment.GetEnvironmentVariable("MISTRAL_API_KEY");
        }

        public void SetApiKey(string apiKey)
        {
            if (string.IsNullOrEmpty(apiKey))
                return;

            // Store in environment variable for development
            // In production, this should use a more secure storage mechanism
            Environment.SetEnvironmentVariable("MISTRAL_API_KEY", apiKey);
        }

        public bool IsUsingTemporaryKey()
        {
            return !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("MISTRAL_TEMP_KEY"));
        }

        public void ClearApiKey()
        {
            Environment.SetEnvironmentVariable("MISTRAL_API_KEY", null);
            Environment.SetEnvironmentVariable("MISTRAL_TEMP_KEY", null);
        }

        public async Task<string> SendCommandAsync(string command, List<MessageModel> contextHistory = null)
        {
            var apiKey = GetApiKey();
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("API key not found");
            }

            try
            {
                var messages = new List<object>
                {
                    new
                    {
                        role = "system",
                        content = "You are P²RA, an advanced insurance assistant with expertise in policy analysis, risk assessment, and claim processing. Provide accurate, concise, and professional responses to insurance-related queries."
                    }
                };

                // Add context history
                if (contextHistory != null)
                {
                    foreach (var msg in contextHistory)
                    {
                        messages.Add(new
                        {
                            role = msg.Role,
                            content = msg.Content
                        });
                    }
                }

                // Add the current command
                messages.Add(new
                {
                    role = "user",
                    content = command
                });

                var requestData = new
                {
                    model = _defaultModel,
                    messages,
                    temperature = 0.7,
                    max_tokens = 800
                };

                return await MakeApiRequestAsync(requestData, apiKey);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling Mistral API");
                throw;
            }
        }

        public async Task<string> SendCommandWithDocumentsAsync(string command, List<MessageModel> contextHistory, string documentContent)
        {
            var apiKey = GetApiKey();
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("API key not found");
            }

            try
            {
                var messages = new List<object>
                {
                    new
                    {
                        role = "system",
                        content = "You are P²RA, an advanced insurance assistant with expertise in policy analysis, risk assessment, and claim processing. You'll be analyzing documents and responding to queries based on their content."
                    }
                };

                // Add document content
                if (!string.IsNullOrEmpty(documentContent))
                {
                    messages.Add(new
                    {
                        role = "user",
                        content = $"Here are the documents to analyze:\n\n{documentContent}"
                    });

                    messages.Add(new
                    {
                        role = "assistant",
                        content = "I've received the documents and will analyze them for your query."
                    });
                }

                // Add context history
                if (contextHistory != null)
                {
                    foreach (var msg in contextHistory)
                    {
                        messages.Add(new
                        {
                            role = msg.Role,
                            content = msg.Content
                        });
                    }
                }

                // Add the current command
                messages.Add(new
                {
                    role = "user",
                    content = command
                });

                var requestData = new
                {
                    model = _defaultModel,
                    messages,
                    temperature = 0.5,
                    max_tokens = 1500
                };

                return await MakeApiRequestAsync(requestData, apiKey);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling Mistral API with documents");
                throw;
            }
        }

        private async Task<string> MakeApiRequestAsync(object requestBody, string apiKey)
        {
            var httpClient = _httpClientFactory.CreateClient();
            
            var request = new HttpRequestMessage(HttpMethod.Post, _baseUrl)
            {
                Content = new StringContent(
                    JsonSerializer.Serialize(requestBody),
                    Encoding.UTF8,
                    "application/json"
                )
            };

            request.Headers.Add("Authorization", $"Bearer {apiKey}");

            var response = await httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Mistral API Error: {response.StatusCode}\n{errorContent}");
                throw new HttpRequestException($"Mistral API Error: {response.StatusCode}");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            using var responseDoc = JsonDocument.Parse(jsonResponse);

            // Extract the content from the response
            var content = responseDoc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return content;
        }
    }
}
