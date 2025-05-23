
import React from "react";
import { Document } from "@/types/documentTypes";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Download, 
  MoreHorizontal 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DocumentActionsProps {
  document: Document;
  onViewDocument: (document: Document) => void;
}

export const DocumentActions = ({ document, onViewDocument }: DocumentActionsProps) => {
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-7 w-7" 
        onClick={(e) => {
          e.stopPropagation();
          onViewDocument(document);
        }}
        title="View document"
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-7 w-7" 
        onClick={(e) => e.stopPropagation()}
        title="Download document"
      >
        <Download className="h-4 w-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="More actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Link to workflow</DropdownMenuItem>
          <DropdownMenuItem>Link to client</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Re-tag document</DropdownMenuItem>
          <DropdownMenuItem>Edit details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Delete document</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
