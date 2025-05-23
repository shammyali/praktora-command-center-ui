
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface PRAIntelligenceCardProps {
  intelligenceSummary: string;
}

const PRAIntelligenceCard = ({ intelligenceSummary }: PRAIntelligenceCardProps) => {
  return (
    <Card className="border-praktora-burgundy/30 bg-praktora-burgundy/5 hover:bg-praktora-burgundy/10 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-praktora-burgundy font-medium">P²RA Intelligence</h3>
          <div className="p-1.5 rounded-full text-praktora-burgundy bg-praktora-burgundy/10">
            <Brain />
          </div>
        </div>
        <div className="mb-1">
          <p className="text-sm">{intelligenceSummary}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PRAIntelligenceCard;
