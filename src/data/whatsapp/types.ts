
export type ConversationType = 'New Business' | 'Claim' | 'Renewal' | 'Unknown';
export type ConversationStatus = 'Unlinked' | 'In Progress' | 'Actioned' | 'Resolved';
export type MessageType = 'text' | 'image' | 'document' | 'template' | 'location';

export interface WhatsAppMessage {
  id: string;
  content: string;
  timestamp: string;
  isIncoming: boolean;
  type: MessageType;
  status?: 'sent' | 'delivered' | 'read';
  attachmentUrl?: string;
  attachmentType?: string;
  attachmentName?: string;
}

export interface WhatsAppConversation {
  id: string;
  contact: {
    name: string;
    phoneNumber: string;
    avatar?: string;
  };
  lastMessage: WhatsAppMessage;
  unreadCount: number;
  type: ConversationType;
  status: ConversationStatus;
  hasAttachments: boolean;
  hasWorkflowLinks: boolean;
  aiIntentClassification?: string;
  aiSuggestion?: string;
  ageInDays: number;
  assignedAgent?: string;
}

export interface WhatsAppStats {
  totalMessagesToday: number;
  newUnlinkedConversations: number;
  convertedToEnquiries: number;
  averageReplyTimeMinutes: number;
  claimsViaWhatsApp: number;
}
