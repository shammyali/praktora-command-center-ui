
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { toast } from "sonner";
import TemplateCategoryTabs from "./prompt-templates/TemplateCategoryTabs";
import AddTemplateForm from "./prompt-templates/AddTemplateForm";
import TemplatesHeaderActions from "./prompt-templates/TemplatesHeaderActions";
import { Template } from "./prompt-templates/TemplateCategoryTabs";

const PromptTemplatesSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: "Policy Inquiry", content: "Show me the policy details for client [CLIENT_NAME]", category: "general", isPublic: true },
    { id: 2, name: "Claims Status Update", content: "What's the status of claim #[CLAIM_NUMBER] for [CLIENT_NAME]?", category: "claims", isPublic: true },
    { id: 3, name: "Premium Calculation", content: "Calculate premium for a [VEHICLE_TYPE] with value of [VEHICLE_VALUE] for a [CLIENT_TYPE] client", category: "quotes", isPublic: false },
  ]);
  
  const handleAddTemplate = (template: Omit<Template, 'id'>) => {
    setTemplates([...templates, {
      id: templates.length + 1,
      ...template
    }]);
    toast.success("Template added successfully");
  };
  
  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template deleted successfully");
  };
  
  const handleSyncTemplates = () => {
    toast.success("Templates synchronized with PraktoraWeb", {
      description: "All templates have been successfully synced with the command console"
    });
  };
  
  const handleExportTemplates = () => {
    // In a real app, this would generate a JSON file for download
    toast.success("Templates exported", {
      description: "All templates have been exported successfully"
    });
  };
  
  const handleImportTemplates = () => {
    // In a real app, this would open a file picker
    toast.success("Templates imported", {
      description: "Templates have been imported and added to your library"
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>P²RA Prompt Templates</CardTitle>
        </div>
        <CardDescription>Manage reusable command templates for the P²RA Command Console</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">Template Library</h3>
            <p className="text-sm text-muted-foreground">Create and manage reusable command templates</p>
          </div>
          <TemplatesHeaderActions 
            onSyncTemplates={handleSyncTemplates}
            onImportTemplates={handleImportTemplates}
            onExportTemplates={handleExportTemplates}
          />
        </div>
        
        <TemplateCategoryTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          templates={templates}
          handleDeleteTemplate={handleDeleteTemplate}
        />
        
        <AddTemplateForm onAddTemplate={handleAddTemplate} />
        
        <div className="flex justify-end pt-4">
          <Button className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptTemplatesSettings;
