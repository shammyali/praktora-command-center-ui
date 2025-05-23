
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  WhatsAppConversation, 
  ConversationType, 
  ConversationStatus 
} from "@/data/whatsapp/types";

import ConversationFilters from "./inbox/ConversationFilters";
import ConversationList from "./inbox/ConversationList";

interface WhatsAppInboxProps {
  conversations: WhatsAppConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function WhatsAppInbox({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: WhatsAppInboxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ConversationType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ConversationStatus | "All">("All");

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.contact.phoneNumber.includes(searchQuery);
    
    const matchesType = typeFilter === "All" || conversation.type === typeFilter;
    const matchesStatus = statusFilter === "All" || conversation.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full">
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
    </div>
  );
}
