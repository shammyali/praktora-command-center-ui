
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import BusinessMetricsPanel from "@/components/intelligence/BusinessMetricsPanel";
import OperationsMetricsPanel from "@/components/intelligence/OperationsMetricsPanel";
import AIInsightsPanel from "@/components/intelligence/AIInsightsPanel";
import IntelligenceControlBar from "@/components/intelligence/IntelligenceControlBar";
import { businessMetricsData, operationsMetricsData, aiInsightsData } from "@/data/intelligenceData";

const IntelligenceHub = () => {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
      
      toast({
        title: "Dashboard Refreshed",
        description: "Intelligence data updated successfully",
      });
    }, 800);
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being generated and will download shortly",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Dashboard",
      description: "Dashboard link copied to clipboard",
    });
  };
  
  // Auto refresh effect
  useEffect(() => {
    // Could implement auto refresh here
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-praktora-burgundy">P²RA Intelligence & Analytics Hub — Where Performance Becomes Story</h1>
          </div>
          
          <IntelligenceControlBar 
            onRefresh={handleRefresh} 
            onExport={handleExport}
            onShare={handleShare}
            lastUpdated={lastUpdated}
          />
          
          <div className="space-y-6">
            <BusinessMetricsPanel metrics={businessMetricsData} onRefresh={handleRefresh} />
            
            <div className="border-l-4 border-praktora-burgundy pl-3 py-1 mb-2">
              <h2 className="text-lg font-medium text-praktora-burgundy">Operational Excellence</h2>
              <p className="text-sm text-gray-500">Process efficiency, service delivery, and team performance</p>
            </div>
            
            <OperationsMetricsPanel metrics={operationsMetricsData} />
            
            <div className="border-l-4 border-praktora-burgundy pl-3 py-1 mb-2">
              <h2 className="text-lg font-medium text-praktora-burgundy">AI-Powered Intelligence</h2>
              <p className="text-sm text-gray-500">Insights, patterns, and recommendations from P²RA</p>
            </div>
            
            <AIInsightsPanel insights={aiInsightsData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntelligenceHub;
