
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

// Mock data for WhatsApp conversations
export const mockWhatsAppStats: WhatsAppStats = {
  totalMessagesToday: 47,
  newUnlinkedConversations: 12,
  convertedToEnquiries: 8,
  averageReplyTimeMinutes: 15,
  claimsViaWhatsApp: 3
};

export const mockWhatsAppConversations: WhatsAppConversation[] = [
  {
    id: "conv-1",
    contact: {
      name: "Ahmed Al Mansoori",
      phoneNumber: "+971 50 123 4567",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    lastMessage: {
      id: "msg-1",
      content: "Can you send me a quote for comprehensive car insurance?",
      timestamp: "2023-05-21T14:32:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 3,
    type: "New Business",
    status: "Unlinked",
    hasAttachments: true,
    hasWorkflowLinks: false,
    aiIntentClassification: "New Motor Enquiry",
    aiSuggestion: "Create New Enquiry from this chat",
    ageInDays: 0,
    assignedAgent: "Sara L."
  },
  {
    id: "conv-2",
    contact: {
      name: "Fatima Al Hashemi",
      phoneNumber: "+971 55 987 6543",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    lastMessage: {
      id: "msg-2",
      content: "I've uploaded the pictures of the accident.",
      timestamp: "2023-05-21T10:15:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 0,
    type: "Claim",
    status: "In Progress",
    hasAttachments: true,
    hasWorkflowLinks: true,
    aiIntentClassification: "Claim Documentation",
    aiSuggestion: "Add photos to claim W-2023-0458",
    ageInDays: 1,
    assignedAgent: "Mohammed R."
  },
  {
    id: "conv-3",
    contact: {
      name: "Omar Saeed",
      phoneNumber: "+971 54 234 5678",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    lastMessage: {
      id: "msg-3",
      content: "Thank you for the policy document. I've reviewed it.",
      timestamp: "2023-05-20T16:45:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 1,
    type: "Renewal",
    status: "Actioned",
    hasAttachments: false,
    hasWorkflowLinks: true,
    aiIntentClassification: "Renewal Confirmation",
    aiSuggestion: "Mark as Ready for Issuance",
    ageInDays: 2,
    assignedAgent: "Hassan Z."
  },
  {
    id: "conv-4",
    contact: {
      name: "Layla Mahmoud",
      phoneNumber: "+971 56 345 6789",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    lastMessage: {
      id: "msg-4",
      content: "Do you need any more information for my home insurance?",
      timestamp: "2023-05-19T11:20:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 0,
    type: "New Business",
    status: "In Progress",
    hasAttachments: false,
    hasWorkflowLinks: true,
    aiIntentClassification: "Property Insurance Query",
    aiSuggestion: "Request property valuation photos",
    ageInDays: 3,
    assignedAgent: "Fatima Q."
  },
  {
    id: "conv-5",
    contact: {
      name: "Khalid Al Falasi",
      phoneNumber: "+971 50 456 7890",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    lastMessage: {
      id: "msg-5",
      content: "Can I get a copy of my Emirates ID back?",
      timestamp: "2023-05-18T09:10:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 0,
    type: "Unknown",
    status: "Unlinked",
    hasAttachments: true,
    hasWorkflowLinks: false,
    aiIntentClassification: "Document Request",
    aiSuggestion: "Link to existing customer profile",
    ageInDays: 4,
    assignedAgent: "Ahmed K."
  }
];

export const mockConversationMessages: Record<string, WhatsAppMessage[]> = {
  "conv-1": [
    {
      id: "msg-c1-1",
      content: "Hello, I'm interested in getting car insurance for my new Nissan Patrol.",
      timestamp: "2023-05-21T14:30:00",
      isIncoming: true,
      type: "text"
    },
    {
      id: "msg-c1-2",
      content: "Hi Ahmed! Thank you for reaching out to PRAKTORA Insurance Brokers. I'd be happy to help you with comprehensive car insurance for your Nissan Patrol. Could you please share your Emirates ID and vehicle registration card?",
      timestamp: "2023-05-21T14:31:00",
      isIncoming: false,
      type: "text",
      status: "read"
    },
    {
      id: "msg-c1-3",
      content: "Can you send me a quote for comprehensive car insurance?",
      timestamp: "2023-05-21T14:32:00",
      isIncoming: true,
      type: "text"
    },
    {
      id: "msg-c1-4",
      content: "Here's my Emirates ID",
      timestamp: "2023-05-21T14:33:00",
      isIncoming: true,
      type: "image",
      attachmentUrl: "https://i.pravatar.cc/300?img=1",
      attachmentType: "image/jpeg",
      attachmentName: "Emirates ID.jpg"
    },
    {
      id: "msg-c1-5",
      content: "And my car registration",
      timestamp: "2023-05-21T14:34:00",
      isIncoming: true,
      type: "image",
      attachmentUrl: "https://i.pravatar.cc/300?img=2",
      attachmentType: "image/jpeg",
      attachmentName: "Vehicle Registration.jpg"
    }
  ],
  "conv-2": [
    {
      id: "msg-c2-1",
      content: "Hello, I need to report a minor accident.",
      timestamp: "2023-05-21T10:00:00",
      isIncoming: true,
      type: "text"
    },
    {
      id: "msg-c2-2",
      content: "I'm sorry to hear about your accident, Fatima. Is everyone okay? Can you please share the police report and some photos of the damage?",
      timestamp: "2023-05-21T10:05:00",
      isIncoming: false,
      type: "text",
      status: "read"
    },
    {
      id: "msg-c2-3",
      content: "Everyone is fine, thank you. Here's the police report.",
      timestamp: "2023-05-21T10:10:00",
      isIncoming: true,
      type: "document",
      attachmentUrl: "#",
      attachmentType: "application/pdf",
      attachmentName: "Police Report.pdf"
    },
    {
      id: "msg-c2-4",
      content: "I've uploaded the pictures of the accident.",
      timestamp: "2023-05-21T10:15:00",
      isIncoming: true,
      type: "text"
    }
  ],
  // Add messages for other conversations as needed
};
