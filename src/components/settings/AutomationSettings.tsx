
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AutomationSettings = () => {
  const [globalAutomation, setGlobalAutomation] = useState(true);
  const [maxRulesPerClient, setMaxRulesPerClient] = useState(5);
  const [businessHoursOnly, setBusinessHoursOnly] = useState(true);
  const [retryAttempts, setRetryAttempts] = useState("3");
  const [ruleExpiry, setRuleExpiry] = useState(false);
  const [ruleExpiryDays, setRuleExpiryDays] = useState(30);

  const handleSave = () => {
    // Save settings logic
    console.log({
      globalAutomation,
      maxRulesPerClient,
      businessHoursOnly,
      retryAttempts,
      ruleExpiry,
      ruleExpiryDays
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FlaskRoundIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>Automation Engine Settings</CardTitle>
        </div>
        <CardDescription>Configure how the automation engine processes rules and executes actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="global-automation" className="text-base font-medium">Global Automation Toggle</Label>
            <p className="text-sm text-muted-foreground">Enable or disable all automated actions across the system</p>
          </div>
          <Switch 
            id="global-automation" 
            checked={globalAutomation} 
            onCheckedChange={setGlobalAutomation}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="max-rules" className="text-base font-medium">Max Rules per Client (per day)</Label>
            <p className="text-sm text-muted-foreground">Limit the number of automation rules that can be applied to a client daily</p>
          </div>
          <Input 
            id="max-rules"
            type="number"
            value={maxRulesPerClient}
            onChange={(e) => setMaxRulesPerClient(parseInt(e.target.value))}
            className="w-20"
            min={1}
            disabled={!globalAutomation}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="business-hours" className="text-base font-medium">Business Hours Restriction</Label>
            <p className="text-sm text-muted-foreground">Only run automations during defined business hours</p>
          </div>
          <Switch 
            id="business-hours"
            checked={businessHoursOnly}
            onCheckedChange={setBusinessHoursOnly}
            disabled={!globalAutomation}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="retry-settings" className="text-base font-medium">Retry Settings</Label>
            <p className="text-sm text-muted-foreground">Number of retry attempts if an automated action fails</p>
          </div>
          <Select
            value={retryAttempts}
            onValueChange={setRetryAttempts}
            disabled={!globalAutomation}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select retry count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="3">3x</SelectItem>
              <SelectItem value="5">5x</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="rule-expiry" className="text-base font-medium">Rule Expiry Logic</Label>
              <p className="text-sm text-muted-foreground">Automatically deactivate rules after a set period</p>
            </div>
            <Switch 
              id="rule-expiry"
              checked={ruleExpiry}
              onCheckedChange={setRuleExpiry}
              disabled={!globalAutomation}
            />
          </div>
          
          {ruleExpiry && (
            <div className="flex items-center justify-between pl-6">
              <Label htmlFor="rule-expiry-days" className="text-sm">Deactivate after (days):</Label>
              <Input 
                id="rule-expiry-days"
                type="number"
                value={ruleExpiryDays}
                onChange={(e) => setRuleExpiryDays(parseInt(e.target.value))}
                className="w-20"
                min={1}
                disabled={!globalAutomation || !ruleExpiry}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save Automation Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationSettings;
