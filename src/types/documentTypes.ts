
export type DocumentType = 
  | 'Policy Schedule' 
  | 'Invoice' 
  | 'Emirates ID' 
  | 'Endorsement' 
  | 'Statement of Account' 
  | 'Quote' 
  | 'Wordings'
  | 'Passport Copy'
  | 'Trade License'
  | 'Proposal';

export type DocumentStatus = 
  | 'Linked' 
  | 'Unlinked' 
  | 'Expired' 
  | 'Duplicate' 
  | 'Suggested';

export type DocumentSource = 
  | 'WhatsApp' 
  | 'Email' 
  | 'Telegram' 
  | 'Upload' 
  | 'PraktoraCore';

export interface Document {
  id: string;
  fileName: string;
  type: DocumentType;
  preview: string; // URL to thumbnail
  linkedTo?: {
    type: 'Enquiry' | 'Workflow' | 'Client' | 'Policy' | 'Invoice';
    id: string;
    name: string;
  };
  uploadedBy: {
    type: 'Agent' | 'System' | 'Email' | 'Client';
    name: string;
  };
  dateAdded: string;
  source: DocumentSource;
  status: DocumentStatus;
  confidence?: number; // AI confidence percentage
  ocrText?: string;
  hasAttachment: boolean;
  attachmentUrl?: string;
  attachmentType?: string;
  fileSize: string;
  expiryDate?: string;
  auditTrail: Array<{
    action: string;
    timestamp: string;
    user: string;
    details?: string;
  }>;
  aiTags?: string[];
  fileScore?: number; // AI-generated score for document quality
  version?: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: {
    types?: DocumentType[];
    status?: DocumentStatus[];
    sources?: DocumentSource[];
    dateRange?: {
      start?: string;
      end?: string;
    };
    searchText?: string;
    client?: string;
    workflow?: string;
    taggedBy?: 'Agent' | 'AI';
  };
  createdBy: string;
  createdAt: string;
}
