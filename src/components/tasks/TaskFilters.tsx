
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Filter, 
  Flag, 
  Clock, 
  Bot, 
  User, 
  FileCog, 
  MailIcon, 
  MessageCircle 
} from "lucide-react";

interface TaskFiltersProps {
  onPriorityChange: (priority: string | null) => void;
  onSourceChange: (source: string | null) => void;
}

const TaskFilters = ({ onPriorityChange, onSourceChange }: TaskFiltersProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Flag className="h-3.5 w-3.5" />
            Priority
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onPriorityChange("High")}>
              <Badge className="w-4 h-2 bg-red-500 mr-2" />
              High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityChange("Medium")}>
              <Badge className="w-4 h-2 bg-amber-500 mr-2" />
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityChange("Normal")}>
              <Badge className="w-4 h-2 bg-blue-500 mr-2" />
              Normal
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onPriorityChange(null)}>
              Clear filter
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Due Date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Filter by due date</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Clock className="mr-2 h-4 w-4" />
              Due today
            </DropdownMenuItem>
            <DropdownMenuItem>
              Due this week
            </DropdownMenuItem>
            <DropdownMenuItem>
              Overdue
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Clear filter
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Bot className="h-3.5 w-3.5" />
            Source
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Filter by source</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onSourceChange("P²RA AI")}>
              <Bot className="mr-2 h-4 w-4" />
              P²RA AI
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSourceChange("Manual")}>
              <User className="mr-2 h-4 w-4" />
              Manual
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSourceChange("Automation")}>
              <FileCog className="mr-2 h-4 w-4" />
              Automation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSourceChange("Email")}>
              <MailIcon className="mr-2 h-4 w-4" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSourceChange("WhatsApp")}>
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSourceChange(null)}>
              Clear filter
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TaskFilters;
