
export type TelegramChatType = 'New Business' | 'FNOL' | 'Complaint' | 'Renewal' | 'Unknown';
export type TelegramChatStatus = 'Unlinked' | 'In Progress' | 'Actioned';
export type TelegramMessageType = 'text' | 'image' | 'document' | 'command' | 'button' | 'form';
export type TelegramSourceType = 'Bot' | 'Human';

export interface TelegramMessage {
  id: string;
  content: string;
  timestamp: string;
  isIncoming: boolean;
  type: TelegramMessageType;
  source?: TelegramSourceType;
  attachmentUrl?: string;
  attachmentType?: string;
  attachmentName?: string;
  buttonSelection?: string;
  commandUsed?: string;
  formData?: Record<string, any>;
}

export interface TelegramChat {
  id: string;
  contact: {
    name: string;
    username: string;
    avatar?: string;
  };
  lastMessage: TelegramMessage;
  unreadCount: number;
  type: TelegramChatType;
  status: TelegramChatStatus;
  source: TelegramSourceType;
  hasAttachments: boolean;
  hasWorkflowLinks: boolean;
  aiIntentClassification?: string;
  aiSuggestion?: string;
  ageInMinutes: number;
  assignedAgent?: string;
  dataQualityScore?: number;
}

export interface TelegramStats {
  totalConversationsToday: number;
  structuredQuoteRequests: number;
  unlinkedThreads: number;
  fnolSubmissions: number;
  avgBotResponseTime: string;
}

// Mock data for Telegram conversations
export const mockTelegramStats: TelegramStats = {
  totalConversationsToday: 19,
  structuredQuoteRequests: 6,
  unlinkedThreads: 8,
  fnolSubmissions: 2,
  avgBotResponseTime: "4m 12s"
};

export const mockTelegramChats: TelegramChat[] = [
  {
    id: "tg-1",
    contact: {
      name: "Fatima Al Marzooqi",
      username: "@fatima_agent",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    lastMessage: {
      id: "tgmsg-1",
      content: "Need AXA quote for Mazda CX-5",
      timestamp: "2023-05-22T12:31:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 3,
    type: "New Business",
    status: "Unlinked",
    source: "Human",
    hasAttachments: true,
    hasWorkflowLinks: false,
    aiIntentClassification: "Motor Quote Request",
    aiSuggestion: "Create New Enquiry",
    ageInMinutes: 15,
    assignedAgent: "Khalid M."
  },
  {
    id: "tg-2",
    contact: {
      name: "InsuranceBot",
      username: "@praktora_insurance_bot",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    lastMessage: {
      id: "tgmsg-2",
      content: "User completed Motor Insurance form",
      timestamp: "2023-05-22T11:45:00",
      isIncoming: true,
      type: "form",
    },
    unreadCount: 1,
    type: "New Business",
    status: "Unlinked",
    source: "Bot",
    hasAttachments: false,
    hasWorkflowLinks: false,
    aiIntentClassification: "Structured Quote Request",
    aiSuggestion: "Import Data to New Enquiry",
    ageInMinutes: 61,
    assignedAgent: "",
    dataQualityScore: 83
  },
  {
    id: "tg-3",
    contact: {
      name: "Mohammed Al Hashemi",
      username: "@mohammed_h",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    lastMessage: {
      id: "tgmsg-3",
      content: "I've had an accident, need to file a claim",
      timestamp: "2023-05-22T10:15:00",
      isIncoming: true,
      type: "text",
    },
    unreadCount: 0,
    type: "FNOL",
    status: "In Progress",
    source: "Human",
    hasAttachments: true,
    hasWorkflowLinks: true,
    aiIntentClassification: "Claim Notification",
    aiSuggestion: "Initiate FNOL Process",
    ageInMinutes: 151,
    assignedAgent: "Sara A."
  },
  {
    id: "tg-4",
    contact: {
      name: "Ahmed Al Falasi",
      username: "@ahmed_falasi",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    lastMessage: {
      id: "tgmsg-4",
      content: "/renew GPM123",
      timestamp: "2023-05-22T09:20:00",
      isIncoming: true,
      type: "command",
    },
    unreadCount: 0,
    type: "Renewal",
    status: "Actioned",
    source: "Human",
    hasAttachments: false,
    hasWorkflowLinks: true,
    aiIntentClassification: "Policy Renewal Command",
    aiSuggestion: "Generate Renewal Quote",
    ageInMinutes: 206,
    assignedAgent: "Omar K."
  },
  {
    id: "tg-5",
    contact: {
      name: "ClaimsBot",
      username: "@praktora_claims_bot",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    lastMessage: {
      id: "tgmsg-5",
      content: "User tapped: ✅ Upload Policy Document",
      timestamp: "2023-05-22T08:45:00",
      isIncoming: true,
      type: "button",
    },
    unreadCount: 0,
    type: "FNOL",
    status: "In Progress",
    source: "Bot",
    hasAttachments: true,
    hasWorkflowLinks: true,
    aiIntentClassification: "Document Upload",
    aiSuggestion: "Attach to Claim W-2023-0471",
    ageInMinutes: 241,
    assignedAgent: "Fatima Q.",
    dataQualityScore: 91
  }
];

export const mockTelegramMessages: Record<string, TelegramMessage[]> = {
  "tg-1": [
    {
      id: "tgmsg-c1-1",
      content: "Hello, I'm looking for car insurance for my new Mazda CX-5",
      timestamp: "2023-05-22T12:28:00",
      isIncoming: true,
      type: "text",
      source: "Human"
    },
    {
      id: "tgmsg-c1-2",
      content: "Hi Fatima! I'd be happy to help you with a quote for your new Mazda CX-5. Could you please share the model year and your Emirates ID?",
      timestamp: "2023-05-22T12:29:00",
      isIncoming: false,
      type: "text"
    },
    {
      id: "tgmsg-c1-3",
      content: "It's a 2023 model, bought last month",
      timestamp: "2023-05-22T12:30:00",
      isIncoming: true,
      type: "text",
      source: "Human"
    },
    {
      id: "tgmsg-c1-4",
      content: "Need AXA quote for Mazda CX-5",
      timestamp: "2023-05-22T12:31:00",
      isIncoming: true,
      type: "text",
      source: "Human"
    },
    {
      id: "tgmsg-c1-5",
      content: "Here's my Emirates ID",
      timestamp: "2023-05-22T12:32:00",
      isIncoming: true,
      type: "image",
      source: "Human",
      attachmentUrl: "https://i.pravatar.cc/300?img=5",
      attachmentType: "image/jpeg",
      attachmentName: "Emirates ID.jpg"
    }
  ],
  "tg-2": [
    {
      id: "tgmsg-c2-1",
      content: "/quote",
      timestamp: "2023-05-22T11:40:00",
      isIncoming: true,
      type: "command",
      commandUsed: "/quote",
      source: "Human"
    },
    {
      id: "tgmsg-c2-2",
      content: "Please fill in the following form to get an instant quote:",
      timestamp: "2023-05-22T11:40:30",
      isIncoming: false,
      type: "text",
      source: "Bot"
    },
    {
      id: "tgmsg-c2-3",
      content: "User tapped: 🚗 Motor Insurance",
      timestamp: "2023-05-22T11:41:00",
      isIncoming: true,
      type: "button",
      buttonSelection: "Motor Insurance",
      source: "Human"
    },
    {
      id: "tgmsg-c2-4",
      content: "Form submission received",
      timestamp: "2023-05-22T11:45:00",
      isIncoming: true,
      type: "form",
      source: "Human",
      formData: {
        vehicleMake: "BMW",
        vehicleModel: "X5",
        vehicleYear: "2022",
        coverage: "Comprehensive",
        driverAge: "35",
        city: "Dubai"
      }
    }
  ],
  // Add more chat messages as needed
};
