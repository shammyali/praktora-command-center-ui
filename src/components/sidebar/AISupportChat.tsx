
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SparklesIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AISupportChat = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: query}]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (query.toLowerCase().includes("endorsement")) {
        response = "To create an endorsement, go to the policy details page and click the 'New Endorsement' button in the top right corner.";
      } else if (query.toLowerCase().includes("upload") || query.toLowerCase().includes("id")) {
        response = "Yes, you can upload a scanned Emirates ID. Go to 'Policyholders', select the customer, then click 'Documents' tab and use the upload function.";
      } else if (query.toLowerCase().includes("invoice") || query.toLowerCase().includes("invoices")) {
        response = "Pending invoices can be found under 'Finance' > 'Accounts Receivable' > 'Pending Invoices' section.";
      } else {
        response = "I don't have specific information about that. Would you like me to log a support request for you?";
      }
      
      setMessages(prev => [...prev, {type: 'ai', content: response}]);
      toast({
        title: "P²RA Assistant",
        description: "New response received",
        variant: "default",
      });
    }, 1000);
    
    setQuery("");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-praktora-burgundy">P²RA Assistant</h3>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-600">Active</span>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md h-60 overflow-y-auto p-2 flex flex-col gap-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-auto text-xs">
            <SparklesIcon className="h-6 w-6 mx-auto mb-2 text-praktora-burgundy opacity-50" />
            <p>Ask P²RA anything about the platform.</p>
            <p className="text-xs text-gray-400 mt-1">Try: "How do I create an endorsement?"</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={cn(
              "rounded-lg p-2 max-w-[80%] text-sm",
              msg.type === 'user' 
                ? "bg-gray-100 ml-auto" 
                : "bg-praktora-burgundy/10 mr-auto"
            )}>
              {msg.content}
            </div>
          ))
        )}
      </div>
      
      <div className="flex gap-2">
        <Input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask P²RA..."
          className="text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button 
          size="sm"
          onClick={handleSendMessage}
          className="bg-praktora-burgundy hover:bg-praktora-burgundy/80"
          disabled={!query.trim()}
        >
          Ask
        </Button>
      </div>
    </div>
  );
};

export default AISupportChat;
