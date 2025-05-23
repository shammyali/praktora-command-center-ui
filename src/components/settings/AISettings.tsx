
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuitIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AISettings = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState([75]);
  const [autoExecuteDelay, setAutoExecuteDelay] = useState(24);
  const [suggestionLogging, setSuggestionLogging] = useState(true);

  const handleSave = () => {
    // Save settings logic
    console.log({
      aiEnabled,
      confidenceThreshold,
      autoExecuteDelay,
      suggestionLogging
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <BrainCircuitIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>P²RA AI Behavior</CardTitle>
        </div>
        <CardDescription>Configure how P²RA AI makes decisions and suggests actions across the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="ai-toggle" className="text-base font-medium">Master AI Toggle</Label>
            <p className="text-sm text-muted-foreground">Enable or disable all AI suggestions across the app</p>
          </div>
          <Switch 
            id="ai-toggle" 
            checked={aiEnabled} 
            onCheckedChange={setAiEnabled}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="confidence-threshold" className="text-base font-medium">
              Confidence Threshold: {confidenceThreshold}%
            </Label>
          </div>
          <Slider
            id="confidence-threshold"
            min={50}
            max={100}
            step={1}
            value={confidenceThreshold}
            onValueChange={setConfidenceThreshold}
            disabled={!aiEnabled}
          />
          <p className="text-sm text-muted-foreground">
            Only show AI suggestions with confidence above this threshold
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-execute" className="text-base font-medium">Auto-Execute Delay (hours)</Label>
            <p className="text-sm text-muted-foreground">Time before unacknowledged AI actions are executed</p>
          </div>
          <Input 
            id="auto-execute"
            type="number"
            value={autoExecuteDelay}
            onChange={(e) => setAutoExecuteDelay(parseInt(e.target.value))}
            className="w-20"
            min={1}
            disabled={!aiEnabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Label htmlFor="suggestion-logging" className="text-base font-medium">Suggestion Logging</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help text-muted-foreground text-sm">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Log all accepted/ignored/overridden suggestions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground">Record and track all AI suggestion outcomes</p>
          </div>
          <Switch 
            id="suggestion-logging"
            checked={suggestionLogging}
            onCheckedChange={setSuggestionLogging}
            disabled={!aiEnabled}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save AI Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISettings;
