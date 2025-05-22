
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Users, Clock, CheckCircle } from "lucide-react";

interface AgentPerformanceProps {
  agentName: string;
  activeWorkflows: number;
  delayedWorkflows: number;
  recentlyClosed: number;
  children: React.ReactNode;
}

const AgentPerformanceTooltip = ({
  agentName,
  activeWorkflows,
  delayedWorkflows,
  recentlyClosed,
  children,
}: AgentPerformanceProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-help underline decoration-dotted underline-offset-2">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-3" side="right">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{agentName} Performance</h4>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs">
              {activeWorkflows} active workflows
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs">
              {delayedWorkflows} delayed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            <span className="text-xs">
              {recentlyClosed} closed yesterday
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AgentPerformanceTooltip;
