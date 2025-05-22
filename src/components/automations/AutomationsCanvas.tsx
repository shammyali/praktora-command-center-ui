
import { useState } from "react";
import { triggers, actions, conditionFields } from "@/data/automationsData";
import AutomationsTriggerPanel from "./AutomationsTriggerPanel";
import AutomationsConditionPanel from "./AutomationsConditionPanel";
import AutomationsActionPanel from "./AutomationsActionPanel";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, Save } from "lucide-react";

const AutomationsCanvas = () => {
  const [automationName, setAutomationName] = useState("New Automation");
  const [isActive, setIsActive] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<any[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const handleSaveAutomation = () => {
    if (!selectedTrigger) {
      toast.error("Please select a trigger first");
      return;
    }

    if (selectedActions.length === 0) {
      toast.error("Please select at least one action");
      return;
    }

    toast.success("Automation saved successfully", {
      description: "Your automation is now ready to run based on the defined triggers and conditions."
    });
  };

  const handleTestAutomation = () => {
    if (!selectedTrigger) {
      toast.error("Please select a trigger first");
      return;
    }

    if (selectedActions.length === 0) {
      toast.error("Please select at least one action");
      return;
    }

    toast.info("Testing automation", {
      description: "This rule would apply to 8 quotes today."
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div>
            <Label htmlFor="automation-name" className="sr-only">Automation Name</Label>
            <Input
              id="automation-name"
              value={automationName}
              onChange={(e) => setAutomationName(e.target.value)}
              className="h-8 font-medium border-none focus-visible:ring-0 p-0 text-lg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="automation-active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="automation-active">Active</Label>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleTestAutomation}>
            Test Rule
          </Button>
          <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/90" onClick={handleSaveAutomation}>
            <Save className="h-4 w-4 mr-2" /> Save Automation
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <AutomationsTriggerPanel 
          selectedTrigger={selectedTrigger} 
          onSelectTrigger={setSelectedTrigger} 
        />
        <AutomationsConditionPanel 
          conditions={selectedConditions}
          onConditionsChange={setSelectedConditions}
        />
        <AutomationsActionPanel 
          selectedActions={selectedActions} 
          onActionsChange={setSelectedActions} 
        />
      </div>
    </div>
  );
};

export default AutomationsCanvas;
