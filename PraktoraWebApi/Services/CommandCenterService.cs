
using PraktoraWebApi.Models;

namespace PraktoraWebApi.Services
{
    public class CommandCenterService : ICommandCenterService
    {
        private readonly List<Customer> _mockCustomers;
        private readonly List<ActiveEngagement> _mockEngagements;

        public CommandCenterService()
        {
            _mockCustomers = GetMockCustomers();
            _mockEngagements = GetMockEngagements();
        }

        public async Task<SearchResponse> SearchCustomersAsync(SearchParams searchParams)
        {
            // Simulate API delay
            await Task.Delay(500);

            var filteredCustomers = _mockCustomers.Where(customer =>
            {
                var query = searchParams.Query.ToLower();
                
                return searchParams.SearchType switch
                {
                    SearchType.Name => customer.FullName.ToLower().Contains(query),
                    SearchType.Email => customer.Email.ToLower().Contains(query),
                    SearchType.Mobile => customer.Mobile.ToLower().Contains(query),
                    SearchType.Code => customer.Code.ToLower().Contains(query),
                    SearchType.EmiratesId => customer.EmiratesId?.ToLower().Contains(query) ?? false,
                    SearchType.PassportNo => customer.PassportNo?.ToLower().Contains(query) ?? false,
                    _ => false
                };
            }).ToList();

            // Calculate pagination
            var start = (searchParams.Page - 1) * searchParams.Limit;
            var paginatedCustomers = filteredCustomers.Skip(start).Take(searchParams.Limit).ToList();

            return new SearchResponse
            {
                Customers = paginatedCustomers,
                Total = filteredCustomers.Count,
                Page = searchParams.Page,
                Limit = searchParams.Limit,
                HasMore = start + searchParams.Limit < filteredCustomers.Count
            };
        }

        public async Task<Customer?> GetCustomerByIdAsync(string id)
        {
            await Task.Delay(300);
            return _mockCustomers.FirstOrDefault(c => c.Id == id);
        }

        public async Task<CommandResponse> ExecuteCommandAsync(CommandRequest command)
        {
            await Task.Delay(1000); // Simulate processing time

            return new CommandResponse
            {
                Status = "Completed",
                Result = $"Command '{command.Command}' executed successfully"
            };
        }

        public async Task<List<ActiveEngagement>> GetActiveEngagementsAsync()
        {
            await Task.Delay(200);
            return _mockEngagements;
        }

        private List<Customer> GetMockCustomers()
        {
            return new List<Customer>
            {
                new Customer
                {
                    Id = "1",
                    Code = "CS181",
                    FullName = "Ahmed Al Maktoum",
                    Email = "ahmed@titangroup.ae",
                    Mobile = "+971 50 123 4567",
                    Nationality = "UAE",
                    EmiratesId = "784-1234-5678901-2",
                    PassportNo = "P12345678",
                    Dob = "1978-05-15",
                    Type = CustomerType.Individual,
                    IsVip = true,
                    AssignedAgent = "Sarah Johnson",
                    Source = "Agent",
                    Category = "TITAN GROUP",
                    Status = CustomerStatus.Active,
                    ProfileImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
                    KycCompletionStatus = KycStatus.Completed,
                    KycCompletionPercentage = 100
                },
                new Customer
                {
                    Id = "2",
                    Code = "CS182",
                    FullName = "Mohammed Al Maktoum",
                    Email = "mohammed@titangroup.ae",
                    Mobile = "+971 50 987 6543",
                    Nationality = "UAE",
                    EmiratesId = "784-9876-5432109-8",
                    PassportNo = "P87654321",
                    Type = CustomerType.Individual,
                    IsVip = false,
                    Status = CustomerStatus.Active,
                    KycCompletionStatus = KycStatus.Incomplete,
                    KycCompletionPercentage = 65
                },
                new Customer
                {
                    Id = "3",
                    Code = "CS183",
                    FullName = "Fatima Al Qasimi",
                    Email = "fatima@alqasimi.ae",
                    Mobile = "+971 55 456 7890",
                    Nationality = "UAE",
                    Type = CustomerType.Individual,
                    IsVip = false,
                    Status = CustomerStatus.Active,
                    KycCompletionStatus = KycStatus.Expiring,
                    KycCompletionPercentage = 90
                },
                new Customer
                {
                    Id = "4",
                    Code = "CS184",
                    FullName = "TITAN GROUP LLC",
                    Email = "info@titangroup.ae",
                    Mobile = "+971 4 123 4567",
                    Type = CustomerType.Company,
                    IsVip = true,
                    Status = CustomerStatus.Active,
                    KycCompletionStatus = KycStatus.Completed,
                    KycCompletionPercentage = 100
                }
            };
        }

        private List<ActiveEngagement> GetMockEngagements()
        {
            return new List<ActiveEngagement>
            {
                new ActiveEngagement
                {
                    Title = "Workmen's Compensation Renewal -",
                    CustomerName = "Tom Robers",
                    Description = "Comprehensive coverage renewal assessment required",
                    Status = "Awaiting Confirmation",
                    StatusColor = "yellow",
                    Animate = true,
                    KycStatus = "NO"
                },
                new ActiveEngagement
                {
                    Title = "New Motor Quote -",
                    CustomerName = "Abdullah Ali",
                    Description = "Comprehensive coverage proposal ready for review",
                    Status = "Quoted",
                    StatusColor = "yellow",
                    Animate = false,
                    KycStatus = "YES"
                },
                new ActiveEngagement
                {
                    Title = "Medical Claim -",
                    CustomerName = "Vijay Singh",
                    Description = "Claim assessment completed and approved",
                    Status = "Claim Settled",
                    StatusColor = "green",
                    Animate = false,
                    KycStatus = "PEP"
                },
                new ActiveEngagement
                {
                    Title = "Risk Assessment",
                    CustomerName = "Mohan Lal",
                    Description = "Complete risk profile for healthcare client",
                    Status = "In Progress",
                    StatusColor = "blue",
                    Animate = false,
                    KycStatus = "Request"
                }
            };
        }
    }
}
