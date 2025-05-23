
import { 
  User, 
  FileCog, 
  Bot, 
  MailIcon, 
  MessageCircle,
  LucideIcon 
} from "lucide-react";

interface TaskSourceIconProps {
  source: string;
  className?: string;
}

const TaskSourceIcon = ({ source, className = "h-3 w-3" }: TaskSourceIconProps) => {
  const getIcon = (): LucideIcon => {
    switch (source) {
      case "Manual":
        return User;
      case "Automation":
        return FileCog;
      case "P²RA AI":
        return Bot;
      case "Email":
        return MailIcon;
      case "WhatsApp":
        return MessageCircle;
      default:
        return User;
    }
  };

  const Icon = getIcon();

  return <Icon className={className} />;
};

export default TaskSourceIcon;
