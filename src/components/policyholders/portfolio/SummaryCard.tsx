
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type StatusType = "positive" | "neutral" | "warning" | "negative";

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  status: StatusType;
}

const SummaryCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  status 
}: SummaryCardProps) => {
  const statusClasses = {
    positive: "text-green-600 bg-green-50",
    neutral: "text-blue-600 bg-blue-50",
    warning: "text-amber-600 bg-amber-50",
    negative: "text-red-600 bg-red-50"
  };

  return (
    <Card className="border hover:border-praktora-burgundy/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
          <div className={cn("p-1.5 rounded-full", statusClasses[status])}>
            {icon}
          </div>
        </div>
        <div className="mb-1">
          <p className="text-xl font-semibold">{value}</p>
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
