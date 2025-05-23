
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlusCircleIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Template } from "./TemplateCategoryTabs";

interface AddTemplateFormProps {
  onAddTemplate: (template: Omit<Template, 'id'>) => void;
}

const AddTemplateForm = ({ onAddTemplate }: AddTemplateFormProps) => {
  const [newTemplate, setNewTemplate] = useState<Omit<Template, 'id'>>({
    name: "",
    content: "",
    category: "general",
    isPublic: true
  });

  const categories = ["general", "claims", "quotes", "renewals", "compliance"];

  const handleSubmit = () => {
    if (newTemplate.name && newTemplate.content) {
      onAddTemplate(newTemplate);
      setNewTemplate({ name: "", content: "", category: "general", isPublic: true });
    }
  };

  return (
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
        onClick={handleSubmit}
        disabled={!newTemplate.name || !newTemplate.content}
      >
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        Add Template
      </Button>
    </div>
  );
};

export default AddTemplateForm;
