
using System.ComponentModel.DataAnnotations;

namespace PraktoraWebApi.Models
{
    public class Customer
    {
        public string Id { get; set; } = string.Empty;
        
        [Required]
        public string Code { get; set; } = string.Empty;
        
        [Required]
        public string FullName { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Mobile { get; set; } = string.Empty;
        
        public string? Nationality { get; set; }
        public string? EmiratesId { get; set; }
        public string? PassportNo { get; set; }
        public string? Dob { get; set; }
        
        [Required]
        public CustomerType Type { get; set; }
        
        public bool IsVip { get; set; }
        public string? AssignedAgent { get; set; }
        public string? Source { get; set; }
        public string? Category { get; set; }
        
        [Required]
        public CustomerStatus Status { get; set; }
        
        public string? ProfileImage { get; set; }
        
        [Required]
        public KycStatus KycCompletionStatus { get; set; }
        
        [Range(0, 100)]
        public int KycCompletionPercentage { get; set; }
    }

    public enum CustomerType
    {
        Individual,
        Company
    }

    public enum CustomerStatus
    {
        Active,
        Inactive,
        Dormant,
        Suspended
    }

    public enum KycStatus
    {
        Completed,
        Incomplete,
        Expiring
    }
}
