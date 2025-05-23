
import { Document, DocumentType, DocumentStatus, DocumentSource, SavedSearch } from '@/types/documentTypes';

// Generate mock documents data
export const documentsData: Document[] = [
  {
    id: "DOC001",
    fileName: "AXA_Policy_MI004.pdf",
    type: "Policy Schedule",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Policy",
      id: "POL1234",
      name: "Commercial Property Insurance"
    },
    uploadedBy: {
      type: "Agent",
      name: "Ahmed K."
    },
    dateAdded: "2025-05-20T14:30:00",
    source: "Email",
    status: "Linked",
    confidence: 98,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "1.2 MB",
    auditTrail: [
      {
        action: "Uploaded",
        timestamp: "2025-05-20T14:30:00",
        user: "Ahmed K.",
        details: "Uploaded via Email"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-20T14:30:05",
        user: "P²RA AI",
        details: "Tagged as Policy Schedule with 98% confidence"
      },
      {
        action: "Linked",
        timestamp: "2025-05-20T14:35:20",
        user: "Ahmed K.",
        details: "Linked to Policy POL1234"
      }
    ],
    aiTags: ["Property", "Commercial", "AXA"],
    fileScore: 95,
    version: 1
  },
  {
    id: "DOC002",
    fileName: "TITAN_Group_Invoice_May2026.pdf",
    type: "Invoice",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Client",
      id: "CLT567",
      name: "TITAN GROUP"
    },
    uploadedBy: {
      type: "System",
      name: "Auto-Import"
    },
    dateAdded: "2025-05-18T09:15:00",
    source: "PraktoraCore",
    status: "Linked",
    confidence: 100,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "845 KB",
    auditTrail: [
      {
        action: "Imported",
        timestamp: "2025-05-18T09:15:00",
        user: "System",
        details: "Imported from PraktoraCore"
      },
      {
        action: "Auto-linked",
        timestamp: "2025-05-18T09:15:03",
        user: "P²RA AI",
        details: "Linked to TITAN GROUP client account"
      }
    ],
    aiTags: ["Invoice", "Payment Due", "May 2026"],
    fileScore: 100,
    version: 1
  },
  {
    id: "DOC003",
    fileName: "Emirates_ID_Hassan_Mohammad.jpg",
    type: "Emirates ID",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    uploadedBy: {
      type: "Client",
      name: "Hassan Mohammad"
    },
    dateAdded: "2025-05-15T11:20:00",
    source: "WhatsApp",
    status: "Expired",
    confidence: 96,
    hasAttachment: true,
    attachmentType: "JPG",
    fileSize: "320 KB",
    expiryDate: "2025-04-30",
    auditTrail: [
      {
        action: "Received",
        timestamp: "2025-05-15T11:20:00",
        user: "WhatsApp Bot",
        details: "Received via WhatsApp"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-15T11:20:08",
        user: "P²RA AI",
        details: "Tagged as Emirates ID with 96% confidence"
      },
      {
        action: "Status Updated",
        timestamp: "2025-05-15T11:20:15",
        user: "P²RA AI",
        details: "Marked as Expired (expired on 30 Apr 2025)"
      }
    ],
    aiTags: ["ID", "Personal", "Expired"],
    fileScore: 75,
    version: 1
  },
  {
    id: "DOC004",
    fileName: "Emaar_Property_Addition_Endorsement.pdf",
    type: "Endorsement",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Workflow",
      id: "WF1067",
      name: "Property Insurance Endorsement"
    },
    uploadedBy: {
      type: "Agent",
      name: "Layla M."
    },
    dateAdded: "2025-05-17T16:40:00",
    source: "Upload",
    status: "Linked",
    confidence: 92,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "1.8 MB",
    auditTrail: [
      {
        action: "Uploaded",
        timestamp: "2025-05-17T16:40:00",
        user: "Layla M.",
        details: "Manually uploaded"
      },
      {
        action: "Linked",
        timestamp: "2025-05-17T16:42:30",
        user: "Layla M.",
        details: "Linked to Workflow WF1067"
      }
    ],
    aiTags: ["Endorsement", "Property", "Addition"],
    fileScore: 88,
    version: 1
  },
  {
    id: "DOC005",
    fileName: "Emirates_NBD_SOA_Q1_2026.pdf",
    type: "Statement of Account",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Client",
      id: "CLT234",
      name: "Emirates NBD"
    },
    uploadedBy: {
      type: "Email",
      name: "accounts@emiratesnbd.ae"
    },
    dateAdded: "2025-05-12T08:30:00",
    source: "Email",
    status: "Linked",
    confidence: 89,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "2.1 MB",
    auditTrail: [
      {
        action: "Received",
        timestamp: "2025-05-12T08:30:00",
        user: "Email Bot",
        details: "Received via Email"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-12T08:30:12",
        user: "P²RA AI",
        details: "Tagged as Statement of Account with 89% confidence"
      },
      {
        action: "Auto-linked",
        timestamp: "2025-05-12T08:30:18",
        user: "P²RA AI",
        details: "Linked to Emirates NBD client account"
      }
    ],
    aiTags: ["Statement", "Q1", "2026", "Emirates NBD"],
    fileScore: 90,
    version: 1
  },
  {
    id: "DOC006",
    fileName: "Al_Futtaim_Motor_Quote.pdf",
    type: "Quote",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Enquiry",
      id: "ENQ456",
      name: "Motor Insurance Quote Request"
    },
    uploadedBy: {
      type: "Agent",
      name: "Fatima Q."
    },
    dateAdded: "2025-05-19T13:15:00",
    source: "Upload",
    status: "Linked",
    confidence: 97,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "720 KB",
    auditTrail: [
      {
        action: "Generated",
        timestamp: "2025-05-19T13:10:00",
        user: "Fatima Q.",
        details: "Generated from system template"
      },
      {
        action: "Uploaded",
        timestamp: "2025-05-19T13:15:00",
        user: "Fatima Q.",
        details: "Manually uploaded to Document Hub"
      },
      {
        action: "Linked",
        timestamp: "2025-05-19T13:16:45",
        user: "Fatima Q.",
        details: "Linked to Enquiry ENQ456"
      }
    ],
    aiTags: ["Quote", "Motor", "Al Futtaim"],
    fileScore: 98,
    version: 1
  },
  {
    id: "DOC007",
    fileName: "Dubai_Holding_Trade_License_2026.pdf",
    type: "Trade License",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Client",
      id: "CLT789",
      name: "Dubai Holding"
    },
    uploadedBy: {
      type: "Client",
      name: "Dubai Holding Admin"
    },
    dateAdded: "2025-05-14T10:00:00",
    source: "Email",
    status: "Linked",
    confidence: 94,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "1.5 MB",
    auditTrail: [
      {
        action: "Received",
        timestamp: "2025-05-14T10:00:00",
        user: "Email Bot",
        details: "Received via Email"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-14T10:00:09",
        user: "P²RA AI",
        details: "Tagged as Trade License with 94% confidence"
      },
      {
        action: "Auto-linked",
        timestamp: "2025-05-14T10:00:15",
        user: "P²RA AI",
        details: "Linked to Dubai Holding client account"
      }
    ],
    aiTags: ["License", "Trade", "2026", "Dubai Holding"],
    fileScore: 92,
    version: 1
  },
  {
    id: "DOC008",
    fileName: "Etisalat_Liability_Policy_Wordings.pdf",
    type: "Wordings",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Policy",
      id: "POL5678",
      name: "Business Liability Insurance"
    },
    uploadedBy: {
      type: "System",
      name: "Auto-Import"
    },
    dateAdded: "2025-05-13T09:45:00",
    source: "PraktoraCore",
    status: "Linked",
    confidence: 100,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "3.2 MB",
    auditTrail: [
      {
        action: "Imported",
        timestamp: "2025-05-13T09:45:00",
        user: "System",
        details: "Imported from PraktoraCore"
      },
      {
        action: "Auto-linked",
        timestamp: "2025-05-13T09:45:05",
        user: "System",
        details: "Linked to Policy POL5678"
      }
    ],
    aiTags: ["Wordings", "Liability", "Policy", "Legal"],
    fileScore: 100,
    version: 1
  },
  {
    id: "DOC009",
    fileName: "Nakheel_Claim_Form.pdf",
    type: "Proposal",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    uploadedBy: {
      type: "Agent",
      name: "Hassan Z."
    },
    dateAdded: "2025-05-16T15:20:00",
    source: "Upload",
    status: "Unlinked",
    confidence: 85,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "950 KB",
    auditTrail: [
      {
        action: "Uploaded",
        timestamp: "2025-05-16T15:20:00",
        user: "Hassan Z.",
        details: "Manually uploaded"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-16T15:20:08",
        user: "P²RA AI",
        details: "Tagged as Proposal with 85% confidence"
      }
    ],
    aiTags: ["Claim", "Form", "Property"],
    fileScore: 82,
    version: 1
  },
  {
    id: "DOC010",
    fileName: "Passport_Ahmad_Al_Najjar.jpg",
    type: "Passport Copy",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    uploadedBy: {
      type: "Client",
      name: "Ahmad Al Najjar"
    },
    dateAdded: "2025-05-11T16:50:00",
    source: "WhatsApp",
    status: "Suggested",
    confidence: 96,
    hasAttachment: true,
    attachmentType: "JPG",
    fileSize: "450 KB",
    auditTrail: [
      {
        action: "Received",
        timestamp: "2025-05-11T16:50:00",
        user: "WhatsApp Bot",
        details: "Received via WhatsApp"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-11T16:50:07",
        user: "P²RA AI",
        details: "Tagged as Passport Copy with 96% confidence"
      },
      {
        action: "Suggestion Generated",
        timestamp: "2025-05-11T16:50:15",
        user: "P²RA AI",
        details: "Suggested linking to Client CLT901 (Ahmad Al Najjar)"
      }
    ],
    aiTags: ["Passport", "Personal", "Identification"],
    fileScore: 88,
    version: 1
  },
  {
    id: "DOC011",
    fileName: "DubaiHolding_InvoiceApril2026_Duplicate.pdf",
    type: "Invoice",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    linkedTo: {
      type: "Invoice",
      id: "INV789",
      name: "April 2026 Premium"
    },
    uploadedBy: {
      type: "Email",
      name: "finance@dubaiholding.ae"
    },
    dateAdded: "2025-05-18T11:30:00",
    source: "Email",
    status: "Duplicate",
    confidence: 97,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "840 KB",
    auditTrail: [
      {
        action: "Received",
        timestamp: "2025-05-18T11:30:00",
        user: "Email Bot",
        details: "Received via Email"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-18T11:30:08",
        user: "P²RA AI",
        details: "Tagged as Invoice with 97% confidence"
      },
      {
        action: "Duplicate Detected",
        timestamp: "2025-05-18T11:30:12",
        user: "P²RA AI",
        details: "Duplicate of DOC002 (99% match)"
      }
    ],
    aiTags: ["Invoice", "Duplicate", "Dubai Holding"],
    fileScore: 90,
    version: 1
  },
  {
    id: "DOC012",
    fileName: "Al_Futtaim_Motor_Schedule.pdf",
    type: "Policy Schedule",
    preview: "/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png", // placeholder for thumbnail
    uploadedBy: {
      type: "Agent",
      name: "Mohammed R."
    },
    dateAdded: "2025-05-19T14:15:00",
    source: "Upload",
    status: "Unlinked",
    confidence: 95,
    hasAttachment: true,
    attachmentType: "PDF",
    fileSize: "1.1 MB",
    auditTrail: [
      {
        action: "Uploaded",
        timestamp: "2025-05-19T14:15:00",
        user: "Mohammed R.",
        details: "Manually uploaded"
      },
      {
        action: "Auto-tagged",
        timestamp: "2025-05-19T14:15:07",
        user: "P²RA AI",
        details: "Tagged as Policy Schedule with 95% confidence"
      }
    ],
    aiTags: ["Schedule", "Motor", "Al Futtaim"],
    fileScore: 94,
    version: 1
  }
];

// Mock saved searches
export const savedSearches: SavedSearch[] = [
  {
    id: "SS001",
    name: "Unlinked Invoices This Month",
    query: {
      types: ["Invoice"],
      status: ["Unlinked"],
      dateRange: {
        start: "2025-05-01"
      }
    },
    createdBy: "You",
    createdAt: "2025-05-10T09:00:00"
  },
  {
    id: "SS002",
    name: "Expired IDs and Licenses",
    query: {
      types: ["Emirates ID", "Trade License"],
      status: ["Expired"]
    },
    createdBy: "You",
    createdAt: "2025-05-05T14:30:00"
  },
  {
    id: "SS003",
    name: "High-Value Policies (Dubai Holding)",
    query: {
      types: ["Policy Schedule"],
      client: "Dubai Holding"
    },
    createdBy: "Ahmed K.",
    createdAt: "2025-05-15T11:20:00"
  },
  {
    id: "SS004",
    name: "Documents Needing Manual Review",
    query: {
      status: ["Suggested"],
      taggedBy: "AI"
    },
    createdBy: "You",
    createdAt: "2025-04-28T16:45:00"
  }
];

// Analytics data for right panel
export const documentAnalytics = {
  totalDocumentsThisMonth: 422,
  linkedPercentage: 91,
  autoTaggedPercentage: 86,
  ocrProcessedPercentage: 94,
  expiredDocuments: 12,
  highValueInvoices: 39,
  mostCommonType: "Policy Schedule",
  documentsBySource: {
    Email: 156,
    WhatsApp: 98,
    Upload: 102,
    PraktoraCore: 54,
    Telegram: 12
  },
  documentsByType: {
    "Policy Schedule": 105,
    "Invoice": 87,
    "Emirates ID": 42,
    "Endorsement": 38,
    "Statement of Account": 31,
    "Quote": 55,
    "Wordings": 18,
    "Passport Copy": 24,
    "Trade License": 15,
    "Proposal": 7
  },
  uploadTrend: [
    { date: "2025-05-01", count: 12 },
    { date: "2025-05-02", count: 9 },
    { date: "2025-05-03", count: 5 },
    { date: "2025-05-04", count: 4 },
    { date: "2025-05-05", count: 18 },
    { date: "2025-05-06", count: 15 },
    { date: "2025-05-07", count: 13 },
    { date: "2025-05-08", count: 11 },
    { date: "2025-05-09", count: 14 },
    { date: "2025-05-10", count: 7 },
    { date: "2025-05-11", count: 6 },
    { date: "2025-05-12", count: 19 },
    { date: "2025-05-13", count: 21 },
    { date: "2025-05-14", count: 17 },
    { date: "2025-05-15", count: 15 },
    { date: "2025-05-16", count: 13 },
    { date: "2025-05-17", count: 11 },
    { date: "2025-05-18", count: 8 },
    { date: "2025-05-19", count: 16 },
    { date: "2025-05-20", count: 22 },
    { date: "2025-05-21", count: 24 },
    { date: "2025-05-22", count: 20 },
    { date: "2025-05-23", count: 18 }
  ]
};
