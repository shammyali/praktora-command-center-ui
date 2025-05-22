
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  SearchIcon, 
  FilterIcon, 
  PanelLeft, 
  PanelRight,
  SparklesIcon,
  Bot,
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TelegramMiniDashboard from "@/components/telegram/TelegramMiniDashboard";
import TelegramInbox from "@/components/telegram/TelegramInbox";
import TelegramChatView from "@/components/telegram/TelegramChatView";
import TelegramActionPanel from "@/components/telegram/TelegramActionPanel";
import { 
  mockTelegramChats, 
  mockTelegramMessages, 
  mockTelegramStats,
  TelegramChat,
  TelegramSourceType,
  TelegramChatType 
} from "@/data/telegramData";

export default function TelegramHub() {
  const [chats, setChats] = useState<TelegramChat[]>(mockTelegramChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showActionPanel, setShowActionPanel] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState<TelegramSourceType | "All">("All");
  const [filterType, setFilterType] = useState<TelegramChatType | "All">("All");
  const [activeMode, setActiveMode] = useState<"Standard" | "Bot">("Standard");
  const { toast } = useToast();

  // Initialize with the first chat selected
  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  const selectedChat = selectedChatId 
    ? chats.find(chat => chat.id === selectedChatId) 
    : null;
  
  const messages = selectedChatId 
    ? mockTelegramMessages[selectedChatId] || []
    : [];

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    
    // Mark as read logic would go here in a real app
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId && chat.unreadCount > 0
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
  };
  
  const handleMarkActioned = () => {
    if (!selectedChatId) return;
    
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChatId
          ? { ...chat, status: "Actioned" }
          : chat
      )
    );
    
    toast({
      title: "Chat marked as actioned",
      description: "The conversation has been marked as actioned",
    });
  };
  
  const handleSetInProgress = () => {
    if (!selectedChatId) return;
    
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChatId
          ? { ...chat, status: "In Progress" }
          : chat
      )
    );
    
    toast({
      title: "Status updated",
      description: "Conversation marked as in progress",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-praktora-burgundy">Telegram Intelligence Hub</h1>
          <p className="text-sm text-gray-500">Structured Insurance Conversations, Unified AI Command</p>
          <div className="mt-4">
            <TelegramMiniDashboard stats={mockTelegramStats} />
          </div>
        </div>
        
        <div className="px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as "Standard" | "Bot")}>
              <TabsList>
                <TabsTrigger value="Standard" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Standard Chat Mode
                </TabsTrigger>
                <TabsTrigger value="Bot" className="flex items-center gap-1">
                  <Bot className="h-4 w-4" />
                  Bot Intelligence Mode
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowActionPanel(!showActionPanel)}>
              <PanelRight className="h-4 w-4 mr-1" /> {showActionPanel ? "Hide" : "Show"} Actions
            </Button>
            <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/80">
              <SparklesIcon className="h-4 w-4 mr-1" /> Auto-Process
            </Button>
          </div>
        </div>
        
        <div className="px-4 py-2 flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              className="bg-background border rounded-md px-3 py-2 text-sm"
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value as TelegramSourceType | "All")}
            >
              <option value="All">All Sources</option>
              <option value="Bot">Bot Only</option>
              <option value="Human">Human Only</option>
            </select>
            
            <select 
              className="bg-background border rounded-md px-3 py-2 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TelegramChatType | "All")}
            >
              <option value="All">All Types</option>
              <option value="New Business">New Business</option>
              <option value="FNOL">FNOL</option>
              <option value="Complaint">Complaint</option>
              <option value="Renewal">Renewal</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
        </div>
        
        <Separator className="mt-2" />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[320px] border-r flex flex-col overflow-hidden">
            <TelegramInbox 
              chats={chats}
              selectedChatId={selectedChatId}
              onSelectChat={handleSelectChat}
              searchQuery={searchQuery}
              filterSource={filterSource}
              filterType={filterType}
            />
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <TelegramChatView 
              chat={selectedChat} 
              messages={messages}
            />
          </div>
          
          {showActionPanel && (
            <div className="w-[280px] border-l flex flex-col overflow-hidden">
              <TelegramActionPanel 
                chat={selectedChat}
                onMarkActioned={handleMarkActioned}
                onSetInProgress={handleSetInProgress}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
