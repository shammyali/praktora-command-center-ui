
using Microsoft.AspNetCore.Http;
using P2RA.Models.Documents;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P2RA.Services
{
    public interface IDocumentService
    {
        Task<UploadedDocumentModel> ProcessFileAsync(IFormFile file);
        string GetFileSize(long sizeInBytes);
        Task<string> ReadFileContentAsync(IFormFile file);
        Task<string> GetFilePreviewAsync(IFormFile file);
        string GetDocumentTypeIcon(string fileType);
    }
}
