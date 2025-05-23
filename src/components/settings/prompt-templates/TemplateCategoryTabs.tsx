
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TrashIcon } from "lucide-react";

export type Template = {
  id: number;
  name: string;
  content: string;
  category: string;
  isPublic: boolean;
};

interface TemplateCategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  templates: Template[];
  handleDeleteTemplate: (id: number) => void;
}

const TemplateCategoryTabs = ({
  activeTab,
  setActiveTab,
  templates,
  handleDeleteTemplate
}: TemplateCategoryTabsProps) => {
  const categories = ["general", "claims", "quotes", "renewals", "compliance"];

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5">
        {categories.map(category => (
          <TabsTrigger key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</TabsTrigger>
        ))}
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
  );
};

export default TemplateCategoryTabs;
