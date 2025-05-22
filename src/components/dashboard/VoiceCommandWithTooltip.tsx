
import { useState } from "react";
import VoiceCommand from "./VoiceCommand";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface VoiceCommandWithTooltipProps {
  onCommand: (command: string) => void;
}

const VoiceCommandWithTooltip = ({ onCommand }: VoiceCommandWithTooltipProps) => {
  const sampleCommands = [
    "Summarize the last 2 hours",
    "List quotes over AED 25,000",
    "Who hasn't closed any quotes this week?",
    "Show all high priority workflows",
    "What's the status of claim CL-2023-001?",
    "How many policies are awaiting renewal?"
  ];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span>
          <VoiceCommand onCommand={onCommand} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-3">
          <h4 className="font-medium mb-2">Sample Voice Commands:</h4>
          <ul className="space-y-2">
            {sampleCommands.map((cmd, index) => (
              <li key={index} className="text-sm flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-praktora-burgundy mr-2"></span>
                {cmd}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VoiceCommandWithTooltip;
