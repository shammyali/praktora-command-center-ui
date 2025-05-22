
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, SparklesIcon } from "lucide-react";

const AskPRA = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]);

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
    }, 1000);
    
    setQuery("");
  };

  return (
    <Card className="border border-praktora-burgundy/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-praktora-burgundy" />
            Ask P²RA Assistant
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-green-600">Active</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white border border-gray-200 rounded-md h-60 overflow-y-auto p-2 flex flex-col gap-2 mb-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-auto text-xs">
              <SparklesIcon className="h-6 w-6 mx-auto mb-2 text-praktora-burgundy opacity-50" />
              <p>Ask P²RA anything about the platform.</p>
              <p className="text-xs text-gray-400 mt-1">Try: "How do I create an endorsement?"</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`rounded-lg p-2 max-w-[80%] text-sm ${
                msg.type === 'user' 
                  ? "bg-gray-100 ml-auto" 
                  : "bg-praktora-burgundy/10 mr-auto"
              }`}>
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
      </CardContent>
    </Card>
  );
};

export default AskPRA;
