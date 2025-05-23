
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AISettings from "./AISettings";
import AutomationSettings from "./AutomationSettings";
import SLASettings from "./SLASettings";
import CommunicationSettings from "./CommunicationSettings";
import TemplateSettings from "./TemplateSettings";
import IntelligenceSettings from "./IntelligenceSettings";
import DataManagementSettings from "./DataManagementSettings";
import PromptTemplatesSettings from "./PromptTemplatesSettings";

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState("ai");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-praktora-burgundy">Settings — Control How Your Intelligence Thinks and Acts</h1>
        <p className="text-sm text-muted-foreground">Turn nudges into habits. Turn logic into leverage.</p>
      </div>
      
      <Tabs defaultValue="ai" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-8 mb-6">
          <TabsTrigger value="ai">P²RA AI</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="sla">SLA & Workflow</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="prompt-templates">Prompt Templates</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai">
          <AISettings />
        </TabsContent>
        
        <TabsContent value="automation">
          <AutomationSettings />
        </TabsContent>
        
        <TabsContent value="sla">
          <SLASettings />
        </TabsContent>
        
        <TabsContent value="communication">
          <CommunicationSettings />
        </TabsContent>
        
        <TabsContent value="templates">
          <TemplateSettings />
        </TabsContent>
        
        <TabsContent value="prompt-templates">
          <PromptTemplatesSettings />
        </TabsContent>
        
        <TabsContent value="intelligence">
          <IntelligenceSettings />
        </TabsContent>
        
        <TabsContent value="data">
          <DataManagementSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsLayout;
