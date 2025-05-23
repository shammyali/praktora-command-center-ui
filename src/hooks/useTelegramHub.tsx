
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  mockTelegramChats, 
  mockTelegramMessages, 
  TelegramChat,
  TelegramSourceType,
  TelegramChatType 
} from "@/data/telegram";

export function useTelegramHub() {
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

  return {
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
  };
}
