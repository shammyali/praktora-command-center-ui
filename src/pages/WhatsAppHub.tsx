
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
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { WhatsAppMessage, WhatsAppConversation } from "@/data/whatsapp/types";
import { praktoraWebApi } from "@/services/api/praktoraWebApi";

export default function WhatsAppHub() {
  const [searchParams] = useSearchParams();
  const phoneParam = searchParams.get('phone');
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [localConversations, setLocalConversations] = useState(mockWhatsAppConversations);
  const [localMessages, setLocalMessages] = useState({...mockConversationMessages});
  
  // Find conversation by phone number if provided in URL
  useEffect(() => {
    if (phoneParam) {
      const foundConversation = localConversations.find(c => 
        c.contact.phoneNumber.replace(/\s+/g, "").includes(phoneParam)
      );
      
      if (foundConversation) {
        setSelectedConversationId(foundConversation.id);
      }
    }
  }, [phoneParam, localConversations]);
  
  const selectedConversation = selectedConversationId 
    ? localConversations.find(c => c.id === selectedConversationId) 
    : null;
  
  const messages = selectedConversationId 
    ? localMessages[selectedConversationId] || []
    : [];
  
  // Start a new chat with a phone number
  const handleStartNewChat = async (phoneNumber: string, name?: string) => {
    // Generate a new conversation ID
    const newConversationId = uuidv4();
    
    // Create a welcome message
    const welcomeMessage: WhatsAppMessage = {
      id: uuidv4(),
      content: "Hello! How can I help you today?",
      timestamp: new Date().toISOString(),
      isIncoming: false,
      type: "text",
      status: "sent"
    };
    
    // Create new conversation
    const newConversation: WhatsAppConversation = {
      id: newConversationId,
      contact: {
        name: name || phoneNumber,
        phoneNumber: phoneNumber,
      },
      lastMessage: welcomeMessage,
      unreadCount: 0,
      type: "Unknown",
      status: "Unlinked",
      hasAttachments: false,
      hasWorkflowLinks: false,
      ageInDays: 0,
    };
    
    // Add new conversation to state
    setLocalConversations(prev => [newConversation, ...prev]);
    
    // Add initial message to conversation
    setLocalMessages(prev => ({
      ...prev,
      [newConversationId]: [welcomeMessage]
    }));
    
    // Select the new conversation
    setSelectedConversationId(newConversationId);
    
    toast.success(`Started new conversation with ${name || phoneNumber}`);
    
    try {
      // Call to PraktoraWeb API to initiate the WhatsApp conversation
      await praktoraWebApi.initiateWhatsAppConversation(phoneNumber, welcomeMessage.content);
      console.log(`API call made to PraktoraWeb to initiate WhatsApp chat with ${phoneNumber}`);
    } catch (error) {
      console.error('Failed to initiate WhatsApp conversation:', error);
      toast.error('Failed to initiate WhatsApp conversation. Please try again.');
    }
  };
  
  // Function to send a message in the current conversation
  const sendMessage = async (content: string) => {
    if (!selectedConversationId || !content.trim() || !selectedConversation) return;
    
    // Create new message
    const newMessage: WhatsAppMessage = {
      id: uuidv4(),
      content: content,
      timestamp: new Date().toISOString(),
      isIncoming: false,
      type: "text",
      status: "sent"
    };
    
    // Add message to conversation
    setLocalMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage]
    }));
    
    // Update last message in conversation list
    setLocalConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversationId 
          ? { ...conv, lastMessage: newMessage } 
          : conv
      )
    );
    
    try {
      // Call to PraktoraWeb API to send the WhatsApp message
      await praktoraWebApi.sendWhatsAppMessage(
        selectedConversation.contact.phoneNumber, 
        content
      );
      console.log(`API call made to PraktoraWeb to send WhatsApp message to ${selectedConversation.contact.phoneNumber}`);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-praktora-burgundy">WhatsApp Intelligence Hub</h1>
          <div className="mt-4">
            <WhatsAppMiniDashboard stats={mockWhatsAppStats} />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[320px] border-r flex flex-col overflow-hidden">
            <WhatsAppInbox 
              conversations={localConversations} 
              selectedConversationId={selectedConversationId}
              onSelectConversation={setSelectedConversationId}
              onStartNewChat={handleStartNewChat}
            />
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <ConversationView 
              conversation={selectedConversation} 
              messages={messages}
              autoFocusInput={!!phoneParam}
              onSendMessage={sendMessage}
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
