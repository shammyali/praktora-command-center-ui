
namespace PraktoraWebApi.Models
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }

        public static ApiResponse<T> SuccessResult(T data, string? message = null)
        {
            return new ApiResponse<T>
            {
                Success = true,
                Data = data,
                Message = message
            };
        }

        public static ApiResponse<T> ErrorResult(string message, List<string>? errors = null)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                Errors = errors
            };
        }
    }

    public class SearchResponse
    {
        public List<Customer> Customers { get; set; } = new();
        public int Total { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
        public bool HasMore { get; set; }
    }

    public class CommandRequest
    {
        [Required]
        public string Command { get; set; } = string.Empty;
        public Dictionary<string, object>? Parameters { get; set; }
    }

    public class CommandResponse
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Status { get; set; } = "Processing";
        public string? Result { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
