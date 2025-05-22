
// Types for history events
export type ActorType = 'User' | 'Automation Engine' | 'P²RA AI' | 'Client' | 'External Source';

export type EventType = 'Automation' | 'Quote' | 'Claim' | 'Message' | 'KYC' | 'System' | 
                       'AI Suggestion' | 'Manual Action' | 'Communication' | 'Status Change' | 'System Trigger';

export type TargetEntityType = 'Client' | 'Enquiry' | 'Policy' | 'Claim' | 'Workflow';

export type ChannelType = 'WhatsApp' | 'Email' | 'Telegram' | 'Direct' | 'System';

export type OutcomeType = 'Executed' | 'Ignored' | 'Failed' | 'Overridden' | 'Pending';

export interface HistoryEvent {
  id: string;
  timestamp: Date;
  actor: {
    type: ActorType;
    name: string;
  };
  eventType: EventType;
  targetEntity: {
    type: TargetEntityType;
    id: string;
    name?: string;
  };
  action: string;
  outcome: OutcomeType;
  channel?: ChannelType;
  details: string;
  payload?: any;
  isAIEvent?: boolean;
  isAutomationEvent?: boolean;
}

// Generate mock history data
const generateMockHistoryData = (): HistoryEvent[] => {
  const now = new Date();
  const events: HistoryEvent[] = [];

  // Helper to generate random past date within days
  const randomPastDate = (daysAgo: number): Date => {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    date.setHours(
      Math.floor(Math.random() * 14) + 8, // Between 8 AM and 10 PM
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60)
    );
    return date;
  };

  // AI-driven events
  const aiEvents = [
    {
      id: "hist-001",
      timestamp: randomPastDate(1),
      actor: {
        type: 'P²RA AI' as ActorType,
        name: 'P²RA Intelligence'
      },
      eventType: 'AI Suggestion' as EventType,
      targetEntity: {
        type: 'Enquiry' as TargetEntityType,
        id: 'MI-2026-119',
        name: 'Ahmed Al Mansoori'
      },
      action: 'Suggested follow-up WhatsApp message due to 72h inactivity',
      outcome: 'Executed' as OutcomeType,
      channel: 'WhatsApp' as ChannelType,
      details: 'AI detected potential drop-off risk and initiated communication',
      payload: {
        template: 'follow_up_inactive',
        message: 'Hello Ahmed, we noticed you were interested in motor insurance. Can we assist with any questions?'
      },
      isAIEvent: true
    },
    {
      id: "hist-002",
      timestamp: randomPastDate(1),
      actor: {
        type: 'P²RA AI' as ActorType,
        name: 'P²RA Intelligence'
      },
      eventType: 'AI Suggestion' as EventType,
      targetEntity: {
        type: 'Claim' as TargetEntityType,
        id: 'CLM-4582',
        name: 'Abu Dhabi Coast Hotels'
      },
      action: 'Flagged potential fraud indicators in claim documentation',
      outcome: 'Pending' as OutcomeType,
      channel: 'System' as ChannelType,
      details: 'Anomaly detected in submitted receipts - timestamps inconsistent with claim narrative',
      isAIEvent: true
    }
  ];

  // Automation events
  const automationEvents = [
    {
      id: "hist-003",
      timestamp: randomPastDate(1),
      actor: {
        type: 'Automation Engine' as ActorType,
        name: 'Renewal Reminder System'
      },
      eventType: 'Automation' as EventType,
      targetEntity: {
        type: 'Policy' as TargetEntityType,
        id: 'POL-2022-7865',
        name: 'Abu Dhabi Coast Hotels'
      },
      action: 'Sent 30-day renewal notice',
      outcome: 'Executed' as OutcomeType,
      channel: 'Email' as ChannelType,
      details: 'Automated renewal notification sent with current terms and premium details',
      isAutomationEvent: true
    },
    {
      id: "hist-004",
      timestamp: randomPastDate(2),
      actor: {
        type: 'Automation Engine' as ActorType,
        name: 'Document Processor'
      },
      eventType: 'System' as EventType,
      targetEntity: {
        type: 'Client' as TargetEntityType,
        id: 'CLT-2023-052',
        name: 'Fatima Al Hashimi'
      },
      action: 'KYC document verification completed',
      outcome: 'Failed' as OutcomeType,
      details: 'Emirates ID expired, verification unsuccessful',
      isAutomationEvent: true
    }
  ];

  // User events
  const userEvents = [
    {
      id: "hist-005",
      timestamp: randomPastDate(1),
      actor: {
        type: 'User' as ActorType,
        name: 'Layla M.'
      },
      eventType: 'Manual Action' as EventType,
      targetEntity: {
        type: 'Quote' as TargetEntityType,
        id: 'QT-2026-187',
        name: 'Emirati Holdings LLC'
      },
      action: 'Override system-generated premium calculation',
      outcome: 'Executed' as OutcomeType,
      details: 'Premium adjusted to match competitive offer - approved by underwriting manager',
    },
    {
      id: "hist-006",
      timestamp: randomPastDate(1),
      actor: {
        type: 'User' as ActorType,
        name: 'Ahmed K.'
      },
      eventType: 'Status Change' as EventType,
      targetEntity: {
        type: 'Workflow' as TargetEntityType,
        id: 'WF-2026-089',
        name: 'Dubai Star Properties'
      },
      action: 'Changed workflow status from "In Process" to "Quote Ready"',
      outcome: 'Executed' as OutcomeType,
      details: 'All required documentation received and verified',
    }
  ];

  // Client events
  const clientEvents = [
    {
      id: "hist-007",
      timestamp: randomPastDate(1),
      actor: {
        type: 'Client' as ActorType,
        name: 'Khalid Al Qasimi'
      },
      eventType: 'Communication' as EventType,
      targetEntity: {
        type: 'Enquiry' as TargetEntityType,
        id: 'MI-2026-112',
      },
      action: 'Replied to WhatsApp message',
      outcome: 'Executed' as OutcomeType,
      channel: 'WhatsApp' as ChannelType,
      details: 'Client confirmed interest in quote and requested call back',
    },
    {
      id: "hist-008",
      timestamp: randomPastDate(3),
      actor: {
        type: 'Client' as ActorType,
        name: 'Gulf Trading LLC'
      },
      eventType: 'Message' as EventType,
      targetEntity: {
        type: 'Policy' as TargetEntityType,
        id: 'POL-2025-563',
      },
      action: 'Uploaded missing employee list documentation',
      outcome: 'Executed' as OutcomeType,
      channel: 'Portal' as ChannelType,
      details: 'Required documentation for group medical policy completion',
    }
  ];

  // External events
  const externalEvents = [
    {
      id: "hist-009",
      timestamp: randomPastDate(1),
      actor: {
        type: 'External Source' as ActorType,
        name: 'AXA Insurance'
      },
      eventType: 'System' as EventType,
      targetEntity: {
        type: 'Claim' as TargetEntityType,
        id: 'CLM-2026-093',
      },
      action: 'Claim status update received',
      outcome: 'Executed' as OutcomeType,
      details: 'Claim approved with settlement amount of AED 125,000',
    },
    {
      id: "hist-010",
      timestamp: randomPastDate(5),
      actor: {
        type: 'External Source' as ActorType,
        name: 'RTA Dubai'
      },
      eventType: 'Message' as EventType,
      targetEntity: {
        type: 'Claim' as TargetEntityType,
        id: 'CLM-2026-021',
      },
      action: 'Police report data received via API',
      outcome: 'Executed' as OutcomeType,
      details: 'Traffic accident details automatically attached to claim file',
    }
  ];

  // Generate more events based on patterns
  const generateMoreEvents = (baseEvents: HistoryEvent[], count: number) => {
    const additionalEvents: HistoryEvent[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomEvent = {...baseEvents[Math.floor(Math.random() * baseEvents.length)]};
      randomEvent.id = `hist-${events.length + additionalEvents.length + 1}`.padStart(7, '0');
      randomEvent.timestamp = randomPastDate(7);
      additionalEvents.push(randomEvent as HistoryEvent);
    }
    
    return additionalEvents;
  };

  // Combine all events
  events.push(
    ...aiEvents,
    ...automationEvents,
    ...userEvents,
    ...clientEvents,
    ...externalEvents,
    ...generateMoreEvents([...aiEvents, ...automationEvents, ...userEvents, ...clientEvents, ...externalEvents], 40)
  );

  // Sort by timestamp (newest first)
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const historyEvents = generateMockHistoryData();

// Summary statistics for narrative mode
export const generateHistorySummary = (events: HistoryEvent[], days: number = 1) => {
  const today = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const filteredEvents = events.filter(event => event.timestamp >= cutoffDate);
  
  const aiEventCount = filteredEvents.filter(e => e.isAIEvent).length;
  const automationEventCount = filteredEvents.filter(e => e.isAutomationEvent).length;
  const userEventCount = filteredEvents.filter(e => e.actor.type === 'User').length;
  const clientEventCount = filteredEvents.filter(e => e.actor.type === 'Client').length;
  
  const whatsAppEvents = filteredEvents.filter(e => e.channel === 'WhatsApp').length;
  const emailEvents = filteredEvents.filter(e => e.channel === 'Email').length;
  const telegramEvents = filteredEvents.filter(e => e.channel === 'Telegram').length;
  
  const failedEvents = filteredEvents.filter(e => e.outcome === 'Failed').length;
  const overriddenEvents = filteredEvents.filter(e => e.outcome === 'Overridden').length;
  
  const uniqueWorkflows = new Set(
    filteredEvents
      .filter(e => e.targetEntity.type === 'Workflow')
      .map(e => e.targetEntity.id)
  ).size;
  
  return {
    period: days === 1 ? 'Today' : `Last ${days} days`,
    totalEvents: filteredEvents.length,
    aiEventCount,
    automationEventCount,
    userEventCount,
    clientEventCount,
    whatsAppEvents,
    emailEvents,
    telegramEvents,
    failedEvents,
    overriddenEvents,
    uniqueWorkflows
  };
};
