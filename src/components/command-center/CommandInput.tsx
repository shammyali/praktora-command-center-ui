
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

interface CommandInputProps {
  command: string;
  characterCount: number;
  isLoading: boolean;
  onCommandChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  executeCommand: () => void;
}

const CommandInput = ({
  command,
  characterCount,
  isLoading,
  onCommandChange,
  onSuggestionClick,
  executeCommand
}: CommandInputProps) => {
  return (
    <Card className="shadow-md h-[180px] border-[#9C2D55]/20 flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">P²RA Command Console</h3>
          <span className={`text-xs ${characterCount > 1900 ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/2000
          </span>
        </div>
        <Separator className="my-2" />
        
        <Textarea 
          placeholder="Ask any question about clients, policies, or market trends..." 
          className="min-h-16 flex-grow resize-none focus-visible:ring-0 border-none bg-transparent"
          value={command}
          onChange={onCommandChange}
          maxLength={2000}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Attach</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload documents or images to include with your query</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Templates</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Access saved command templates for common tasks</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                className="bg-[#9C2D55] hover:bg-[#9C2D55]/90 text-white whitespace-nowrap"
                onClick={executeCommand}
                disabled={isLoading || !command.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Execute Command"
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Process your query and provide intelligent assistance</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandInput;
