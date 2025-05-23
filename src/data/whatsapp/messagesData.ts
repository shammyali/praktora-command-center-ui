import { WhatsAppMessage } from './types';

// Mock conversation messages for each conversation
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
  "conv-3": [
    {
      id: "msg-c3-1",
      content: "Hi, I'd like to renew my policy.",
      timestamp: "2023-05-20T16:30:00",
      isIncoming: true,
      type: "text"
    },
    {
      id: "msg-c3-2",
      content: "Hello Omar, great to hear from you! Let's get your renewal sorted out. Any changes to your details?",
      timestamp: "2023-05-20T16:35:00",
      isIncoming: false,
      type: "text",
      status: "read"
    },
    {
      id: "msg-c3-3",
      content: "Thank you for the policy document. I've reviewed it.",
      timestamp: "2023-05-20T16:45:00",
      isIncoming: true,
      type: "text"
    }
  ],
  "conv-4": [
    {
      id: "msg-c4-1",
      content: "Hi, I'm interested in home insurance.",
      timestamp: "2023-05-19T11:00:00",
      isIncoming: true,
      type: "text"
    },
    {
      id: "msg-c4-2",
      content: "Hello Layla, happy to help you with home insurance. Can you provide your property details?",
      timestamp: "2023-05-19T11:10:00",
      isIncoming: false,
      type: "text",
      status: "read"
    },
    {
      id: "msg-c4-3",
      content: "Do you need any more information for my home insurance?",
      timestamp: "2023-05-19T11:20:00",
      isIncoming: true,
      type: "text"
    }
  ],
  "conv-5": [
    {
      id: "msg-c5-1",
      content: "Hi, I need a document.",
      timestamp: "2023-05-18T09:00:00",
      isIncoming: true,
      type: "text"
    },
    {
      id: "msg-c5-2",
      content: "Hello Khalid, which document are you looking for?",
      timestamp: "2023-05-18T09:05:00",
      isIncoming: false,
      type: "text",
      status: "read"
    },
    {
      id: "msg-c5-3",
      content: "Can I get a copy of my Emirates ID back?",
      timestamp: "2023-05-18T09:10:00",
      isIncoming: true,
      type: "text"
    }
  ]
};
