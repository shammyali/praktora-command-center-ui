
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import BusinessPulse from "@/components/dashboard/BusinessPulse";
import AiHighlights from "@/components/dashboard/AiHighlights";
import AgentLeaderboard from "@/components/dashboard/AgentLeaderboard";
import CriticalAlerts from "@/components/dashboard/CriticalAlerts";
import VoiceCommand from "@/components/dashboard/VoiceCommand";
import AskPRA from "@/components/dashboard/AskPRA";

const Dashboard = () => {
  const [voiceCommandResult, setVoiceCommandResult] = useState<string | null>(null);

  const handleVoiceCommand = (command: string) => {
    let result = "";
    
    if (command.includes("delayed claims")) {
      result = "Top 5 delayed claims:\n1. Claim #C23091 - AXA - 15 days\n2. Claim #C23087 - Oman Insurance - 12 days\n3. Claim #C23076 - RSA - 11 days\n4. Claim #C23094 - Salama - 10 days\n5. Claim #C23082 - Sukoon - 10 days";
    } else if (command.includes("summarize today")) {
      result = "Today: 27 new enquiries processed, 12 quotes sent, 5 policies issued worth AED 47,500 in premium.";
    } else {
      result = "I'm sorry, I couldn't process that command. Try asking about delayed claims or today's activity summary.";
    }
    
    setVoiceCommandResult(result);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-praktora-burgundy">P²RA Control Center — Intelligence in Motion</h1>
            <VoiceCommand onCommand={handleVoiceCommand} />
          </div>
          
          {voiceCommandResult && (
            <div className="mb-6 p-4 bg-praktora-burgundy/10 border border-praktora-burgundy/30 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{voiceCommandResult}</pre>
            </div>
          )}
          
          <div className="mb-6">
            <ActivityTimeline />
          </div>

          <div className="mb-6">
            <AskPRA />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <BusinessPulse />
            </div>
            
            <div className="lg:col-span-5">
              <AiHighlights />
            </div>
            
            <div className="lg:col-span-4">
              <AgentLeaderboard />
            </div>
          </div>
          
          <div className="mt-6">
            <CriticalAlerts />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
