
import SidePanel from "./command-center/SidePanel";
import CommandCenterContent from "./command-center/CommandCenterContent";
import ApiKeyModal from "./command-center/ApiKeyModal";
import { useCommandCenter } from "./command-center/useCommandCenter";
import { DocumentProvider } from "./command-center/DocumentContext";

const CommandCenter = () => {
  const {
    activeEngagements,
    command,
    messages,
    isLoading,
    characterCount,
    apiProvider,
    showApiKeyModal,
    setShowApiKeyModal,
    handleCommandChange,
    handleSuggestionClick,
    handleApiProviderChange,
    saveApiKey,
    executeCommand
  } = useCommandCenter();

  return (
    <DocumentProvider>
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <div className="flex h-screen">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <CommandCenterContent
              messages={messages}
              command={command}
              characterCount={characterCount}
              isLoading={isLoading}
              apiProvider={apiProvider}
              onCommandChange={handleCommandChange}
              onSuggestionClick={handleSuggestionClick}
              onApiProviderChange={handleApiProviderChange}
              onOpenApiKeyModal={() => setShowApiKeyModal(true)}
              executeCommand={executeCommand}
            />
          </div>
          
          {/* Right Panel for Instant Commands and Active Engagements */}
          <div className="w-80 border-l border-gray-200 bg-white">
            <SidePanel activeEngagements={activeEngagements} />
          </div>
          
          {/* API Key Modal */}
          <ApiKeyModal
            open={showApiKeyModal}
            onOpenChange={setShowApiKeyModal}
            onSave={saveApiKey}
          />
        </div>
      </div>
    </DocumentProvider>
  );
};

export default CommandCenter;
