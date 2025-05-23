
import { TelegramChat } from './types';

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
