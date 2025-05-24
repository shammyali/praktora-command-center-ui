
using Microsoft.AspNetCore.Http;
using P2RA.Models.Documents;
using System;
using System.IO;
using System.Threading.Tasks;

namespace P2RA.Services
{
    public class DocumentService : IDocumentService
    {
        public string GetFileSize(long sizeInBytes)
        {
            if (sizeInBytes < 1024)
                return $"{sizeInBytes} B";
            
            if (sizeInBytes < 1024 * 1024)
                return $"{(sizeInBytes / 1024.0).ToString("0.0")} KB";
            
            return $"{(sizeInBytes / (1024.0 * 1024.0)).ToString("0.0")} MB";
        }

        public async Task<UploadedDocumentModel> ProcessFileAsync(IFormFile file)
        {
            var docId = Guid.NewGuid().ToString();
            var content = await ReadFileContentAsync(file);

            return new UploadedDocumentModel
            {
                Id = docId,
                Name = file.FileName,
                Size = GetFileSize(file.Length),
                Type = file.ContentType,
                Content = content
            };
        }

        public async Task<string> ReadFileContentAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return string.Empty;

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0;

            // For text files
            if (file.ContentType.StartsWith("text/") || file.ContentType == "application/json")
            {
                using var reader = new StreamReader(memoryStream);
                return await reader.ReadToEndAsync();
            }
            // For binary files, convert to base64
            else
            {
                byte[] bytes = memoryStream.ToArray();
                return Convert.ToBase64String(bytes);
            }
        }

        public async Task<string> GetFilePreviewAsync(IFormFile file)
        {
            // For images, just return the path that will be used later
            if (file.ContentType.StartsWith("image/"))
            {
                // In a real app, we would save the image and return a URL
                // For now, we'll just return a placeholder
                return "/placeholders/image-preview.png";
            }

            // Return appropriate icon based on file type
            return GetDocumentTypeIcon(file.ContentType);
        }

        public string GetDocumentTypeIcon(string fileType)
        {
            // Return path to icon based on file type
            if (fileType == "application/pdf")
            {
                return "/img/icons/pdf-icon.png";
            }
            if (fileType.Contains("word") || fileType.Contains("officedocument.wordprocessing"))
            {
                return "/img/icons/word-icon.png";
            }
            if (fileType.Contains("excel") || fileType.Contains("officedocument.spreadsheet"))
            {
                return "/img/icons/excel-icon.png";
            }
            if (fileType.Match("text/") || fileType == "application/json" || fileType == "application/xml")
            {
                return "/img/icons/text-icon.png";
            }

            // Default file icon
            return "/img/icons/file-icon.png";
        }
    }
}
