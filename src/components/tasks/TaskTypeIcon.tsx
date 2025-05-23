
import { 
  PhoneOutgoing, 
  FileText, 
  Upload, 
  Clock, 
  CalendarClock,
  LucideIcon
} from "lucide-react";

interface TaskTypeIconProps {
  type?: string;
  className?: string;
}

const TaskTypeIcon = ({ type, className = "h-4 w-4" }: TaskTypeIconProps) => {
  const getIcon = (): LucideIcon => {
    switch (type) {
      case "Call":
        return PhoneOutgoing;
      case "Document":
        return FileText;
      case "Upload":
        return Upload;
      case "Follow-up":
        return Clock;
      case "Meeting":
        return CalendarClock;
      default:
        return Clock;
    }
  };

  const Icon = getIcon();

  return <Icon className={className} />;
};

export default TaskTypeIcon;
