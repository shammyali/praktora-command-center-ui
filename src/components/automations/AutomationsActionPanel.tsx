
import { useState } from "react";
import { actions } from "@/data/automationsData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Settings, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AutomationsActionPanelProps {
  selectedActions: string[];
  onActionsChange: (actionIds: string[]) => void;
}

const AutomationsActionPanel = ({ selectedActions, onActionsChange }: AutomationsActionPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionToConfig, setActionToConfig] = useState<string | null>(null);
  
  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectAction = (actionId: string) => {
    if (selectedActions.includes(actionId)) {
      onActionsChange(selectedActions.filter(id => id !== actionId));
    } else {
      onActionsChange([...selectedActions, actionId]);
    }
  };
  
  const getActionById = (id: string) => {
    return actions.find(action => action.id === id);
  };

  return (
    <div className="w-1/3 p-4 overflow-y-auto">
      <h3 className="text-lg font-medium mb-3">Actions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select one or more actions to be performed when triggered
      </p>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search actions..." 
          className="pl-8 h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {selectedActions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-sm mb-2">Selected Actions</h4>
          <div className="space-y-2">
            {selectedActions.map(actionId => {
              const action = getActionById(actionId);
              return action ? (
                <div key={actionId} className="flex items-center justify-between p-3 rounded-md bg-praktora-burgundy/5 border border-praktora-burgundy/20">
                  <div>
                    <div className="font-medium">{action.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-praktora-burgundy" onClick={() => setActionToConfig(actionId)}>
                        <Settings className="h-4 w-4 mr-1" /> Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Configure {action.name}</DialogTitle>
                        <DialogDescription>
                          Customize how this action will be performed
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-4">
                        {/* Action specific configuration would go here */}
                        <p className="text-sm text-muted-foreground">
                          Configure the parameters for this action to customize its behavior when triggered.
                        </p>
                        
                        {action.id === "send_whatsapp" && (
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="text-sm font-medium">Message Template</label>
                              <textarea 
                                className="w-full mt-1 p-2 border rounded-md h-24"
                                placeholder="Enter your WhatsApp message template..."
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Delay (hours)</label>
                              <Input type="number" defaultValue={0} className="mt-1" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <DialogFooter>
                        <Button>Save Configuration</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {filteredActions.map((action) => {
          const isSelected = selectedActions.includes(action.id);
          return (
            <div
              key={action.id}
              className={`p-3 rounded-md border-2 cursor-pointer transition-colors ${
                isSelected
                  ? "border-praktora-burgundy bg-praktora-burgundy/5"
                  : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => handleSelectAction(action.id)}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{action.name}</div>
                {isSelected ? (
                  <Button variant="ghost" size="sm" className="text-praktora-burgundy h-6">
                    Remove
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="text-praktora-burgundy h-6">
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {action.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomationsActionPanel;
