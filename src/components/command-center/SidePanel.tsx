
import InstantCommands from "./InstantCommands";
import ActiveEngagements from "./ActiveEngagements";
import { ActiveEngagement } from "./types";

interface SidePanelProps {
  activeEngagements: ActiveEngagement[];
}

const SidePanel = ({ activeEngagements }: SidePanelProps) => {
  return (
    <div className="fixed top-16 right-0 bottom-0 w-80 border-l border-gray-200 bg-white p-5 overflow-auto z-10">
      <InstantCommands />
      <ActiveEngagements engagements={activeEngagements} />
    </div>
  );
};

export default SidePanel;
