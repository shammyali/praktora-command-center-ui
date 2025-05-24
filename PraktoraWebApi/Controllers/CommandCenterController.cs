
using Microsoft.AspNetCore.Mvc;
using PraktoraWebApi.Models;
using PraktoraWebApi.Services;

namespace PraktoraWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommandCenterController : ControllerBase
    {
        private readonly ICommandCenterService _commandCenterService;
        private readonly ILogger<CommandCenterController> _logger;

        public CommandCenterController(ICommandCenterService commandCenterService, ILogger<CommandCenterController> logger)
        {
            _commandCenterService = commandCenterService;
            _logger = logger;
        }

        [HttpPost("search")]
        public async Task<ActionResult<ApiResponse<SearchResponse>>> SearchCustomers([FromBody] SearchParams searchParams)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    return BadRequest(ApiResponse<SearchResponse>.ErrorResult("Invalid search parameters", errors));
                }

                var result = await _commandCenterService.SearchCustomersAsync(searchParams);
                return Ok(ApiResponse<SearchResponse>.SuccessResult(result));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching customers with query: {Query}", searchParams.Query);
                return StatusCode(500, ApiResponse<SearchResponse>.ErrorResult("An error occurred while searching customers"));
            }
        }

        [HttpGet("customer/{id}")]
        public async Task<ActionResult<ApiResponse<Customer>>> GetCustomer(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest(ApiResponse<Customer>.ErrorResult("Customer ID is required"));
                }

                var customer = await _commandCenterService.GetCustomerByIdAsync(id);
                
                if (customer == null)
                {
                    return NotFound(ApiResponse<Customer>.ErrorResult("Customer not found"));
                }

                return Ok(ApiResponse<Customer>.SuccessResult(customer));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting customer with ID: {CustomerId}", id);
                return StatusCode(500, ApiResponse<Customer>.ErrorResult("An error occurred while retrieving customer"));
            }
        }

        [HttpPost("execute")]
        public async Task<ActionResult<ApiResponse<CommandResponse>>> ExecuteCommand([FromBody] CommandRequest command)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    return BadRequest(ApiResponse<CommandResponse>.ErrorResult("Invalid command", errors));
                }

                var result = await _commandCenterService.ExecuteCommandAsync(command);
                return Ok(ApiResponse<CommandResponse>.SuccessResult(result));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing command: {Command}", command.Command);
                return StatusCode(500, ApiResponse<CommandResponse>.ErrorResult("An error occurred while executing command"));
            }
        }

        [HttpGet("engagements")]
        public async Task<ActionResult<ApiResponse<List<ActiveEngagement>>>> GetActiveEngagements()
        {
            try
            {
                var engagements = await _commandCenterService.GetActiveEngagementsAsync();
                return Ok(ApiResponse<List<ActiveEngagement>>.SuccessResult(engagements));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting active engagements");
                return StatusCode(500, ApiResponse<List<ActiveEngagement>>.ErrorResult("An error occurred while retrieving engagements"));
            }
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
        }
    }
}
