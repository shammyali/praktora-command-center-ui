
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AutomationsCanvas from "@/components/automations/AutomationsCanvas";
import AutomationsTemplates from "@/components/automations/AutomationsTemplates";
import AutomationsStats from "@/components/automations/AutomationsStats";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Plus, Search, Zap } from "lucide-react";
import { toast } from "sonner";

const AutomationsLab = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAIGenerate = () => {
    if (!aiPrompt) {
      toast.error("Please enter a description for the automation");
      return;
    }
    
    toast.success("AI is generating your automation", {
      description: "Translating your natural language into automation rules...",
    });
    
    // In a real app, this would call an AI service
    setTimeout(() => {
      toast.success("Automation created successfully", {
        description: "Your new automation has been generated and added to the canvas.",
      });
      setAiPrompt("");
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Automations Lab – Train Your Brokerage to Think</h1>
              <p className="text-muted-foreground mt-1">
                Every click you do more than once... automate it. You don't need a dev team. You need this.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <BrainCircuit className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input 
                className="pl-10 bg-background border-praktora-burgundy/20 focus:border-praktora-burgundy"
                placeholder="Create a rule that sends a WhatsApp follow-up 2 days after a quote if client hasn't replied..." 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAIGenerate()}
              />
            </div>
            <Button onClick={handleAIGenerate} className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">
              <Zap className="h-4 w-4 mr-2" /> Generate with AI
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" /> New Automation
            </Button>
          </div>
          
          <Tabs defaultValue="builder" className="flex flex-col h-[calc(100vh-240px)]" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="builder">Automation Builder</TabsTrigger>
              <TabsTrigger value="active">Active Automations</TabsTrigger>
              <TabsTrigger value="templates">Templates Gallery</TabsTrigger>
            </TabsList>
            
            <div className="flex h-full gap-4">
              <div className={`flex flex-1 ${activeTab !== "templates" ? "block" : "hidden"}`}>
                <TabsContent value="builder" className="flex-1 h-full m-0">
                  <AutomationsCanvas />
                </TabsContent>
                
                <TabsContent value="active" className="flex-1 h-full m-0">
                  <div className="flex h-full gap-4">
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm overflow-auto">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Active Automations</h2>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search automations..." className="pl-8 h-8 text-sm" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {/* Active automations list would go here */}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
              
              <TabsContent value="templates" className="flex-1 h-full m-0">
                <AutomationsTemplates />
              </TabsContent>
              
              {activeTab !== "templates" && (
                <div className="w-72">
                  <AutomationsStats />
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AutomationsLab;
