
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const SLASettings = () => {
  const [businessClasses, setBusinessClasses] = useState([
    { name: "Motor Insurance", sla: 48 },
    { name: "Group Medical", sla: 72 },
    { name: "Property", sla: 96 },
    { name: "Yacht", sla: 120 },
    { name: "Liability", sla: 72 },
  ]);
  
  const [quoteReminderDelay, setQuoteReminderDelay] = useState(24);
  const [claimFollowUp, setClaimFollowUp] = useState(3);
  const [inactivityThreshold, setInactivityThreshold] = useState(14);
  const [stageEscalation, setStageEscalation] = useState(72);

  const handleSlaSave = (index: number, value: number) => {
    const updated = [...businessClasses];
    updated[index].sla = value;
    setBusinessClasses(updated);
  };

  const handleSave = () => {
    // Save settings logic
    console.log({
      businessClasses,
      quoteReminderDelay,
      claimFollowUp,
      inactivityThreshold,
      stageEscalation
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>SLA & Workflow Timing</CardTitle>
        </div>
        <CardDescription>Configure service level agreements and workflow timing rules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-2">SLA definitions per Business Class</h3>
          <p className="text-sm text-muted-foreground mb-4">Set the target response time in hours for different insurance classes</p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Class</TableHead>
                <TableHead>SLA (hours)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessClasses.map((cls, index) => (
                <TableRow key={cls.name}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={cls.sla}
                      onChange={(e) => handleSlaSave(index, parseInt(e.target.value))}
                      className="w-20"
                      min={1}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Separator />
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="quote-reminder" className="text-base font-medium">Quote Reminder Delay</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="quote-reminder"
                type="number"
                value={quoteReminderDelay}
                onChange={(e) => setQuoteReminderDelay(parseInt(e.target.value))}
                className="w-20"
                min={1}
              />
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
            <p className="text-sm text-muted-foreground">Time before sending a follow-up on unactioned quotes</p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="claim-followup" className="text-base font-medium">Claim Follow-Up Window</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="claim-followup"
                type="number"
                value={claimFollowUp}
                onChange={(e) => setClaimFollowUp(parseInt(e.target.value))}
                className="w-20"
                min={1}
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-sm text-muted-foreground">Days before requiring follow-up on open claims</p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="inactivity-threshold" className="text-base font-medium">Inactivity Auto-Close Threshold</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="inactivity-threshold"
                type="number"
                value={inactivityThreshold}
                onChange={(e) => setInactivityThreshold(parseInt(e.target.value))}
                className="w-20"
                min={1}
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-sm text-muted-foreground">Days of inactivity before a workflow is auto-closed</p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="stage-escalation" className="text-base font-medium">Stage Escalation Triggers</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="stage-escalation"
                type="number"
                value={stageEscalation}
                onChange={(e) => setStageEscalation(parseInt(e.target.value))}
                className="w-20"
                min={1}
              />
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
            <p className="text-sm text-muted-foreground">Time before escalating a workflow stage (e.g., "Awaiting Client Confirmation")</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save SLA Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SLASettings;
