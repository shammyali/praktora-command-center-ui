
import { Check, ChevronDown, ExternalLink, MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WhatsAppConversation, ConversationStatus } from "@/data/whatsAppData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SmartActionSidebarProps {
  conversation: WhatsAppConversation | null;
}

export default function SmartActionSidebar({
  conversation
}: SmartActionSidebarProps) {
  if (!conversation) {
    return (
      <div className="p-4 flex flex-col h-full justify-center items-center text-gray-500">
        <p className="text-sm">Select a conversation to see AI recommendations</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <div className="mt-2">
            <Select defaultValue={conversation.status}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Unlinked">Unlinked</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Actioned">Actioned</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">P²RA Suggested Action</h3>
          <Card className="mt-2 border-praktora-burgundy/10 bg-praktora-burgundy/5">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-sm flex items-center gap-1 text-praktora-burgundy">
                <PlusCircle className="h-3 w-3" />
                <span>{conversation.aiSuggestion || "Link to existing customer"}</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Based on message content and attachments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-2">
              <Button size="sm" variant="default" className="w-full bg-praktora-burgundy hover:bg-praktora-burgundy/90 text-xs h-8">
                Execute Suggested Action
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Quick Actions</h3>
          <div className="grid gap-2 mt-2">
            <Button variant="outline" size="sm" className="justify-start text-xs h-8">
              <Check className="mr-2 h-3.5 w-3.5" />
              Mark as Actioned
            </Button>
            
            <Button variant="outline" size="sm" className="justify-between text-xs h-8">
              <div className="flex items-center">
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                Link to Workflow
              </div>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start text-xs h-8">
              <MessageSquare className="mr-2 h-3.5 w-3.5" />
              Send Follow-Up Message
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Message Templates</h3>
          <div className="grid gap-2 mt-2">
            <Button variant="outline" size="sm" className="justify-start text-xs text-left h-auto py-2">
              <span className="truncate">
                Thank you for sending your documents. We'll process your request and get back to you shortly.
              </span>
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start text-xs text-left h-auto py-2">
              <span className="truncate">
                Your claim has been registered. Reference number: {conversation.id}
              </span>
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start text-xs text-left h-auto py-2">
              <span className="truncate">
                I've attached your insurance quote for review. Please let me know if you have any questions.
              </span>
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Customer Notes</h3>
          <p className="text-xs text-gray-600 mt-2">
            {conversation.contact.name} has been a customer since 2021. Prefers WhatsApp communication. Currently has 3 active policies.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}
