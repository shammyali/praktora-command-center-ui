
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { 
  Lock, 
  SwitchCamera, 
  Moon, 
  Bell, 
  Clock, 
  LogOut, 
  Settings, 
  Flask, 
  FileExport, 
  TrendingUp, 
  History
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CommandIdentityTrigger = () => {
  const [isNodeConnected, setIsNodeConnected] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const sessionTime = "01h 42m active";
  const ipAddress = "192.168.1.X";
  const geoLocation = "DXB Server";
  
  const aiSuggestion = "Drafted renewal quote for MI002 @ 13:41";
  const aiAcceptanceRate = "87%";
  const overrideCount = 2;
  
  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9 p-0">
                <Avatar className="h-9 w-9 border-2 border-white/10 shadow-lg bg-praktora-burgundy">
                  <AvatarImage src="/lovable-uploads/ebc38715-372d-4cc1-b293-cb0855312520.png" alt="Shammy Ali" />
                  <AvatarFallback className="bg-praktora-burgundy text-white text-xs font-medium">SA</AvatarFallback>
                </Avatar>
                <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${isNodeConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                  {isNodeConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                </span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-xs space-y-1">
              <p className="font-medium">P²RA Command Node: You</p>
              <p className="text-muted-foreground">Tap for session controls and identity diagnostics</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <PopoverContent className="w-80 p-0 backdrop-blur-md bg-white/90 border border-gray-200/50 shadow-lg rounded-lg overflow-hidden" align="end">
          <div className="grid grid-cols-1 divide-y divide-gray-100/50">
            {/* Section 1: Active Identity */}
            <div className="p-4 bg-gradient-to-r from-praktora-burgundy/10 to-transparent">
              <h3 className="text-sm font-semibold text-praktora-burgundy mb-1 flex items-center gap-1.5">
                <span className="bg-praktora-burgundy/20 w-5 h-5 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-praktora-burgundy animate-pulse"></span>
                </span>
                Node Control Deck — P²RA Operator Interface
              </h3>
              
              <div className="flex items-center gap-3 mt-3">
                <Avatar className="h-12 w-12 border-2 border-white shadow-md bg-praktora-burgundy">
                  <AvatarImage src="/lovable-uploads/ebc38715-372d-4cc1-b293-cb0855312520.png" alt="Shammy Ali" />
                  <AvatarFallback className="bg-praktora-burgundy text-white">SA</AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col">
                  <h4 className="font-medium text-sm flex items-center">
                    Shammy Ali
                    <Badge className="ml-2 bg-praktora-burgundy/80 text-[10px] py-0.5 px-1.5">Execution Operator</Badge>
                  </h4>
                  
                  <div className="flex items-center gap-1.5 text-xs mt-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600">Live in P²RA Mesh</span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full text-[10px] text-gray-500 mt-1">
                    <span>{sessionTime}</span>
                    <span>•</span>
                    <span>{geoLocation}</span>
                    <span>•</span>
                    <span>{ipAddress}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section 2: Controls & Toggles */}
            <div className="p-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-transparent">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button variant="outline" size="sm" className="h-8 justify-start text-xs">
                  <Lock className="h-3.5 w-3.5 mr-1.5" />
                  Lock Session
                </Button>
                <Button variant="outline" size="sm" className="h-8 justify-start text-xs">
                  <SwitchCamera className="h-3.5 w-3.5 mr-1.5" />
                  Switch Node
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1.5">
                  <Moon className="h-3.5 w-3.5" />
                  Dark Mode
                </span>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                  className="data-[state=checked]:bg-praktora-burgundy" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1.5">
                  <Bell className="h-3.5 w-3.5" />
                  Notifications
                </span>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-praktora-burgundy"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Schedule Downtime
                </span>
                <ToggleGroup type="single" size="sm">
                  <ToggleGroupItem value="15" className="h-6 text-[10px] px-1.5">15m</ToggleGroupItem>
                  <ToggleGroupItem value="30" className="h-6 text-[10px] px-1.5">30m</ToggleGroupItem>
                  <ToggleGroupItem value="60" className="h-6 text-[10px] px-1.5">1h</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            {/* Section 3: System Intelligence Feed */}
            <div className="p-4 bg-gradient-to-br from-blue-50/30 to-transparent">
              <h4 className="text-xs font-medium mb-2 text-praktora-burgundy flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-praktora-burgundy rounded-full"></span>
                System Intelligence Feed
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white/70 rounded border border-gray-100 flex items-start">
                  <div className="flex-1">
                    <span className="block text-[10px] text-gray-500">Last AI Suggestion:</span>
                    <p className="text-xs">{aiSuggestion}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white/70 rounded border border-gray-100">
                    <span className="block text-[10px] text-gray-500">AI Acceptance Rate</span>
                    <p className="text-xs font-medium">{aiAcceptanceRate} this week</p>
                  </div>
                  <div className="p-2 bg-white/70 rounded border border-gray-100">
                    <span className="block text-[10px] text-gray-500">Override Count</span>
                    <p className="text-xs font-medium">{overrideCount} manual decisions</p>
                  </div>
                </div>
                
                <div className="p-2 bg-white/70 rounded border border-gray-100">
                  <span className="block text-[10px] text-gray-500">Node Workload</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs">7 Workflows linked</span>
                    <Badge className="bg-orange-500 text-[9px]">3 High Priority</Badge>
                    <Badge className="bg-red-500 text-[9px]">1 overdue SLA</Badge>
                  </div>
                </div>
                
                <p className="text-[10px] text-center italic text-gray-500 mt-2">
                  "Node operating at optimal decision velocity."
                </p>
              </div>
            </div>
            
            {/* Section 4: Utilities & Admin Access */}
            <div className="p-4 bg-gradient-to-t from-gray-50/50 to-transparent">
              <h4 className="text-xs font-medium mb-2 text-praktora-burgundy flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-praktora-burgundy rounded-full"></span>
                Utilities & Admin Access
              </h4>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <Button variant="ghost" size="sm" className="h-8 justify-start text-xs">
                  <Settings className="h-3.5 w-3.5 mr-1.5" />
                  Global Settings
                </Button>
                <Button variant="ghost" size="sm" className="h-8 justify-start text-xs">
                  <Flask className="h-3.5 w-3.5 mr-1.5" />
                  Automations Lab
                </Button>
                <Button variant="ghost" size="sm" className="h-8 justify-start text-xs">
                  <FileExport className="h-3.5 w-3.5 mr-1.5" />
                  Export My AI Log
                </Button>
                <Button variant="ghost" size="sm" className="h-8 justify-start text-xs">
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                  Funnel Insights
                </Button>
              </div>
              
              <div className="text-[10px] p-2 bg-gray-50/80 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium flex items-center gap-1">
                    <History className="h-3 w-3" />
                    System Changelog
                  </span>
                  <Badge className="bg-gray-200 text-gray-700 text-[8px]">Last 3</Badge>
                </div>
                <ul className="space-y-1 pl-3 list-disc text-gray-600">
                  <li>AI routing algorithm improved (v2.1.4)</li>
                  <li>Added support for voice commands</li>
                  <li>SLA monitoring system updated</li>
                </ul>
              </div>
              
              <Separator className="my-3" />
              
              <Button variant="destructive" size="sm" className="w-full h-8 text-xs">
                <LogOut className="h-3.5 w-3.5 mr-1.5" />
                Logout from P²RA Interface
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default CommandIdentityTrigger;
