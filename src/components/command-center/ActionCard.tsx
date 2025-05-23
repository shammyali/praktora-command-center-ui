
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  color: string;
  tooltip: string;
}

const ActionCard = ({
  icon: Icon,
  title,
  color,
  tooltip
}: ActionCardProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">{title}</span>
            </div>
            <Button variant="ghost" size="icon">
              <PlusIcon className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="right" align="start" className="max-w-xs">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ActionCard;
