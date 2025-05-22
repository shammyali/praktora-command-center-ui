
import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Copy, Flag, CheckIcon, AlertTriangle, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { HistoryEvent } from "@/data/historyData";

interface HistoryEventCardProps {
  event: HistoryEvent;
}

const HistoryEventCard = ({ event }: HistoryEventCardProps) => {
  const [expanded, setExpanded] = useState(false);

  // Format the date
  const formattedDate = format(new Date(event.timestamp), "MMM d, yyyy — h:mm a");

  // Determine the icon based on event type and actor
  const getEventIcon = () => {
    if (event.isAIEvent) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🤖 AI</Badge>;
    } else if (event.isAutomationEvent) {
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">⚙️ Automation</Badge>;
    } else if (event.actor.type === 'User') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">👤 User</Badge>;
    } else if (event.actor.type === 'Client') {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">👥 Client</Badge>;
    } else if (event.eventType === 'Message' || event.channel) {
      return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">💬 Message</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">🧾 Document</Badge>;
    }
  };

  // Determine outcome badge style
  const getOutcomeBadge = () => {
    switch (event.outcome) {
      case 'Executed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckIcon className="h-3 w-3" /> Executed
          </Badge>
        );
      case 'Failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <X className="h-3 w-3" /> Failed
          </Badge>
        );
      case 'Ignored':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Ignored
          </Badge>
        );
      case 'Overridden':
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
            <RotateCw className="h-3 w-3" /> Override
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {event.outcome}
          </Badge>
        );
    }
  };

  const copyEventLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/history?event=${event.id}`);
    toast.success("Event link copied to clipboard");
  };

  const flagEvent = () => {
    toast.success("Event flagged for review");
  };

  // Special styling for AI-driven events
  const isAIEvent = event.actor.type === 'P²RA AI' || event.isAIEvent;

  return (
    <Card className={`mb-3 ${isAIEvent ? 'border-blue-300 shadow-blue-100' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {getEventIcon()}
            <div>
              <p className="text-sm text-gray-500">{formattedDate}</p>
              <p className="font-medium">
                {event.actor.name} 
                <span className="text-gray-500 text-sm ml-1">
                  ({event.actor.type})
                </span>
              </p>
              <p className="mt-1">
                {event.action}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {getOutcomeBadge()}
                <Badge variant="outline">
                  {event.targetEntity.type}: {event.targetEntity.id}
                </Badge>
                {event.channel && (
                  <Badge variant="outline" className="bg-gray-50">
                    {event.channel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyEventLink}
              title="Copy event link"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={flagEvent}
              title="Flag for review"
            >
              <Flag className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(!expanded)}
              title={expanded ? "Show less" : "Show details"}
            >
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4">
            <Separator className="mb-4" />
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Details</h4>
                <p className="mt-1">{event.details}</p>
              </div>
              
              {event.payload && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Payload</h4>
                  <pre className="text-xs bg-gray-50 p-3 rounded mt-1 overflow-auto">
                    {JSON.stringify(event.payload, null, 2)}
                  </pre>
                </div>
              )}
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Event ID: {event.id}</span>
                <span>Event Type: {event.eventType}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryEventCard;
