
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import WhatsAppInbox from "@/components/whatsapp/WhatsAppInbox";
import ConversationView from "@/components/whatsapp/ConversationView";
import SmartActionSidebar from "@/components/whatsapp/SmartActionSidebar";
import WhatsAppMiniDashboard from "@/components/whatsapp/WhatsAppMiniDashboard";
import { mockWhatsAppConversations, mockConversationMessages, mockWhatsAppStats } from "@/data/whatsAppData";

export default function WhatsAppHub() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const selectedConversation = selectedConversationId 
    ? mockWhatsAppConversations.find(c => c.id === selectedConversationId) 
    : null;
  
  const messages = selectedConversationId 
    ? mockConversationMessages[selectedConversationId] || []
    : [];
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="WhatsApp Intelligence Hub" subtitle="Powered by P²RA" />
        
        <div className="p-4">
          <WhatsAppMiniDashboard stats={mockWhatsAppStats} />
        </div>
        
        <Separator />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[320px] border-r flex flex-col overflow-hidden">
            <WhatsAppInbox 
              conversations={mockWhatsAppConversations} 
              selectedConversationId={selectedConversationId}
              onSelectConversation={setSelectedConversationId}
            />
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <ConversationView 
              conversation={selectedConversation} 
              messages={messages}
            />
          </div>
          
          <div className="w-[280px] border-l flex flex-col overflow-hidden">
            <SmartActionSidebar conversation={selectedConversation} />
          </div>
        </div>
      </div>
    </div>
  );
}
