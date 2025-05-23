
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ExportFormatSection from "./data-management/ExportFormatSection";
import AutoCleanupSection from "./data-management/AutoCleanupSection";
import DigestEmailSection from "./data-management/DigestEmailSection";

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
        <ExportFormatSection 
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
        />
        
        <Separator />
        
        <AutoCleanupSection 
          chatRetention={chatRetention}
          setChatRetention={setChatRetention}
        />
        
        <Separator />
        
        <DigestEmailSection
          scheduleDigest={scheduleDigest}
          setScheduleDigest={setScheduleDigest}
          digestFrequency={digestFrequency}
          setDigestFrequency={setDigestFrequency}
          digestSection={digestSection}
          setDigestSection={setDigestSection}
          emailRecipients={emailRecipients}
          setEmailRecipients={setEmailRecipients}
        />

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
