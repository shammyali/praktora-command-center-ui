
import { useState } from "react";
import { automationTemplates } from "@/data/automationsData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AutomationsTemplates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = automationTemplates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddTemplate = (templateId: string) => {
    const template = automationTemplates.find(t => t.id === templateId);
    if (template) {
      toast.success("Template added to canvas", {
        description: `"${template.name}" has been added to your workspace.`
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
      <div className="border-b p-4">
        <h3 className="text-lg font-medium mb-2">Templates Gallery</h3>
        <p className="text-sm text-muted-foreground">
          Ready-to-use automation templates that you can customize to your needs
        </p>
        
        <div className="relative mt-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[calc(100%-120px)]">
        {filteredTemplates.map(template => (
          <div key={template.id} className="border rounded-md p-4 hover:border-praktora-burgundy/30 hover:bg-praktora-burgundy/5 transition-colors">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{template.name}</h4>
              <Badge variant="outline" className="bg-praktora-burgundy/10 text-praktora-burgundy border-praktora-burgundy/20">
                {template.popularity}% Popular
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              {template.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {template.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {template.trigger.name} → {template.actions.length} {template.actions.length === 1 ? 'action' : 'actions'}
              </div>
              <Button 
                size="sm" 
                onClick={() => handleAddTemplate(template.id)}
                className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
              >
                <Plus className="h-4 w-4 mr-1" /> Add to Lab
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationsTemplates;
