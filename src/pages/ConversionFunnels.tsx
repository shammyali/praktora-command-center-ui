
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { funnelsData } from "@/data/funnelsData";
import FunnelFilters from "@/components/funnels/FunnelFilters";
import FunnelVisualizer from "@/components/funnels/FunnelVisualizer";
import InsightPanel from "@/components/funnels/InsightPanel";
import FunnelActions from "@/components/funnels/FunnelActions";

const ConversionFunnels = () => {
  const [selectedClass, setSelectedClass] = useState(funnelsData[0].class);
  const [showComparison, setShowComparison] = useState(true);
  const [showAbsoluteValues, setShowAbsoluteValues] = useState(false);
  
  const selectedFunnelData = funnelsData.find(funnel => funnel.class === selectedClass) || funnelsData[0];
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-praktora-burgundy">Conversion Funnels — Know Where Business Dies</h1>
              <p className="text-gray-500 text-sm mt-1">Every drop-off has a cause. Every fix has a multiplier.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FunnelFilters 
                onClassChange={setSelectedClass}
                onComparisonToggle={setShowComparison}
                onValuesToggle={setShowAbsoluteValues}
                selectedClass={selectedClass}
                showComparison={showComparison}
                showAbsoluteValues={showAbsoluteValues}
              />
              
              <FunnelVisualizer 
                data={selectedFunnelData}
                showComparison={showComparison}
                showAbsoluteValues={showAbsoluteValues}
              />
              
              <div className="block lg:hidden">
                <FunnelActions />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="hidden lg:block">
                <FunnelActions />
              </div>
              <InsightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConversionFunnels;
