
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AutoCleanupSectionProps {
  chatRetention: string;
  setChatRetention: React.Dispatch<React.SetStateAction<string>>;
}

const AutoCleanupSection = ({ chatRetention, setChatRetention }: AutoCleanupSectionProps) => {
  return (
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
  );
};

export default AutoCleanupSection;
