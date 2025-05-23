
import { useState } from "react";
import { Search, Filter, Paperclip, Circle, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  WhatsAppConversation, 
  ConversationType, 
  ConversationStatus 
} from "@/data/whatsapp/types";
import { cn } from "@/lib/utils";

interface WhatsAppInboxProps {
  conversations: WhatsAppConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function WhatsAppInbox({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: WhatsAppInboxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ConversationType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ConversationStatus | "All">("All");

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.contact.phoneNumber.includes(searchQuery);
    
    const matchesType = typeFilter === "All" || conversation.type === typeFilter;
    const matchesStatus = statusFilter === "All" || conversation.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Function to format timestamp as relative time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Function to get badge color based on conversation type
  const getTypeBadgeColor = (type: ConversationType) => {
    switch (type) {
      case "New Business":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Claim":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Renewal":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Function to get badge color based on conversation status
  const getStatusBadgeColor = (status: ConversationStatus) => {
    switch (status) {
      case "Unlinked":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Actioned":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Resolved":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value as any)}
            >
              <SelectTrigger className="h-8 text-xs w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="New Business">New Business</SelectItem>
                <SelectItem value="Claim">Claim</SelectItem>
                <SelectItem value="Renewal">Renewal</SelectItem>
                <SelectItem value="Unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as any)}
            >
              <SelectTrigger className="h-8 text-xs w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Unlinked">Unlinked</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Actioned">Actioned</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">More filters</span>
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1">
        <div className="space-y-0.5">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={cn(
                "w-full p-3 text-left hover:bg-gray-100 transition-colors",
                selectedConversationId === conversation.id && "bg-gray-100"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {conversation.contact.avatar ? (
                      <img 
                        src={conversation.contact.avatar} 
                        alt={conversation.contact.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {conversation.contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-praktora-burgundy text-white text-[10px] flex items-center justify-center font-medium">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-sm truncate">
                      {conversation.contact.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 truncate mt-0.5">
                    {conversation.lastMessage.content}
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Badge className={cn("text-[10px] px-1.5 py-0", getTypeBadgeColor(conversation.type))}>
                      {conversation.type}
                    </Badge>
                    
                    <Badge className={cn("text-[10px] px-1.5 py-0", getStatusBadgeColor(conversation.status))}>
                      {conversation.status}
                    </Badge>
                    
                    <div className="flex ml-auto gap-1">
                      {conversation.hasAttachments && (
                        <Paperclip className="h-3 w-3 text-gray-400" />
                      )}
                      {conversation.unreadCount > 0 && (
                        <Circle className="h-3 w-3 fill-praktora-burgundy text-praktora-burgundy" />
                      )}
                      {conversation.hasWorkflowLinks && (
                        <Link className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
