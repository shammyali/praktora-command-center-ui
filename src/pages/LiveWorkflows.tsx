
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { CalendarIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceCommandWithTooltip from "@/components/dashboard/VoiceCommandWithTooltip";
import WorkflowCategory from "@/components/workflows/WorkflowCategory";
import { workflowsData } from "@/data/workflowsData";
import { Badge } from "@/components/ui/badge";

const LiveWorkflows = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data
  };
  
  const handleVoiceCommand = (command: string) => {
    console.log(`Voice command received in Workflows: ${command}`);
    // Handle voice commands related to workflows
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 pb-8">
          <div className="px-6 py-6">
            <div className="mb-6 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Live Workflows — Real-time Process Monitoring</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Monitor and manage active workflows across your brokerage
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3" />
                    <span>Last 30 days</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <RefreshCw className="h-3 w-3" />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs" 
                      onClick={handleRefresh}
                    >
                      Updated {lastUpdated.toLocaleTimeString()}
                    </Button>
                  </div>
                  
                  <VoiceCommandWithTooltip onCommand={handleVoiceCommand} />
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-lg border border-gray-100 bg-white p-1 shadow-sm">
                <div className="p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium">Workflow Summary</h2>
                      <Badge className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">7 Active</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        Filters
                      </Button>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  {/* Workflow categories */}
                  <div className="space-y-4">
                    <WorkflowCategory 
                      title="New Business"
                      count={3}
                      icon="FileText"
                      items={workflowsData.newBusiness}
                      stages={[
                        "Enquiry", "In Process", "Quote Ready", "Quoted", "Awaiting Client Confirmation",
                        "Quote Confirmed", "Policy Issued", "Invoiced", "Customer Settled", 
                        "Commission Settled", "Paid to Agent", "Lost"
                      ]}
                      defaultOpen={true}
                    />
                    
                    <WorkflowCategory 
                      title="Renewals"
                      count={2}
                      icon="RefreshCw"
                      items={workflowsData.renewals}
                      stages={[
                        "Under Renewal Process", "Renewal Notice Sent", "Under Renewal Follow-up", 
                        "Renewal Enquiry", "In Process", "Quote Ready", "Quoted", 
                        "Awaiting Client Confirmation", "Quote Confirmed", "Policy Issued",
                        "Invoiced", "Customer Settled", "Commission Settled", "Paid to Agent"
                      ]}
                    />
                    
                    <WorkflowCategory 
                      title="Endorsements"
                      count={1}
                      icon="FileEdit"
                      items={workflowsData.endorsements}
                      stages={[
                        "Request Received", "Request Review", "Request Pending with Customer",
                        "Sent to Insurer", "Awaiting Confirmation", "Endorsement Received",
                        "Invoiced", "Customer Settled", "Commission Settled", "Paid to Agent"
                      ]}
                    />
                    
                    <WorkflowCategory 
                      title="Claims"
                      count={1}
                      icon="AlertTriangle"
                      items={workflowsData.claims}
                      stages={[
                        "Claim Request Received", "Request Review", "Request Pending with Customer",
                        "Sent to Insurer", "Awaiting Survey", "Re-submission", "Claim Settled",
                        "Rejected", "Partial Settled", "Re-open", "Customer Complaint"
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveWorkflows;
