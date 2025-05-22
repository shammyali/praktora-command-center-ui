
import { insightCards } from "@/data/funnelsData";
import InsightCard from "./InsightCard";

const InsightPanel = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Funnel Intelligence from P²RA</h3>
        <p className="text-sm text-muted-foreground">
          AI-powered insights to optimize your conversion rates
        </p>
      </div>
      
      <div className="mt-6">
        {insightCards.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </div>
    </div>
  );
};

export default InsightPanel;
