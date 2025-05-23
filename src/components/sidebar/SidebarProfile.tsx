
import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleDashed, ListFilter, MessageSquareQuote, History, SwitchCamera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SidebarProfile = () => {
  const [aiConnected, setAiConnected] = useState(true);
  
  return (
    <div className="mt-auto border-t border-gray-200 p-4">
      <Sheet>
        <SheetTrigger className="w-full">
          <div className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded-md transition-colors">
            <div className="relative">
              <Avatar className="h-10 w-10 bg-praktora-burgundy text-white border-2 border-white shadow-sm">
                <AvatarImage src="/lovable-uploads/8631928b-0cb8-4709-ae6b-3b209802c5a2.png" alt="Shammy Ali" />
                <AvatarFallback className="font-medium">SA</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${aiConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                {aiConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              </div>
            </div>
            
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Shammy Ali</span>
                <Badge variant="outline" className="text-[10px] py-0 px-1 h-4 bg-praktora-burgundy/10 text-praktora-burgundy">Command Node</Badge>
              </div>
              <span className="text-[10px] text-gray-500">Executing within Command Layer</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">P²RA Node: You</span>
            </div>
          </div>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-[360px] p-4 sm:p-6">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="text-praktora-burgundy">P²RA Node: You</SheetTitle>
            <p className="text-xs text-muted-foreground">
              You are the executing signature inside the intelligence layer.
            </p>
          </SheetHeader>
          
          <div className="space-y-6">
            {/* User Identity Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-praktora-burgundy" />
                My Identity
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 bg-praktora-burgundy text-white border-2 border-white shadow">
                    <AvatarImage src="/lovable-uploads/8631928b-0cb8-4709-ae6b-3b209802c5a2.png" alt="Shammy Ali" />
                    <AvatarFallback className="font-medium text-lg">SA</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium">Shammy Ali</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs py-0 bg-praktora-burgundy/10 text-praktora-burgundy">Command Node</Badge>
                      <span className="text-xs text-muted-foreground">ID: AG-2025-114</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">shammy.ali@praktora.com</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded border">
                    <span className="text-muted-foreground">Mistral Usage</span>
                    <p className="font-medium">78% of allocation</p>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <span className="text-muted-foreground">Last Login</span>
                    <p className="font-medium">1h 47m ago</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Workflow and Stats Sections */}
            <div className="space-y-4">
              <button className="flex items-center gap-2 text-sm w-full bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <ListFilter className="h-4 w-4 text-praktora-burgundy" />
                <span className="font-medium">My Active Workflows</span>
                <Badge className="ml-auto bg-praktora-burgundy">4</Badge>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <Card className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquareQuote className="h-4 w-4 text-praktora-burgundy" />
                      <span className="text-xs font-medium">My Quotes</span>
                    </div>
                    <p className="text-lg font-semibold">7</p>
                    <span className="text-xs text-muted-foreground">+2 this week</span>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CircleDashed className="h-4 w-4 text-praktora-burgundy" />
                      <span className="text-xs font-medium">Claims</span>
                    </div>
                    <p className="text-lg font-semibold">2</p>
                    <span className="text-xs text-muted-foreground">This week</span>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Separator />
            
            {/* AI Log Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <History className="h-4 w-4 text-praktora-burgundy" />
                My AI Log
              </h3>
              
              <div className="space-y-2 text-xs">
                {[
                  "P²RA claimed risk assessment for policy #B2744",
                  "Automated premium calculation for S. Rodriguez",
                  "AI scheduled follow-up call with C. Levine",
                  "Document validation complete for Lopez renewal",
                  "Claim eligibility pre-check for H. Singh"
                ].map((action, i) => (
                  <div key={i} className="bg-gray-50 p-2 rounded flex items-start">
                    <span className="text-gray-400 mr-2">{5-i}.</span>
                    <p>{action}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Metrics Section */}
            <div>
              <h3 className="text-sm font-medium mb-3">Internal Metrics</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-2 rounded-lg text-xs">
                  <span className="text-muted-foreground">AI Actions</span>
                  <p className="font-medium">19 this week</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-xs">
                  <span className="text-muted-foreground">Manual Overrides</span>
                  <p className="font-medium">3</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-xs">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <p className="font-medium">41</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-xs">
                  <span className="text-muted-foreground">SLA Breaches</span>
                  <p className="font-medium">0 this month</p>
                </div>
              </div>
            </div>
            
            {/* Switch Node Button */}
            <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors mt-4">
              <SwitchCamera className="h-4 w-4" />
              Switch Node
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarProfile;
