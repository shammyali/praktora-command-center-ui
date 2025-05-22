
export interface EnquiryItem {
  id: string;
  customerName: string;
  businessClass: string;
  businessLine?: string;
  source: 'WhatsApp' | 'Telegram' | 'Agent' | 'Direct' | 'Portal';
  assignedAgent: string;
  status: 'Enquiry' | 'Quoted' | 'Awaiting Client' | 'Draft' | 'Lost' | 'In Process' | 'Quote Ready' | 'Awaiting Client Confirmation';
  createdAt: Date;
  age: string; // Calculated from createdAt
  quoteSent: boolean;
  policyIssued: boolean;
  communicationLink?: string;
  lastInteraction?: Date;
  agentPerformance?: number; // 1-5 rating
  documents?: string[];
  missingDocuments?: string[];
  aiSuggestion?: string;
  aiSuggestionPriority?: 'low' | 'medium' | 'high';
}

export interface EnquiryCategory {
  title: string;
  count: number;
  items: EnquiryItem[];
}

export const businessClasses = [
  'Motor Individual',
  'Medical Individual',
  'Home',
  'Travel',
  'Yacht',
  'General Corporate',
  'Group Medical',
  'Group Life',
  'Individual Life',
  'Marine (Open/Individual)',
  'Travel Corporate'
];

export const sources = ['WhatsApp', 'Telegram', 'Portal', 'Agent', 'Direct'];

export const statuses = ['Enquiry', 'Quoted', 'Awaiting Client', 'Draft', 'Lost', 'In Process', 'Quote Ready', 'Awaiting Client Confirmation'];

export const agents = [
  'Layla M.',
  'Ahmed K.',
  'Sarah J.',
  'Fatima Z.',
  'Mohammed R.',
  'Rania T.',
  'Khalid S.',
  'Nora P.'
];

// Generate a random number of days (0-7) for age calculation
const randomDays = () => Math.floor(Math.random() * 8);

// Generate a date that's n days ago
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Format days ago for display
const formatAge = (date: Date) => {
  const diffTime = Math.abs(new Date().getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 'Today' : `${diffDays} day${diffDays === 1 ? '' : 's'}`;
};

// Generate mock enquiries
export const mockEnquiries: EnquiryItem[] = [
  {
    id: 'MI-2026-119',
    customerName: 'Ahmed Al Mansoori',
    businessClass: 'Motor Individual',
    source: 'WhatsApp',
    assignedAgent: 'Layla M.',
    status: 'In Process',
    createdAt: daysAgo(3),
    age: '3 days',
    quoteSent: false,
    policyIssued: false,
    communicationLink: 'whatsapp://send?phone=971501234567',
    aiSuggestion: 'Send AXA quote based on client preferences',
    aiSuggestionPriority: 'medium',
  },
  {
    id: 'GM-2026-089',
    customerName: 'Dubai Star Properties',
    businessClass: 'Group Medical',
    businessLine: 'Corporate',
    source: 'Portal',
    assignedAgent: 'Ahmed K.',
    status: 'Quote Ready',
    createdAt: daysAgo(1),
    age: '1 day',
    quoteSent: true,
    policyIssued: false,
    missingDocuments: ['Trade License', 'Passport Copies'],
    aiSuggestion: 'Follow up on missing documents before deadline',
    aiSuggestionPriority: 'high',
  },
  {
    id: 'TI-2026-203',
    customerName: 'Fatima Al Hashimi',
    businessClass: 'Travel',
    businessLine: 'Individual',
    source: 'Direct',
    assignedAgent: 'Sarah J.',
    status: 'Awaiting Client Confirmation',
    createdAt: daysAgo(5),
    age: '5 days',
    quoteSent: true,
    policyIssued: false,
    communicationLink: 'mailto:fatima@example.com',
    aiSuggestion: 'Client hasn\'t responded — send reminder',
    aiSuggestionPriority: 'high',
  },
  {
    id: 'MI-2026-112',
    customerName: 'Khalid Al Qasimi',
    businessClass: 'Medical Individual',
    source: 'WhatsApp',
    assignedAgent: 'Mohammed R.',
    status: 'Draft',
    createdAt: daysAgo(2),
    age: '2 days',
    quoteSent: false,
    policyIssued: false,
    communicationLink: 'whatsapp://send?phone=971501234568',
    missingDocuments: ['Emirates ID'],
    aiSuggestion: 'Documents missing: Emirates ID',
    aiSuggestionPriority: 'medium',
  },
  {
    id: 'HC-2026-078',
    customerName: 'Aisha Mohammed',
    businessClass: 'Home',
    businessLine: 'Contents',
    source: 'Telegram',
    assignedAgent: 'Rania T.',
    status: 'Quoted',
    createdAt: daysAgo(4),
    age: '4 days',
    quoteSent: true,
    policyIssued: false,
    aiSuggestion: 'Premium seems high compared to market - consider revising',
    aiSuggestionPriority: 'low',
  },
  {
    id: 'YC-2026-035',
    customerName: 'Omar Al Fardan',
    businessClass: 'Yacht',
    businessLine: 'Charter',
    source: 'Agent',
    assignedAgent: 'Khalid S.',
    status: 'Enquiry',
    createdAt: daysAgo(0),
    age: 'Today',
    quoteSent: false,
    policyIssued: false,
    aiSuggestion: 'Recommend comprehensive coverage due to yacht value',
    aiSuggestionPriority: 'medium',
  },
  {
    id: 'TC-2026-042',
    customerName: 'Emirates Global',
    businessClass: 'Travel Corporate',
    source: 'Portal',
    assignedAgent: 'Nora P.',
    status: 'Lost',
    createdAt: daysAgo(7),
    age: '7 days',
    quoteSent: true,
    policyIssued: false,
    aiSuggestion: 'Client went with competitor due to pricing - follow up in Q3',
    aiSuggestionPriority: 'low',
  },
  {
    id: 'GL-2026-115',
    customerName: 'Gulf Trading LLC',
    businessClass: 'Group Life',
    source: 'Direct',
    assignedAgent: 'Layla M.',
    status: 'In Process',
    createdAt: daysAgo(3),
    age: '3 days',
    quoteSent: false,
    policyIssued: false,
    missingDocuments: ['Employee List', 'Risk Assessment'],
    aiSuggestion: 'Request employee list to complete quote',
    aiSuggestionPriority: 'medium',
  },
  {
    id: 'MI-2026-209',
    customerName: 'Zainab Al Maktoum',
    businessClass: 'Marine (Open/Individual)',
    source: 'WhatsApp',
    assignedAgent: 'Ahmed K.',
    status: 'Awaiting Client',
    createdAt: daysAgo(6),
    age: '6 days',
    quoteSent: true,
    policyIssued: false,
    communicationLink: 'whatsapp://send?phone=971501234569',
    aiSuggestion: 'High-value client - schedule priority follow-up call',
    aiSuggestionPriority: 'high',
  },
  {
    id: 'GC-2026-054',
    customerName: 'Desert Sand Construction',
    businessClass: 'General Corporate',
    source: 'Agent',
    assignedAgent: 'Fatima Z.',
    status: 'Quote Ready',
    createdAt: daysAgo(2),
    age: '2 days',
    quoteSent: false,
    policyIssued: false,
    aiSuggestion: 'Send quote package today to meet client deadline',
    aiSuggestionPriority: 'high',
  }
];

// Regenerate ages in case they're needed elsewhere
mockEnquiries.forEach(enquiry => {
  enquiry.age = formatAge(enquiry.createdAt);
});

// Generate some communication history for each enquiry
export const mockCommunicationHistory: Record<string, { type: string, content: string, timestamp: Date }[]> = {};

mockEnquiries.forEach(enquiry => {
  const history = [];
  const numMessages = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < numMessages; i++) {
    const daysOffset = i * 0.5;
    const messageDate = new Date(enquiry.createdAt);
    messageDate.setDate(messageDate.getDate() + daysOffset);
    
    if (i === 0) {
      history.push({
        type: 'client',
        content: `Initial enquiry for ${enquiry.businessClass} insurance.`,
        timestamp: messageDate
      });
    } else if (i === numMessages - 1 && enquiry.quoteSent) {
      history.push({
        type: 'agent',
        content: 'Quote sent to client via email.',
        timestamp: messageDate
      });
    } else {
      const messageType = Math.random() > 0.5 ? 'client' : 'agent';
      const messages = {
        client: [
          'Can you provide more details about the coverage?',
          'What documents do you need from me?',
          'Is there a better price available?',
          'How long is the quote valid for?'
        ],
        agent: [
          'I\'ll prepare a quote for you shortly.',
          'Could you please provide your Emirates ID?',
          'I\'ve sent the request to our underwriters.',
          'Let me check with the insurance provider for better rates.'
        ]
      };
      
      const content = messages[messageType][Math.floor(Math.random() * messages[messageType].length)];
      history.push({
        type: messageType,
        content,
        timestamp: messageDate
      });
    }
  }
  
  mockCommunicationHistory[enquiry.id] = history;
});

// For quote details
export interface Quote {
  provider: string;
  amount: number;
  currency: string;
  validUntil: Date;
  coverage: string;
  isRecommended?: boolean;
}

export const mockQuotes: Record<string, Quote[]> = {};

// Generate some quotes for enquiries where quotes have been sent
mockEnquiries.filter(e => e.quoteSent).forEach(enquiry => {
  const providers = ['AXA', 'Daman', 'Oman Insurance', 'RSA', 'Metlife', 'Tokio Marine'];
  const numQuotes = Math.floor(Math.random() * 3) + 1;
  const quotes: Quote[] = [];
  
  for (let i = 0; i < numQuotes; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const baseAmount = Math.floor(Math.random() * 10000) + 1000;
    const validDays = Math.floor(Math.random() * 14) + 7;
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + validDays);
    
    quotes.push({
      provider,
      amount: baseAmount + (i * 500), // Different pricing tiers
      currency: 'AED',
      validUntil,
      coverage: `${enquiry.businessClass} Standard Coverage`,
      isRecommended: i === 0 // First quote is recommended
    });
  }
  
  mockQuotes[enquiry.id] = quotes;
});

// Filter the enquiries into categories based on status
export const activeEnquiries = mockEnquiries.filter(
  e => e.status !== 'Lost'
);

export const urgentEnquiries = mockEnquiries.filter(
  e => {
    const daysOld = parseInt(e.age);
    return (
      (daysOld > 2 && !e.quoteSent) || 
      e.aiSuggestionPriority === 'high'
    );
  }
);

export const quotedEnquiries = mockEnquiries.filter(
  e => e.status === 'Quoted' || e.status === 'Awaiting Client' || e.status === 'Awaiting Client Confirmation'
);

// Enquiry statistics
export const mockEnquiryStats = {
  total: mockEnquiries.length,
  awaiting: mockEnquiries.filter(e => e.status.includes('Awaiting')).length,
  quoted: mockEnquiries.filter(e => e.quoteSent).length,
  urgent: urgentEnquiries.length,
  conversion: {
    rate: 35, // percentage
    trend: '+5%'
  }
};
