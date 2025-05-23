
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon } from "lucide-react"; // Using FileIcon instead of DocumentIcon
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const DataManagementSettings = () => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [chatRetention, setChatRetention] = useState("90");
  const [scheduleDigest, setScheduleDigest] = useState(false);
  const [digestFrequency, setDigestFrequency] = useState("weekly");
  const [digestSection, setDigestSection] = useState("radar");
  const [emailRecipients, setEmailRecipients] = useState("");

  const handleSave = () => {
    // Save settings logic
    console.log({
      exportFormat,
      chatRetention,
      scheduleDigest,
      digestFrequency,
      digestSection,
      emailRecipients
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>Data Management & Exports</CardTitle>
        </div>
        <CardDescription>Configure how data is managed, exported, and retained in the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-medium">Default Export Format</Label>
          <Select
            value={exportFormat}
            onValueChange={setExportFormat}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Auto-Cleanup Schedule</h3>
          
          <div className="space-y-3">
            <Label className="text-sm">WhatsApp Chat Retention</Label>
            <Select
              value={chatRetention}
              onValueChange={setChatRetention}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">365 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="doc-cleanup" className="text-sm">Document Expiry Cleanup</Label>
              <p className="text-xs text-muted-foreground">Automatically remove expired documents</p>
            </div>
            <Switch id="doc-cleanup" defaultChecked />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="digest-email" className="text-base font-medium">Schedule Digest Email</Label>
              <p className="text-sm text-muted-foreground">Send regular email reports with system insights</p>
            </div>
            <Switch 
              id="digest-email" 
              checked={scheduleDigest}
              onCheckedChange={setScheduleDigest}
            />
          </div>
          
          {scheduleDigest && (
            <div className="space-y-4 pl-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Frequency</Label>
                  <Select
                    value={digestFrequency}
                    onValueChange={setDigestFrequency}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm">Section</Label>
                  <Select
                    value={digestSection}
                    onValueChange={setDigestSection}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="radar">Radar</SelectItem>
                      <SelectItem value="funnels">Funnels</SelectItem>
                      <SelectItem value="claims">Claims</SelectItem>
                      <SelectItem value="all">All Sections</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email-recipients" className="text-sm">Email Recipients</Label>
                <Input 
                  id="email-recipients"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Comma-separated list of email addresses</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save Data Management Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagementSettings;
