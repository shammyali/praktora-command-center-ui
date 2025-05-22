
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  FileText,
  MessageCircle,
  Flag,
  AlertTriangle,
  FileUp,
  Eye,
  RefreshCw,
  UserCheck,
  Mail,
  MessageSquare,
  Star,
  AlertOctagon,
  CreditCard,
  Link
} from "lucide-react";

import PolicyholderOverview from "@/components/policyholders/PolicyholderOverview";
import KycRiskSummary from "@/components/policyholders/KycRiskSummary";
import DocumentTracker from "@/components/policyholders/DocumentTracker";
import ComplaintHistory from "@/components/policyholders/ComplaintHistory";
import LinkedEntities from "@/components/policyholders/LinkedEntities";
import InternalNotes from "@/components/policyholders/InternalNotes";
import SmartActionsBar from "@/components/policyholders/SmartActionsBar";

const PolicyholderProfile = () => {
  // Simulate loading policyholder data
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header 
          // Fixed: Passing props in the correct format expected by the Header component
          title="Policyholder Profile" 
          subtitle="Customer Intelligence Hub"
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            {/* Section 1: Policyholder Overview Panel */}
            <PolicyholderOverview />
            
            {/* Main content sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 grid gap-6">
                {/* Section 2: KYC & Risk Summary */}
                <KycRiskSummary />
                
                {/* Section 3: Document Tracker */}
                <DocumentTracker />
                
                {/* Section 4: Complaint & Escalation History */}
                <ComplaintHistory />
              </div>
              
              <div className="grid gap-6">
                {/* Section 5: Linked Entities */}
                <LinkedEntities />
                
                {/* Section 6: Internal Notes & Flags */}
                <InternalNotes />
              </div>
            </div>
            
            {/* Section 7: Smart Actions Bar */}
            <SmartActionsBar />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicyholderProfile;
