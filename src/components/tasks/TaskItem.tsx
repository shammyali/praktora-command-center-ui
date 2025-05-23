
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CalendarClock,
  ChevronDown, 
  ChevronUp,
  Building2,
  PhoneOutgoing,
  FileText,
  Upload,
  MessageCircle,
  Bot,
  Briefcase,
  User,
  MailIcon,
  FileCog
} from "lucide-react";
import { TaskType } from "@/data/tasksData";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface TaskItemProps {
  task: TaskType;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<TaskType["status"]>(task.status);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: TaskType["status"]) => {
    setStatus(newStatus);
    toast({
      title: "Status updated",
      description: `Task "${task.title}" marked as ${newStatus}`,
    });
  };

  const sourceIcon = {
    "Manual": <User className="h-3 w-3" />,
    "Automation": <FileCog className="h-3 w-3" />,
    "P²RA AI": <Bot className="h-3 w-3" />,
    "Email": <MailIcon className="h-3 w-3" />,
    "WhatsApp": <MessageCircle className="h-3 w-3" />
  };

  const taskTypeIcon = {
    "Call": <PhoneOutgoing className="h-4 w-4" />,
    "Document": <FileText className="h-4 w-4" />,
    "Upload": <Upload className="h-4 w-4" />,
    "Follow-up": <Clock className="h-4 w-4" />,
    "Meeting": <CalendarClock className="h-4 w-4" />
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex">
        {/* Priority indicator */}
        <div className={`w-1 h-full ${
          task.priority === 'high' ? 'bg-red-500' : 
          task.priority === 'medium' ? 'bg-amber-500' : 
          'bg-blue-500'
        }`} />
        
        <div className="flex-1">
          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {task.type && taskTypeIcon[task.type as keyof typeof taskTypeIcon]}
                <h3 className="font-medium line-clamp-1">{task.title}</h3>
                {task.isOverdue && (
                  <Badge variant="destructive" className="ml-auto">Overdue</Badge>
                )}
                {task.dueToday && (
                  <Badge className="ml-auto bg-amber-500">Due Today</Badge>
                )}
                {task.recurring && (
                  <Badge variant="outline" className="ml-1">Recurring</Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Due: {task.dueDate}</span>
                </div>
                
                {task.client && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span>{task.client}</span>
                  </div>
                )}
                
                {task.linkedTo && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    <span>Linked to: {task.linkedTo}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  {sourceIcon[task.source as keyof typeof sourceIcon]}
                  <span>Source: {task.source}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>
          
          {expanded && (
            <CardContent className="px-4 pt-0 pb-2 text-sm">
              <div className="border-t pt-2 mt-1 mb-2">
                <p>{task.notes}</p>
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground border-t pt-2">
                <div className="flex justify-between">
                  <span>
                    Created by {task.createdBy} {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                  </span>
                  {task.updatedAt && (
                    <span>
                      Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                    </span>
                  )}
                </div>
                
                {task.source === "P²RA AI" && (
                  <div className="mt-2 p-2 bg-praktora-burgundy/10 rounded text-xs italic">
                    "This task was created by P²RA to ensure workflow continuity."
                  </div>
                )}
              </div>
            </CardContent>
          )}
          
          <CardFooter className="p-2 px-4 gap-x-2 flex flex-row justify-between border-t bg-muted/20">
            <div className="text-xs">
              <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
            </div>
            
            <div className="flex gap-1">
              {status !== "Done" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7" 
                  onClick={() => handleStatusChange("Done")}
                >
                  <CheckSquare className="h-3.5 w-3.5 mr-1" />
                  Complete
                </Button>
              )}
              
              {status !== "In Progress" && status !== "Done" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7"
                  onClick={() => handleStatusChange("In Progress")}
                >
                  Start
                </Button>
              )}
              
              {status === "Done" && (
                <Badge className="bg-green-500 h-7 px-3 flex items-center">
                  <CheckSquare className="h-3.5 w-3.5 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
