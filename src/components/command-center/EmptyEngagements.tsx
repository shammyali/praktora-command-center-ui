
import { Card } from "@/components/ui/card";
import { PenIcon } from "lucide-react";

const EmptyEngagements = () => {
  return (
    <Card className="border border-dashed bg-white/50 p-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <PenIcon className="h-5 w-5 text-gray-400" />
        <p className="text-sm text-gray-600">
          No active engagements at the moment. Use Instant Commands to get started.
        </p>
      </div>
    </Card>
  );
};

export default EmptyEngagements;
