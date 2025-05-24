
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using P2RA.Models.Documents;
using P2RA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P2RA.Controllers
{
    public class DocumentsController : Controller
    {
        private readonly ILogger<DocumentsController> _logger;
        private readonly IDocumentService _documentService;

        public DocumentsController(
            ILogger<DocumentsController> logger,
            IDocumentService documentService)
        {
            _logger = logger;
            _documentService = documentService;
        }

        public IActionResult Index()
        {
            // In a real app, we would fetch documents from a database
            // For now, we'll just show the upload page
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file selected");
                }

                var document = await _documentService.ProcessFileAsync(file);

                // In a real app, we would save to a database
                // For now, just return the processed document
                return Json(document);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading document");
                return StatusCode(500, "Error processing the document");
            }
        }

        [HttpPost]
        public async Task<IActionResult> UploadMultiple(List<IFormFile> files)
        {
            try
            {
                if (files == null || !files.Any())
                {
                    return BadRequest("No files selected");
                }

                var documents = new List<UploadedDocumentModel>();

                foreach (var file in files)
                {
                    var document = await _documentService.ProcessFileAsync(file);
                    documents.Add(document);
                }

                // In a real app, we would save to a database
                return Json(documents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading multiple documents");
                return StatusCode(500, "Error processing the documents");
            }
        }
    }
}
