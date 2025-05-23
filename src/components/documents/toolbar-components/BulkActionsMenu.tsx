
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Link as LinkIcon, Trash, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BulkActionsMenuProps {
  selectedDocuments: string[];
  setSelectedDocuments: (ids: string[]) => void;
  onBulkAction: (action: string) => void;
}

export const BulkActionsMenu = ({ 
  selectedDocuments, 
  setSelectedDocuments,
  onBulkAction 
}: BulkActionsMenuProps) => {
  if (selectedDocuments.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2 mr-2">
      <span className="text-sm font-medium">
        {selectedDocuments.length} selected
      </span>
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={() => setSelectedDocuments([])}
      >
        <X className="h-4 w-4" /> Clear
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
          >
            Actions <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LinkIcon className="h-4 w-4 mr-2" />
            Link Documents
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onBulkAction("delete")}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete Documents
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
