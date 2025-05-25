
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import EmptyEngagements from "./EmptyEngagements";

interface ActiveEngagementsPanelProps {
  activeEngagements: any[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ActiveEngagementsPanel = ({ 
  activeEngagements, 
  isLoading, 
  onRefresh 
}: ActiveEngagementsPanelProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Active Engagements</h2>
        <Button variant="ghost" size="sm" className="text-sm" onClick={onRefresh}>
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading engagements...</div>
        ) : activeEngagements.length > 0 ? (
          activeEngagements.map((engagement, index) => (
            <ProjectCard 
              key={index} 
              title={engagement.title} 
              customerName={engagement.customerName} 
              description={engagement.description} 
              status={engagement.status} 
              statusColor={engagement.statusColor} 
              animate={engagement.animate} 
              kycStatus={engagement.kycStatus}
            />
          ))
        ) : (
          <EmptyEngagements />
        )}
      </div>
    </div>
  );
};

export default ActiveEngagementsPanel;
