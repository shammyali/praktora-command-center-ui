
using System.ComponentModel.DataAnnotations;

namespace PraktoraWebApi.Models
{
    public class SearchParams
    {
        [Required]
        public string Query { get; set; } = string.Empty;
        
        [Required]
        public SearchType SearchType { get; set; }
        
        [Range(1, int.MaxValue)]
        public int Page { get; set; } = 1;
        
        [Range(1, 100)]
        public int Limit { get; set; } = 10;
    }

    public enum SearchType
    {
        Name,
        Email,
        Mobile,
        Code,
        EmiratesId,
        PassportNo
    }
}
