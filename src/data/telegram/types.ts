
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
