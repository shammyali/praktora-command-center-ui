
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { FileTextIcon, PlusCircleIcon, TrashIcon, DownloadIcon, UploadIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PromptTemplatesSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [templates, setTemplates] = useState([
    { id: 1, name: "Policy Inquiry", content: "Show me the policy details for client [CLIENT_NAME]", category: "general", isPublic: true },
    { id: 2, name: "Claims Status Update", content: "What's the status of claim #[CLAIM_NUMBER] for [CLIENT_NAME]?", category: "claims", isPublic: true },
    { id: 3, name: "Premium Calculation", content: "Calculate premium for a [VEHICLE_TYPE] with value of [VEHICLE_VALUE] for a [CLIENT_TYPE] client", category: "quotes", isPublic: false },
  ]);
  
  const [newTemplate, setNewTemplate] = useState({ name: "", content: "", category: "general", isPublic: true });
  
  const categories = ["general", "claims", "quotes", "renewals", "compliance"];
  
  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      setTemplates([...templates, {
        id: templates.length + 1,
        ...newTemplate
      }]);
      setNewTemplate({ name: "", content: "", category: "general", isPublic: true });
      toast.success("Template added successfully");
    } else {
      toast.error("Template name and content are required");
    }
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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleImportTemplates}
            >
              <UploadIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportTemplates}
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={handleSyncTemplates}
              className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
            >
              Sync with PraktoraWeb
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="border rounded-md mt-4 p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium capitalize">{activeTab} Templates</h4>
              <Badge variant="outline">
                {templates.filter(t => t.category === activeTab).length} templates
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="w-24">Public</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates
                  .filter(template => template.category === activeTab)
                  .map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="max-w-md truncate">{template.content}</TableCell>
                      <TableCell>
                        <Switch checked={template.isPublic} />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {templates.filter(t => t.category === activeTab).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No templates found for this category
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        
        <div className="border rounded-md p-4 mt-6">
          <h3 className="text-base font-medium mb-4">Add New Template</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input 
                  id="template-name"
                  placeholder="e.g., Policy Renewal Query"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="template-category">Category</Label>
                <Select 
                  value={newTemplate.category}
                  onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}
                >
                  <SelectTrigger id="template-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea 
                id="template-content"
                placeholder="Enter your template content with placeholders like [CLIENT_NAME]"
                className="min-h-24"
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use square brackets to define variable placeholders: [CLIENT_NAME], [POLICY_NUMBER], etc.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                id="public-template"
                checked={newTemplate.isPublic}
                onCheckedChange={(checked) => setNewTemplate({...newTemplate, isPublic: checked})}
              />
              <Label htmlFor="public-template">Make template available to all users</Label>
            </div>
          </div>
          
          <Button 
            className="mt-4 bg-praktora-burgundy hover:bg-praktora-burgundy/90"
            onClick={handleAddTemplate}
            disabled={!newTemplate.name || !newTemplate.content}
          >
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Add Template
          </Button>
        </div>
        
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
