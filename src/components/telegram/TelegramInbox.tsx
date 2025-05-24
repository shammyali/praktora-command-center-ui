
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TelegramChat } from "@/data/telegramData";
import { Bot, User } from "lucide-react";

interface TelegramInboxProps {
  chats: TelegramChat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  searchQuery?: string;
  filterSource?: "Bot" | "Human" | "All";
  filterType?: string;
}

export default function TelegramInbox({ 
  chats, 
  selectedChatId, 
  onSelectChat,
  searchQuery = "", 
  filterSource = "All",
  filterType = "All"
}: TelegramInboxProps) {
  
  // Filter chats based on filters
  const filteredChats = chats.filter(chat => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        chat.contact.name.toLowerCase().includes(query) ||
        chat.contact.username.toLowerCase().includes(query) ||
        chat.lastMessage.content.toLowerCase().includes(query)
      );
    }
    
    // Apply source filter
    if (filterSource !== "All" && chat.source !== filterSource) {
      return false;
    }
    
    // Apply type filter
    if (filterType !== "All" && chat.type !== filterType) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-muted p-3 border-b">
        <h3 className="font-medium">Telegram Conversations</h3>
        <p className="text-xs text-muted-foreground">
          {filteredChats.length} {filterSource !== "All" ? filterSource : ""} conversations
        </p>
      </div>
      
      {filteredChats.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-4">
          <Bot className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No conversations found</p>
        </div>
      ) : (
        <div className="overflow-y-auto flex-1">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "p-3 border-b cursor-pointer hover:bg-muted transition-colors",
                selectedChatId === chat.id && "bg-muted"
              )}
            >
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      {chat.contact.avatar ? (
                        <img 
                          src={chat.contact.avatar} 
                          alt={chat.contact.name}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                          {chat.contact.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {/* Source indicator (Bot or Human) */}
                    <div 
                      className={cn(
                        "absolute -bottom-1 -right-1 rounded-full p-0.5",
                        chat.source === "Bot" ? "bg-blue-100" : "bg-green-100"
                      )}
                    >
                      {chat.source === "Bot" ? (
                        <Bot className="h-3.5 w-3.5 text-blue-600" />
                      ) : (
                        <User className="h-3.5 w-3.5 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      {chat.unreadCount > 0 && (
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                      <span className="line-clamp-1">{chat.contact.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {chat.contact.username}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {/* Simple time formatting - in a real app use a proper formatter */}
                  {chat.ageInMinutes < 60 
                    ? `${chat.ageInMinutes}m ago` 
                    : `${Math.floor(chat.ageInMinutes / 60)}h ago`
                  }
                </div>
              </div>
              
              <div className="text-sm mb-2 line-clamp-1">
                {chat.lastMessage.type === "command" && (
                  <span className="font-mono text-xs bg-gray-100 px-1 rounded mr-1">
                    {chat.lastMessage.content}
                  </span>
                )}
                {chat.lastMessage.type === "button" && (
                  <span className="text-blue-600">
                    {chat.lastMessage.content}
                  </span>
                )}
                {chat.lastMessage.type === "form" && (
                  <span className="text-green-600">
                    {chat.lastMessage.content}
                  </span>
                )}
                {chat.lastMessage.type === "text" && chat.lastMessage.content}
                {chat.lastMessage.type === "image" && "📷 Image"}
                {chat.lastMessage.type === "document" && "📄 Document"}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {/* Type badge */}
                  <Badge className={cn(
                    "text-xs",
                    chat.type === "New Business" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                    chat.type === "FNOL" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                    chat.type === "Complaint" && "bg-red-100 text-red-800 hover:bg-red-100",
                    chat.type === "Renewal" && "bg-green-100 text-green-800 hover:bg-green-100",
                    chat.type === "Unknown" && "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  )}>
                    {chat.type}
                  </Badge>
                </div>
                
                {/* Status badge */}
                <Badge className={cn(
                  "text-xs",
                  chat.status === "Unlinked" && "bg-red-100 text-red-800 hover:bg-red-100",
                  chat.status === "In Progress" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                  chat.status === "Actioned" && "bg-green-100 text-green-800 hover:bg-green-100"
                )}>
                  {chat.status}
                </Badge>
              </div>
              
              {chat.dataQualityScore && (
                <div className="mt-2 flex items-center">
                  <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        chat.dataQualityScore >= 80 ? "bg-green-500" : 
                        chat.dataQualityScore >= 50 ? "bg-amber-500" : "bg-red-500"
                      )}
                      style={{ width: `${chat.dataQualityScore}%` }}
                    ></div>
                  </div>
                  <span className="text-xs ml-2 text-muted-foreground">
                    {chat.dataQualityScore}% data quality
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
