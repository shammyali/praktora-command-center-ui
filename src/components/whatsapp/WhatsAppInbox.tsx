import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  WhatsAppConversation, 
  ConversationType, 
  ConversationStatus 
} from "@/data/whatsapp/types";

import ConversationFilters from "./inbox/ConversationFilters";
import ConversationList from "./inbox/ConversationList";
import NewChatButton from "./inbox/NewChatButton";
import NewChatModal from "./inbox/NewChatModal";
import { toast } from "sonner";

interface WhatsAppInboxProps {
  conversations: WhatsAppConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onStartNewChat?: (phoneNumber: string, name?: string) => void;
}

export default function WhatsAppInbox({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onStartNewChat
}: WhatsAppInboxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ConversationType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ConversationStatus | "All">("All");
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.contact.phoneNumber.includes(searchQuery);
    
    const matchesType = typeFilter === "All" || conversation.type === typeFilter;
    const matchesStatus = statusFilter === "All" || conversation.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleStartNewChat = (phoneNumber: string, name?: string) => {
    // First check if we have the callback function
    if (!onStartNewChat) {
      toast.error("New chat functionality is not available");
      return;
    }
    
    // Check if this number already exists in conversations
    const existingConversation = conversations.find(conv => 
      conv.contact.phoneNumber.replace(/\s+/g, "").includes(phoneNumber.replace(/\s+/g, ""))
    );
    
    if (existingConversation) {
      // If conversation exists, select it instead of creating a new one
      onSelectConversation(existingConversation.id);
      toast.info("Switched to existing conversation");
    } else {
      // Otherwise start a new chat
      onStartNewChat(phoneNumber, name);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <NewChatButton onClick={() => setNewChatModalOpen(true)} />
      </div>
      
      <ConversationFilters
        searchQuery={searchQuery}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onTypeFilterChange={setTypeFilter}
        onStatusFilterChange={setStatusFilter}
      />
      
      <Separator />
      
      <ConversationList
        conversations={filteredConversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={onSelectConversation}
      />
      
      <NewChatModal 
        open={newChatModalOpen} 
        onOpenChange={setNewChatModalOpen}
        onStartNewChat={handleStartNewChat}
        existingConversations={conversations}
      />
    </div>
  );
}
