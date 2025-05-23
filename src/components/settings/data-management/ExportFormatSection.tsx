
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ExportFormatSectionProps {
  exportFormat: string;
  setExportFormat: React.Dispatch<React.SetStateAction<string>>;
}

const ExportFormatSection = ({ exportFormat, setExportFormat }: ExportFormatSectionProps) => {
  return (
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
  );
};

export default ExportFormatSection;
