
export interface TaskType {
  id: string;
  title: string;
  assignedTo: string;
  client?: string;
  linkedTo?: string;
  source: "Manual" | "Automation" | "P²RA AI" | "Email" | "WhatsApp";
  priority: "high" | "medium" | "normal";
  dueDate: string;
  status: "To-Do" | "In Progress" | "Done" | "Snoozed" | "Cancelled";
  notes: string;
  type?: "Call" | "Document" | "Upload" | "Follow-up" | "Meeting";
  isOverdue: boolean;
  dueToday: boolean;
  recurring: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskStatsType {
  total: number;
  completed: number;
  overdue: number;
  highPriority: number;
  dueToday: number;
  completionRate: number;
}
