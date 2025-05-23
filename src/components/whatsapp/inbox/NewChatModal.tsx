
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { praktoraWebApi, Customer } from "@/services/api/praktoraWebApi";
import { Search, Loader2, UserRound, Phone } from "lucide-react";
import { WhatsAppConversation } from "@/data/whatsapp/types";
import { toast } from "sonner";

interface NewChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartNewChat: (phoneNumber: string, name?: string) => void;
  existingConversations: WhatsAppConversation[];
}

export default function NewChatModal({ 
  open, 
  onOpenChange,
  onStartNewChat,
  existingConversations
}: NewChatModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [directNumber, setDirectNumber] = useState("");
  
  // Handle search for existing customers
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await praktoraWebApi.searchCustomers({
        query: searchQuery,
        searchType: "name",
        page: 1,
        limit: 10
      });
      
      setSearchResults(response.customers);
    } catch (error) {
      console.error("Error searching customers:", error);
      toast.error("Failed to search customers");
    } finally {
      setIsSearching(false);
    }
  };
  
  // Start chat with selected customer
  const startChatWithCustomer = (customer: Customer) => {
    if (!customer.mobile) {
      toast.error("Selected customer doesn't have a mobile number");
      return;
    }
    
    onStartNewChat(customer.mobile, customer.fullName);
    onOpenChange(false);
  };
  
  // Start chat with manually entered number
  const startDirectChat = () => {
    if (!directNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    onStartNewChat(directNumber);
    setDirectNumber("");
    onOpenChange(false);
  };

  // Check if a number already exists in conversations
  const checkExistingConversation = (phoneNumber: string): boolean => {
    return existingConversations.some(conv => 
      conv.contact.phoneNumber.replace(/\s+/g, "").includes(phoneNumber.replace(/\s+/g, ""))
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New chat</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {/* Search existing customers */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Find customer</div>
            <div className="flex gap-2">
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="border rounded-md max-h-60 overflow-y-auto">
                {searchResults.map((customer) => (
                  <button
                    key={customer.id}
                    className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 text-left"
                    onClick={() => startChatWithCustomer(customer)}
                  >
                    <div className="bg-gray-100 rounded-full p-2">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{customer.fullName}</div>
                      <div className="text-xs text-gray-500 truncate">{customer.mobile}</div>
                    </div>
                    {customer.mobile && checkExistingConversation(customer.mobile) && (
                      <span className="text-xs bg-gray-100 rounded px-2 py-1">Existing chat</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>
          
          {/* Direct message to number */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Message a new number</div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="+971 50 123 4567"
                  value={directNumber}
                  onChange={(e) => setDirectNumber(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && startDirectChat()}
                />
              </div>
              <Button onClick={startDirectChat}>Start chat</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
