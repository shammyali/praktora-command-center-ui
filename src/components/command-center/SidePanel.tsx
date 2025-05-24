
import InstantCommands from "./InstantCommands";
import ActiveEngagements from "./ActiveEngagements";
import { ActiveEngagement } from "./types";

interface SidePanelProps {
  activeEngagements: ActiveEngagement[];
}

const SidePanel = ({ activeEngagements }: SidePanelProps) => {
  return (
    <div className="h-full overflow-auto p-6">
      <InstantCommands />
      <ActiveEngagements engagements={activeEngagements} />
    </div>
  );
};

export default SidePanel;
