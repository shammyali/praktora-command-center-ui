
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Lock, SwitchCamera, Moon, Bell, Clock } from "lucide-react";

interface ControlsSectionProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
}

const ControlsSection = ({
  darkMode,
  setDarkMode,
  notifications,
  setNotifications,
}: ControlsSectionProps) => {
  return (
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
  );
};

export default ControlsSection;
