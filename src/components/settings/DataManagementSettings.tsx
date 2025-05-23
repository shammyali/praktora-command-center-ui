
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DataManagementSettings = () => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [whatsAppRetention, setWhatsAppRetention] = useState(90);
  const [documentCleanup, setDocumentCleanup] = useState(true);
  const [digestSchedule, setDigestSchedule] = useState("weekly");
  const [digestSection, setDigestSection] = useState("radar");
  const [digestEmails, setDigestEmails] = useState("admin@praktora.com");
  
  const handleSave = () => {
    // Save settings logic
    console.log({
      exportFormat,
      whatsAppRetention,
      documentCleanup,
      digestSchedule,
      digestSection,
      digestEmails
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <DocumentIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>Data Management & Exports</CardTitle>
        </div>
        <CardDescription>Configure how data is exported, retained, and distributed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">Export Settings</h3>
          
          <div>
            <Label htmlFor="export-format" className="text-sm">Default Export Format</Label>
            <RadioGroup 
              value={exportFormat} 
              onValueChange={setExportFormat}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json">JSON</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline">Export Full History</Button>
            <Button variant="outline">Export Filtered Logs</Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Auto-Cleanup Schedule</h3>
          <p className="text-sm text-muted-foreground">Configure automatic data cleanup settings</p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-retention" className="text-sm">WhatsApp Chat Retention</Label>
              <div className="flex items-center gap-2">
                <Select
                  value={whatsAppRetention.toString()}
                  onValueChange={(value) => setWhatsAppRetention(parseInt(value))}
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
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="document-cleanup" className="text-sm">Document Expiry Cleanup</Label>
                <p className="text-xs text-muted-foreground">Auto-archive expired documents</p>
              </div>
              <Switch 
                id="document-cleanup" 
                checked={documentCleanup} 
                onCheckedChange={setDocumentCleanup}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Schedule Digest Email</h3>
          <p className="text-sm text-muted-foreground">Configure automatic report emails</p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="digest-frequency" className="text-sm">Frequency</Label>
              <Select
                value={digestSchedule}
                onValueChange={setDigestSchedule}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="digest-section" className="text-sm">Section</Label>
              <Select
                value={digestSection}
                onValueChange={setDigestSection}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radar">P²RA Radar</SelectItem>
                  <SelectItem value="funnels">Conversion Funnels</SelectItem>
                  <SelectItem value="claims">Claims</SelectItem>
                  <SelectItem value="expiry">Policy Expiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="digest-emails" className="text-sm">Email Recipients</Label>
            <Input 
              id="digest-emails"
              value={digestEmails}
              onChange={(e) => setDigestEmails(e.target.value)}
              placeholder="email@praktora.com, manager@praktora.com"
            />
            <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Preview</Badge>
                <span className="text-sm font-medium">Next scheduled digest:</span>
              </div>
              <span className="text-sm">Monday, May 27, 2025</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Data Export and Storage</h3>
          
          <Tabs defaultValue="export">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            <TabsContent value="export" className="py-4">
              <div className="space-y-4">
                <Button className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">Export All Data</Button>
                <p className="text-sm text-muted-foreground">
                  Exports all system data in the selected format. This may take several minutes to complete.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="archive" className="py-4">
              <div className="space-y-4">
                <Button variant="outline">Archive Logs</Button>
                <p className="text-sm text-muted-foreground">
                  Creates a compressed archive of logs for compliance or storage purposes.
                </p>
              </div>
            </TabsContent>
          </Tabs>
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
