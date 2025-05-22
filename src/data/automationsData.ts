
export interface Trigger {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Condition {
  id: string;
  field: string;
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains" | "not_contains" | "in" | "not_in";
  value: string | number | boolean;
}

export interface Action {
  id: string;
  name: string;
  description: string;
  icon: string;
  parameters?: Record<string, any>;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  tags: string[];
  trigger: Trigger;
  conditions: { logic: "AND" | "OR"; items: Condition[] }[];
  actions: Action[];
  createdAt: string;
  updatedAt: string;
  executionCount: number;
  failureRate: number;
  lastExecuted: string | null;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  tags: string[];
  trigger: Trigger;
  conditions: { logic: "AND" | "OR"; items: Condition[] }[];
  actions: Action[];
  popularity: number;
}

export const triggers: Trigger[] = [
  {
    id: "new_enquiry",
    name: "New Enquiry Created",
    description: "Triggers when a new enquiry is created",
    icon: "file-plus",
  },
  {
    id: "quote_sent",
    name: "Quote Sent",
    description: "Triggers when a quote is sent to a client",
    icon: "send",
  },
  {
    id: "quote_not_sent",
    name: "Quote Not Sent (X time)",
    description: "Triggers when a quote hasn't been sent after a specific time",
    icon: "clock",
  },
  {
    id: "client_confirmed",
    name: "Client Confirmed",
    description: "Triggers when client confirms interest in a quote",
    icon: "check",
  },
  {
    id: "policy_expired",
    name: "Policy Expired",
    description: "Triggers when a policy expires",
    icon: "calendar",
  },
  {
    id: "fnol_submitted",
    name: "FNOL Submitted",
    description: "Triggers when First Notice of Loss is submitted",
    icon: "alert-triangle",
  },
  {
    id: "whatsapp_received",
    name: "WhatsApp Message Received",
    description: "Triggers when a WhatsApp message is received",
    icon: "message-circle",
  },
  {
    id: "telegram_completed",
    name: "Telegram Bot Completed",
    description: "Triggers when a Telegram bot interaction completes",
    icon: "send",
  },
  {
    id: "email_subject_contains",
    name: "Email Subject Contains...",
    description: "Triggers when an email with specific subject text is received",
    icon: "mail",
  },
  {
    id: "kyc_expiring",
    name: "KYC Expiring",
    description: "Triggers when KYC documents are about to expire",
    icon: "file-text",
  },
  {
    id: "invoice_overdue",
    name: "Invoice Overdue",
    description: "Triggers when an invoice is overdue",
    icon: "alert-circle",
  },
  {
    id: "ai_risk_score",
    name: "AI Risk Score Triggered",
    description: "Triggers when AI detects a risk score change",
    icon: "brain",
  },
  {
    id: "p2ra_insight",
    name: "P²RA Insight Matched",
    description: "Triggers when P²RA provides a specific insight",
    icon: "lightbulb",
  },
];

export const conditionFields = [
  { id: "class", name: "Class", type: "select", options: ["Motor", "Medical", "Travel", "General Corporate", "Group Medical", "Group Life", "Marine", "Life", "Property"] },
  { id: "premium", name: "Premium", type: "number", unit: "AED" },
  { id: "agent", name: "Assigned Agent", type: "select", options: ["Layla", "Ahmed", "Sarah", "Omar", "Fatima"] },
  { id: "channel", name: "Channel", type: "select", options: ["WhatsApp", "Email", "Portal", "Direct", "Agent"] },
  { id: "sla_breached", name: "SLA Breached", type: "boolean" },
  { id: "client_status", name: "Client", type: "select", options: ["VIP", "Regular", "New", "At Risk"] },
  { id: "insurer", name: "Insurer", type: "select", options: ["AXA", "RSA", "Oman Insurance", "Daman", "MetLife"] },
  { id: "quote_status", name: "Quote Status", type: "select", options: ["Awaiting Client Confirmation", "Pending", "Accepted", "Declined", "Expired"] },
];

export const actions: Action[] = [
  {
    id: "send_whatsapp",
    name: "Send WhatsApp Message",
    description: "Send a WhatsApp message to the client",
    icon: "message-circle",
  },
  {
    id: "send_email",
    name: "Send Email",
    description: "Send an email to the client",
    icon: "mail",
  },
  {
    id: "assign_agent",
    name: "Assign to Agent",
    description: "Assign the item to a specific agent",
    icon: "user",
  },
  {
    id: "open_workflow",
    name: "Open New Workflow",
    description: "Create and open a new workflow",
    icon: "folder-plus",
  },
  {
    id: "trigger_reminder",
    name: "Trigger Reminder",
    description: "Create a reminder for the assigned agent",
    icon: "bell",
  },
  {
    id: "generate_pdf",
    name: "Generate PDF",
    description: "Generate a PDF document",
    icon: "file-text",
  },
  {
    id: "attach_document",
    name: "Attach Document to Enquiry",
    description: "Attach a document to the inquiry",
    icon: "paperclip",
  },
  {
    id: "create_task",
    name: "Create Task",
    description: "Create a new task",
    icon: "check-square",
  },
  {
    id: "open_claim",
    name: "Open Claim",
    description: "Open a new claim",
    icon: "clipboard",
  },
  {
    id: "notify_supervisor",
    name: "Notify Supervisor",
    description: "Send a notification to the supervisor",
    icon: "alert-circle",
  },
  {
    id: "mark_status",
    name: "Mark as Lost / Follow-Up",
    description: "Update the status of the item",
    icon: "tag",
  },
  {
    id: "log_note",
    name: "Log Note on Policy",
    description: "Add a note to the policy",
    icon: "file-text",
  },
  {
    id: "escalate_compliance",
    name: "Escalate to Compliance",
    description: "Escalate the issue to the compliance team",
    icon: "alert-triangle",
  },
];

export const automationTemplates: AutomationTemplate[] = [
  {
    id: "template_1",
    name: "Auto-follow-up 48h after quote",
    description: "Automatically sends a WhatsApp follow-up message 48 hours after a quote if client hasn't replied",
    tags: ["follow-up", "quote", "whatsapp"],
    trigger: triggers.find(t => t.id === "quote_sent")!,
    conditions: [
      {
        logic: "AND",
        items: [
          {
            id: "cond_1",
            field: "quote_status",
            operator: "equals",
            value: "Awaiting Client Confirmation"
          }
        ]
      }
    ],
    actions: [actions.find(a => a.id === "send_whatsapp")!],
    popularity: 87
  },
  {
    id: "template_2",
    name: "Escalate claim after 5 days in survey",
    description: "Escalates a claim to a supervisor if it's been in survey for more than 5 days",
    tags: ["claim", "escalation", "survey"],
    trigger: triggers.find(t => t.id === "fnol_submitted")!,
    conditions: [
      {
        logic: "AND",
        items: [
          {
            id: "cond_2",
            field: "sla_breached",
            operator: "equals",
            value: true
          }
        ]
      }
    ],
    actions: [actions.find(a => a.id === "notify_supervisor")!],
    popularity: 64
  },
  {
    id: "template_3",
    name: "Send invoice reminder 7 days after due",
    description: "Automatically sends an email reminder 7 days after an invoice is due",
    tags: ["invoice", "reminder", "email"],
    trigger: triggers.find(t => t.id === "invoice_overdue")!,
    conditions: [],
    actions: [actions.find(a => a.id === "send_email")!],
    popularity: 92
  },
  {
    id: "template_4",
    name: "Create FNOL task after Telegram bot completed",
    description: "Creates a task when a customer reports an incident through the Telegram bot",
    tags: ["telegram", "task", "claim"],
    trigger: triggers.find(t => t.id === "telegram_completed")!,
    conditions: [],
    actions: [actions.find(a => a.id === "create_task")!],
    popularity: 53
  }
];

export const activeAutomations: Automation[] = [
  {
    id: "auto_1",
    name: "VIP Client Quote Follow-up",
    description: "Send WhatsApp message to VIP clients 24 hours after quote if no response",
    isActive: true,
    tags: ["vip", "follow-up", "whatsapp"],
    trigger: triggers.find(t => t.id === "quote_sent")!,
    conditions: [
      {
        logic: "AND",
        items: [
          {
            id: "cond_1",
            field: "client_status",
            operator: "equals",
            value: "VIP"
          },
          {
            id: "cond_2",
            field: "quote_status",
            operator: "equals",
            value: "Awaiting Client Confirmation"
          }
        ]
      }
    ],
    actions: [actions.find(a => a.id === "send_whatsapp")!],
    createdAt: "2023-12-01T10:30:00Z",
    updatedAt: "2023-12-15T14:45:00Z",
    executionCount: 26,
    failureRate: 0.02,
    lastExecuted: "2023-12-28T09:15:00Z"
  },
  {
    id: "auto_2",
    name: "Medical Policy Expiry Reminder",
    description: "Send email reminder 30 days before medical policy expires",
    isActive: true,
    tags: ["medical", "renewal", "email"],
    trigger: triggers.find(t => t.id === "policy_expired")!,
    conditions: [
      {
        logic: "AND",
        items: [
          {
            id: "cond_3",
            field: "class",
            operator: "equals",
            value: "Medical"
          }
        ]
      }
    ],
    actions: [actions.find(a => a.id === "send_email")!],
    createdAt: "2023-10-05T16:20:00Z",
    updatedAt: "2023-11-12T11:05:00Z",
    executionCount: 187,
    failureRate: 0.003,
    lastExecuted: "2023-12-28T07:30:00Z"
  },
  {
    id: "auto_3",
    name: "High Value Quote Assignment",
    description: "Automatically assign quotes over AED 50,000 to senior agents",
    isActive: true,
    tags: ["high-value", "assignment", "premium"],
    trigger: triggers.find(t => t.id === "new_enquiry")!,
    conditions: [
      {
        logic: "AND",
        items: [
          {
            id: "cond_4",
            field: "premium",
            operator: "greater_than",
            value: 50000
          }
        ]
      }
    ],
    actions: [actions.find(a => a.id === "assign_agent")!],
    createdAt: "2023-09-18T13:10:00Z",
    updatedAt: "2023-12-22T09:30:00Z",
    executionCount: 42,
    failureRate: 0.0,
    lastExecuted: "2023-12-27T15:45:00Z"
  }
];

export const automationStats = {
  activeRules: 28,
  executionsThisWeek: 341,
  timeSavedEstimate: 19,
  topTrigger: "Unquoted > 48h",
  ruleFailureRate: 0.4,
  mostUsedAction: "Send WhatsApp Reminder"
};
