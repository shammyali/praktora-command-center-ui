
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const IntelligenceSettings = () => {
  const [vipThreshold, setVipThreshold] = useState("premium");
  const [kycRiskWeighting, setKycRiskWeighting] = useState({
    missingDocuments: 30,
    sanctionsList: 70,
    addressMismatch: 25,
    highRiskCountry: 50,
  });
  const [complaintThreshold, setComplaintThreshold] = useState(2);
  const [insightFocus, setInsightFocus] = useState("conversion");
  
  const handleKycWeightChange = (key: string, value: string) => {
    setKycRiskWeighting({
      ...kycRiskWeighting,
      [key]: parseInt(value)
    });
  };
  
  const handleSave = () => {
    // Save settings logic
    console.log({
      vipThreshold,
      kycRiskWeighting,
      complaintThreshold,
      insightFocus
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <BrainIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>Intelligence Input Config</CardTitle>
        </div>
        <CardDescription>Configure how the intelligence layer processes and prioritizes data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">VIP Tagging Logic</h3>
          <p className="text-sm text-muted-foreground">Configure criteria that automatically tags clients as VIPs</p>
          
          <div>
            <Label htmlFor="vip-threshold" className="text-sm">VIP Trigger Rules</Label>
            <Select
              value={vipThreshold}
              onValueChange={setVipThreshold}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select VIP trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="claim">Claim Count > 2</SelectItem>
                <SelectItem value="premium">Premium > 50K</SelectItem>
                <SelectItem value="policies">Active Policies > 3</SelectItem>
                <SelectItem value="years">Client > 5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-baseline gap-2">
            <Checkbox id="vip-auto" />
            <div>
              <Label htmlFor="vip-auto" className="text-sm">Auto-notify account manager when client meets VIP criteria</Label>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">KYC Risk Score Weighting</h3>
          <p className="text-sm text-muted-foreground">Configure point values for different KYC risk factors</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="missing-docs" className="text-sm">Missing Documents</Label>
              <Input 
                id="missing-docs"
                type="number"
                value={kycRiskWeighting.missingDocuments}
                onChange={(e) => handleKycWeightChange('missingDocuments', e.target.value)}
                min={0}
                max={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sanctions-list" className="text-sm">Sanctions List Match</Label>
              <Input 
                id="sanctions-list"
                type="number"
                value={kycRiskWeighting.sanctionsList}
                onChange={(e) => handleKycWeightChange('sanctionsList', e.target.value)}
                min={0}
                max={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address-mismatch" className="text-sm">Address Mismatch</Label>
              <Input 
                id="address-mismatch"
                type="number"
                value={kycRiskWeighting.addressMismatch}
                onChange={(e) => handleKycWeightChange('addressMismatch', e.target.value)}
                min={0}
                max={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="high-risk-country" className="text-sm">High-Risk Country</Label>
              <Input 
                id="high-risk-country"
                type="number"
                value={kycRiskWeighting.highRiskCountry}
                onChange={(e) => handleKycWeightChange('highRiskCountry', e.target.value)}
                min={0}
                max={100}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="complaint-threshold" className="text-sm">Complaint Threshold</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="complaint-threshold"
                type="number"
                value={complaintThreshold}
                onChange={(e) => setComplaintThreshold(parseInt(e.target.value))}
                className="w-20"
                min={1}
              />
              <span className="text-sm text-muted-foreground">complaints</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Number of complaints that trigger risk alert</p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Weekly Insight Focus</h3>
          <p className="text-sm text-muted-foreground">Choose the primary metric for weekly insights</p>
          
          <RadioGroup value={insightFocus} onValueChange={setInsightFocus}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="revenue" id="revenue" />
              <Label htmlFor="revenue">Revenue Trends</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="conversion" id="conversion" />
              <Label htmlFor="conversion">Conversion Weak Points</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="agent" id="agent" />
              <Label htmlFor="agent">Agent Delay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="risk" id="risk" />
              <Label htmlFor="risk">Client Risk Alerts</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save Intelligence Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligenceSettings;
