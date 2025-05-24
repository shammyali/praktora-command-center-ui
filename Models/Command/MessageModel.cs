
using System.Collections.Generic;

namespace P2RA.Models.Command
{
    public class MessageModel
    {
        public string Role { get; set; }
        public string Content { get; set; }
        public List<DocumentAttachment> Attachments { get; set; }
    }

    public class DocumentAttachment
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
