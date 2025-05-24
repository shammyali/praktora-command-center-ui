
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using P2RA.Models.Command;
using P2RA.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P2RA.Controllers
{
    public class CommandCenterController : Controller
    {
        private readonly ILogger<CommandCenterController> _logger;
        private readonly IOpenAiService _openAiService;
        private readonly IMistralService _mistralService;

        public CommandCenterController(
            ILogger<CommandCenterController> logger,
            IOpenAiService openAiService,
            IMistralService mistralService)
        {
            _logger = logger;
            _openAiService = openAiService;
            _mistralService = mistralService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ExecuteCommand(string command, string apiProvider, [FromBody] List<DocumentAttachment> attachments = null)
        {
            try
            {
                if (string.IsNullOrEmpty(command))
                {
                    return BadRequest("Command cannot be empty");
                }

                string response;
                
                // Get messages from session if available
                var messages = HttpContext.Session.Get<List<MessageModel>>("Messages") ?? new List<MessageModel>();
                
                // Add user message
                var userMessage = new MessageModel
                {
                    Role = "user",
                    Content = command,
                    Attachments = attachments
                };
                messages.Add(userMessage);

                // Execute command based on selected provider
                if (apiProvider.ToLower() == "openai")
                {
                    response = await _openAiService.SendCommandAsync(command, messages);
                }
                else if (apiProvider.ToLower() == "mistral")
                {
                    response = await _mistralService.SendCommandAsync(command, messages);
                }
                else
                {
                    // Default to Mistral if provider is not specified or invalid
                    response = await _mistralService.SendCommandAsync(command, messages);
                }
                
                // Add assistant response to messages
                var assistantMessage = new MessageModel
                {
                    Role = "assistant",
                    Content = response
                };
                messages.Add(assistantMessage);
                
                // Save messages to session
                HttpContext.Session.Set("Messages", messages);
                
                return Json(new { messages, response });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing command");
                return StatusCode(500, "Error processing the command");
            }
        }

        [HttpPost]
        public IActionResult SaveApiKey(string apiKey, string provider)
        {
            try
            {
                if (string.IsNullOrEmpty(apiKey))
                {
                    return BadRequest("API key cannot be empty");
                }

                if (provider.ToLower() == "openai")
                {
                    _openAiService.SetApiKey(apiKey);
                }
                else if (provider.ToLower() == "mistral")
                {
                    _mistralService.SetApiKey(apiKey);
                }
                
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving API key");
                return StatusCode(500, "Error saving API key");
            }
        }
    }
}
