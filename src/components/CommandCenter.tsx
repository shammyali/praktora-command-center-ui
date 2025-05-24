
import SidePanel from "./command-center/SidePanel";
import CommandCenterContent from "./command-center/CommandCenterContent";
import ApiKeyModal from "./command-center/ApiKeyModal";
import { useCommandCenter } from "./command-center/useCommandCenter";

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
    <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="flex flex-col h-full">
        {/* Right Panel for Instant Commands and Active Engagements */}
        <SidePanel activeEngagements={activeEngagements} />
        
        {/* Main Content Area */}
        <div className="fixed left-60 right-80 bottom-0 top-16 overflow-hidden">
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
        
        {/* API Key Modal */}
        <ApiKeyModal
          open={showApiKeyModal}
          onOpenChange={setShowApiKeyModal}
          onSave={saveApiKey}
        />
      </div>
    </div>
  );
};

export default CommandCenter;
