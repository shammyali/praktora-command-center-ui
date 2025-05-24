
using P2RA.Models.Command;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P2RA.Services
{
    public interface IOpenAiService
    {
        string GetApiKey();
        void SetApiKey(string apiKey);
        bool IsUsingTemporaryKey();
        void ClearApiKey();
        Task<string> SendCommandAsync(string command, List<MessageModel> contextHistory = null);
        Task<string> SendCommandWithDocumentsAsync(string command, List<MessageModel> contextHistory, string documentContent);
    }
}
