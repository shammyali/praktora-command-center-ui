
import { format, addDays, subDays } from 'date-fns';
import { TaskType } from '../types/taskTypes';

// Generate today's date and some relative dates for the tasks
const today = new Date();
const todayStr = format(today, 'yyyy-MM-dd');
const tomorrowStr = format(addDays(today, 1), 'yyyy-MM-dd');
const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');
const weekAgoStr = format(subDays(today, 7), 'yyyy-MM-dd');

// Sample tasks data
export const tasksData: TaskType[] = [
  {
    id: "TASK-001",
    title: "Call Dubai Holding for quote feedback",
    assignedTo: "You",
    client: "Dubai Holding",
    linkedTo: "WF1001",
    source: "P²RA AI",
    priority: "high",
    dueDate: todayStr,
    status: "To-Do",
    notes: "Client requested follow-up on the premium discount options we discussed. Need to confirm if the 15% multi-policy discount can be applied to their fleet insurance.",
    type: "Call",
    isOverdue: false,
    dueToday: true,
    recurring: false,
    createdBy: "P²RA AI",
    createdAt: weekAgoStr
  },
  {
    id: "TASK-002",
    title: "Upload verification documents for TITAN GROUP",
    assignedTo: "You",
    client: "TITAN GROUP",
    linkedTo: "WF1023",
    source: "Email",
    priority: "medium",
    dueDate: tomorrowStr,
    status: "To-Do",
    notes: "Need to upload Emirates ID copies and trade license for policy issuance. Documents were received via email from client's legal department.",
    type: "Upload",
    isOverdue: false,
    dueToday: false,
    recurring: false,
    createdBy: "Sara L.",
    createdAt: yesterdayStr
  },
  {
    id: "TASK-003",
    title: "Medical Claim Review Meeting",
    assignedTo: "Ahmed K.",
    client: "Emirates NBD",
    linkedTo: "WF1045",
    source: "Manual",
    priority: "normal",
    dueDate: format(addDays(today, 3), 'yyyy-MM-dd'),
    status: "To-Do",
    notes: "Schedule meeting with medical claims team to review the high-value claim submitted by the client. Prepare policy coverage summary for the meeting.",
    type: "Meeting",
    isOverdue: false,
    dueToday: false,
    recurring: false,
    createdBy: "You",
    createdAt: yesterdayStr
  },
  {
    id: "TASK-004",
    title: "Send Quote Comparison to Al Futtaim",
    assignedTo: "Sara L.",
    client: "Al Futtaim",
    linkedTo: "WF1089",
    source: "WhatsApp",
    priority: "high",
    dueDate: format(subDays(today, 2), 'yyyy-MM-dd'),
    status: "To-Do",
    notes: "Client requested comparison of the three liability coverage options through WhatsApp. Need to format the data and send it as a PDF.",
    type: "Document",
    isOverdue: true,
    dueToday: false,
    recurring: false,
    createdBy: "Layla M.",
    createdAt: weekAgoStr
  },
  {
    id: "TASK-005",
    title: "Follow up on Property Insurance Endorsement",
    assignedTo: "You",
    client: "Emaar Properties",
    linkedTo: "WF1067",
    source: "Automation",
    priority: "medium",
    dueDate: todayStr,
    status: "In Progress",
    notes: "Automated workflow detected property endorsement has been pending for 5 days. Call client to check if they need assistance with submitting required information.",
    type: "Follow-up",
    isOverdue: false,
    dueToday: true,
    recurring: false,
    createdBy: "System",
    createdAt: format(subDays(today, 5), 'yyyy-MM-dd')
  },
  {
    id: "TASK-006",
    title: "Weekly Portfolio Review",
    assignedTo: "Mohammed R.",
    client: "Dubai Properties",
    linkedTo: "WF1101",
    source: "Manual",
    priority: "normal",
    dueDate: format(addDays(today, 2), 'yyyy-MM-dd'),
    status: "To-Do",
    notes: "Conduct weekly review of the Dubai Properties multi-property portfolio. Check for any expiring policies or coverage gaps.",
    type: "Document",
    isOverdue: false,
    dueToday: false,
    recurring: true,
    createdBy: "Hassan Z.",
    createdAt: weekAgoStr
  },
  {
    id: "TASK-007",
    title: "Request Updated Fleet List",
    assignedTo: "You",
    client: "Etisalat",
    linkedTo: "WF1023",
    source: "P²RA AI",
    priority: "high",
    dueDate: format(subDays(today, 1), 'yyyy-MM-dd'),
    status: "To-Do",
    notes: "P²RA detected fleet renewal is approaching but vehicle list is outdated. Contact fleet manager to request updated list of vehicles for the renewal.",
    type: "Follow-up",
    isOverdue: true,
    dueToday: false,
    recurring: false,
    createdBy: "P²RA AI",
    createdAt: format(subDays(today, 4), 'yyyy-MM-dd')
  },
  {
    id: "TASK-008",
    title: "Monthly Compliance Check",
    assignedTo: "Fatima Q.",
    client: "Nakheel",
    source: "Automation",
    priority: "normal",
    dueDate: format(addDays(today, 5), 'yyyy-MM-dd'),
    status: "To-Do",
    notes: "Run monthly compliance check on all active policies for Nakheel properties. Ensure all regulatory requirements are being met.",
    type: "Document",
    isOverdue: false,
    dueToday: false,
    recurring: true,
    createdBy: "System",
    createdAt: format(subDays(today, 3), 'yyyy-MM-dd')
  }
];
