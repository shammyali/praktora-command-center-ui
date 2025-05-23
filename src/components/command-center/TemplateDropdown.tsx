
import { Settings2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { FileTextIcon } from "lucide-react";

export type PromptTemplate = {
  id: number;
  name: string;
  content: string;
  category: string;
};

interface TemplateDropdownProps {
  templates: Record<string, PromptTemplate[]>;
  onTemplateClick: (content: string) => void;
}

const TemplateDropdown = ({ templates, onTemplateClick }: TemplateDropdownProps) => {
  const navigate = useNavigate();

  const handleTemplateClick = (templateContent: string) => {
    onTemplateClick(templateContent);
    toast.info("Template applied", {
      description: "You can customize the placeholders before executing"
    });
  };

  const handleManageTemplates = () => {
    // Navigate directly to the settings page with prompt-templates tab
    navigate("/settings?tab=prompt-templates");
    
    toast.info("Opening Prompt Templates Settings", {
      description: "Manage your saved command templates"
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FileTextIcon className="h-4 w-4 mr-1" />
                Templates
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {Object.entries(templates).map(([category, categoryTemplates]) => (
                <div key={category}>
                  <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase">
                    {category}
                  </div>
                  {categoryTemplates.map((template) => (
                    <DropdownMenuItem 
                      key={template.id}
                      onClick={() => handleTemplateClick(template.content)}
                      className="cursor-pointer"
                    >
                      <span className="font-medium">{template.name}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
              <Separator className="my-1" />
              <DropdownMenuItem onClick={handleManageTemplates}>
                <Settings2Icon className="h-4 w-4 mr-2" />
                <span>Manage Templates</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Access saved command templates for common tasks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TemplateDropdown;
