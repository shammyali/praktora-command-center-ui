
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import CommandSuggestion from "./CommandSuggestion";

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
    <Card className="shadow-md h-[250px] border-[#9C2D55]/20 flex flex-col">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">P²RA Command Console</h3>
          <span className={`text-xs ${characterCount > 1900 ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/2000
          </span>
        </div>
        <Separator className="my-3" />
        
        <div className="flex gap-2 mb-3 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CommandSuggestion 
                    text="Upload Emirates ID and generate new enquiry" 
                    onClick={() => onSuggestionClick("Upload Emirates ID and generate new enquiry")}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Scan and auto-extract customer details from Emirates ID</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CommandSuggestion 
                    text="Convert quote MP2396 to policy and issue invoice" 
                    onClick={() => onSuggestionClick("Convert quote MP2396 to policy and issue invoice")}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically convert an existing quote to policy and generate invoice</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CommandSuggestion 
                    text="Send WhatsApp quote to Ali Qamar" 
                    onClick={() => onSuggestionClick("Send WhatsApp quote to Ali Qamar")}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send quote details via WhatsApp to the customer</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CommandSuggestion 
                    text="List all unpaid invoices over 30 days" 
                    onClick={() => onSuggestionClick("List all unpaid invoices over 30 days")}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>View all outstanding invoices that are overdue by 30+ days</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Textarea 
          placeholder="Ask any question about clients, policies, or market trends..." 
          className="min-h-24 flex-grow resize-none focus-visible:ring-0 border-none bg-transparent"
          value={command}
          onChange={onCommandChange}
          maxLength={2000}
        />
        <div className="flex items-center justify-between mt-4 pt-2">
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
