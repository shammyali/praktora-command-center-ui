
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import EmptyEngagements from "./EmptyEngagements";
import { ActiveEngagement } from "./types";

interface ActiveEngagementsProps {
  engagements: ActiveEngagement[];
}

const ActiveEngagements = ({ engagements }: ActiveEngagementsProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Active Engagements</h2>
        <Button variant="ghost" size="sm" className="text-sm">View all</Button>
      </div>
      <div className="space-y-3">
        {engagements.length > 0 ? engagements.map((engagement, index) => (
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
        )) : <EmptyEngagements />}
      </div>
    </div>
  );
};

export default ActiveEngagements;
