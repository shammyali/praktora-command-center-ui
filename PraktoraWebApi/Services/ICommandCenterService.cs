
using PraktoraWebApi.Models;

namespace PraktoraWebApi.Services
{
    public interface ICommandCenterService
    {
        Task<SearchResponse> SearchCustomersAsync(SearchParams searchParams);
        Task<Customer?> GetCustomerByIdAsync(string id);
        Task<CommandResponse> ExecuteCommandAsync(CommandRequest command);
        Task<List<ActiveEngagement>> GetActiveEngagementsAsync();
    }

    public class ActiveEngagement
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string StatusColor { get; set; } = "blue";
        public bool Animate { get; set; }
        public string KycStatus { get; set; } = "YES";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
