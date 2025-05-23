
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface EmailParsingSectionProps {
  emailSubjectRule: string;
  setEmailSubjectRule: React.Dispatch<React.SetStateAction<string>>;
  attachmentParsing: boolean;
  setAttachmentParsing: React.Dispatch<React.SetStateAction<boolean>>;
  autoLinking: boolean;
  setAutoLinking: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailParsingSection = ({ 
  emailSubjectRule, 
  setEmailSubjectRule,
  attachmentParsing,
  setAttachmentParsing,
  autoLinking,
  setAutoLinking
}: EmailParsingSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Email Parsing Rules</h3>
      
      <div className="space-y-3">
        <Label htmlFor="email-subject" className="text-sm">Subject Contains</Label>
        <Input 
          id="email-subject"
          value={emailSubjectRule}
          onChange={(e) => setEmailSubjectRule(e.target.value)}
          placeholder="Policy, Quote, Claim, etc."
        />
        <p className="text-xs text-muted-foreground">Comma-separated keywords to watch for in email subjects</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="attachment-parsing" className="text-sm">Attachment Present</Label>
          <p className="text-xs text-muted-foreground">Flag emails with attachments for priority processing</p>
        </div>
        <Switch 
          id="attachment-parsing" 
          checked={attachmentParsing} 
          onCheckedChange={setAttachmentParsing}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="auto-linking" className="text-sm">Auto-Linking Toggle</Label>
          <p className="text-xs text-muted-foreground">Automatically link communications to relevant entities</p>
        </div>
        <Switch 
          id="auto-linking" 
          checked={autoLinking} 
          onCheckedChange={setAutoLinking}
        />
      </div>
    </div>
  );
};

export default EmailParsingSection;
