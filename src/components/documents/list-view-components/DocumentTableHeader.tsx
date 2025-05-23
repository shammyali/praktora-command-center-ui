
import React from "react";
import { Document } from "@/types/documentTypes";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DocumentTableHeaderProps {
  documents: Document[];
  selectedDocuments: string[];
  onSelectAll: (selectAll: boolean) => void;
}

export const DocumentTableHeader = ({ 
  documents, 
  selectedDocuments, 
  onSelectAll 
}: DocumentTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={
              selectedDocuments.length === documents.length &&
              documents.length > 0
            }
            onChange={(e) => onSelectAll(e.target.checked)}
          />
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Linked To</TableHead>
        <TableHead>Uploaded By</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Source</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
