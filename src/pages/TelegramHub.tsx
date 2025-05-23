
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import TelegramMiniDashboard from "@/components/telegram/TelegramMiniDashboard";
import TelegramInbox from "@/components/telegram/TelegramInbox";
import TelegramChatView from "@/components/telegram/TelegramChatView";
import TelegramActionPanel from "@/components/telegram/TelegramActionPanel";
import TelegramHeader from "@/components/telegram/TelegramHeader";
import TelegramSearchBar from "@/components/telegram/TelegramSearchBar";
import TelegramLayout from "@/components/telegram/TelegramLayout";
import { useTelegramHub } from "@/hooks/useTelegramHub";
import { mockTelegramStats } from "@/data/telegramData";

export default function TelegramHub() {
  const {
    chats,
    selectedChatId,
    showActionPanel,
    searchQuery,
    filterSource,
    filterType,
    activeMode,
    selectedChat,
    messages,
    setShowActionPanel,
    setSearchQuery,
    setFilterSource,
    setFilterType,
    setActiveMode,
    handleSelectChat,
    handleMarkActioned,
    handleSetInProgress
  } = useTelegramHub();

  return (
    <Layout title="Telegram Intelligence Hub" subtitle="Structured Insurance Conversations">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-praktora-burgundy">Telegram Intelligence Hub</h1>
        <p className="text-sm text-gray-500">Structured Insurance Conversations, Unified AI Command</p>
        <div className="mt-4">
          <TelegramMiniDashboard stats={mockTelegramStats} />
        </div>
      </div>
      
      <TelegramLayout
        header={
          <>
            <TelegramHeader
              activeMode={activeMode}
              showActionPanel={showActionPanel}
              onModeChange={setActiveMode}
              onToggleActionPanel={() => setShowActionPanel(!showActionPanel)}
            />
            
            <TelegramSearchBar
              searchQuery={searchQuery}
              filterSource={filterSource}
              filterType={filterType}
              onSearchChange={setSearchQuery}
              onFilterSourceChange={setFilterSource}
              onFilterTypeChange={setFilterType}
            />
          </>
        }
        inboxComponent={
          <TelegramInbox
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
            searchQuery={searchQuery}
            filterSource={filterSource}
            filterType={filterType}
          />
        }
        chatComponent={
          <TelegramChatView
            chat={selectedChat}
            messages={messages}
          />
        }
        actionPanel={
          <TelegramActionPanel
            chat={selectedChat}
            onMarkActioned={handleMarkActioned}
            onSetInProgress={handleSetInProgress}
          />
        }
        showActionPanel={showActionPanel}
      />
    </Layout>
  );
}
