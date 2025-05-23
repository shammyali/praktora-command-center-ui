
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface DigestEmailSectionProps {
  scheduleDigest: boolean;
  setScheduleDigest: React.Dispatch<React.SetStateAction<boolean>>;
  digestFrequency: string;
  setDigestFrequency: React.Dispatch<React.SetStateAction<string>>;
  digestSection: string;
  setDigestSection: React.Dispatch<React.SetStateAction<string>>;
  emailRecipients: string;
  setEmailRecipients: React.Dispatch<React.SetStateAction<string>>;
}

const DigestEmailSection = ({ 
  scheduleDigest, 
  setScheduleDigest,
  digestFrequency,
  setDigestFrequency,
  digestSection,
  setDigestSection,
  emailRecipients,
  setEmailRecipients
}: DigestEmailSectionProps) => {
  return (
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
  );
};

export default DigestEmailSection;
