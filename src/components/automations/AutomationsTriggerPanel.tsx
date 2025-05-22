
import { useState } from "react";
import { triggers } from "@/data/automationsData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AutomationsTriggerPanelProps {
  selectedTrigger: string | null;
  onSelectTrigger: (triggerId: string) => void;
}

const AutomationsTriggerPanel = ({ selectedTrigger, onSelectTrigger }: AutomationsTriggerPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTriggers = triggers.filter(trigger => 
    trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trigger.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/3 border-r p-4 overflow-y-auto">
      <h3 className="text-lg font-medium mb-3">Triggers</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select an event that will start this automation
      </p>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search triggers..." 
          className="pl-8 h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filteredTriggers.map((trigger) => (
          <div
            key={trigger.id}
            className={`p-3 rounded-md border-2 cursor-pointer transition-colors ${
              selectedTrigger === trigger.id
                ? "border-praktora-burgundy bg-praktora-burgundy/5"
                : "border-transparent hover:bg-gray-50"
            }`}
            onClick={() => onSelectTrigger(trigger.id)}
          >
            <div className="font-medium">{trigger.name}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {trigger.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationsTriggerPanel;
