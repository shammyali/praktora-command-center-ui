
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Beaker, FileText, TrendingUp, History, LogOut } from "lucide-react";

const UtilitiesSection = () => {
  return (
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
          <Beaker className="h-3.5 w-3.5 mr-1.5" />
          Automations Lab
        </Button>
        <Button variant="ghost" size="sm" className="h-8 justify-start text-xs">
          <FileText className="h-3.5 w-3.5 mr-1.5" />
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
  );
};

export default UtilitiesSection;
