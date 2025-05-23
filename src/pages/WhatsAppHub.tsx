import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import WhatsAppInbox from "@/components/whatsapp/WhatsAppInbox";
import ConversationView from "@/components/whatsapp/ConversationView";
import SmartActionSidebar from "@/components/whatsapp/SmartActionSidebar";
import WhatsAppMiniDashboard from "@/components/whatsapp/WhatsAppMiniDashboard";
import { 
  mockWhatsAppConversations, 
  mockConversationMessages, 
  mockWhatsAppStats 
} from "@/data/whatsapp";

export default function WhatsAppHub() {
  const [searchParams] = useSearchParams();
  const phoneParam = searchParams.get('phone');
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  // Find conversation by phone number if provided in URL
  useEffect(() => {
    if (phoneParam) {
      const foundConversation = mockWhatsAppConversations.find(c => 
        c.contact.phoneNumber.replace(/\s+/g, "").includes(phoneParam)
      );
      
      if (foundConversation) {
        setSelectedConversationId(foundConversation.id);
      }
    }
  }, [phoneParam]);
  
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
        <Header />
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-praktora-burgundy">WhatsApp Intelligence Hub</h1>
          <p className="text-sm text-gray-500">Powered by P²RA</p>
          <div className="mt-4">
            <WhatsAppMiniDashboard stats={mockWhatsAppStats} />
          </div>
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
              autoFocusInput={!!phoneParam}
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
