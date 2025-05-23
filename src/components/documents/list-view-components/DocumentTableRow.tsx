
import React from "react";
import { format } from "date-fns";
import { Document } from "@/types/documentTypes";
import { Eye, Download, MoreHorizontal, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentTableRowProps {
  doc: Document;
  selected: boolean;
  onSelectDocument: (doc: Document, selected: boolean) => void;
  onViewDocument: (doc: Document) => void;
}

export const DocumentTableRow = ({
  doc,
  selected,
  onSelectDocument,
  onViewDocument,
}: DocumentTableRowProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <TableRow
      key={doc.id}
      className={selected ? "bg-blue-50" : ""}
    >
      <TableCell>
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={selected}
          onChange={(e) => onSelectDocument(doc, e.target.checked)}
        />
      </TableCell>
      <TableCell
        className="font-medium cursor-pointer hover:text-blue-600"
        onClick={() => onViewDocument(doc)}
      >
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{doc.fileName}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-gray-50 border-gray-200">
          {doc.type}
        </Badge>
      </TableCell>
      <TableCell>
        <StatusBadge status={doc.status} />
      </TableCell>
      <TableCell>
        {doc.linkedTo ? (
          <span className="text-sm">{doc.linkedTo.name}</span>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className="text-sm">{doc.uploadedBy.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{formatDate(doc.dateAdded)}</span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-gray-50 border-gray-200">
          {doc.source}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onViewDocument(doc)}
            title="View"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                title="More actions"
              >
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
              <DropdownMenuItem className="text-red-600">
                Delete document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
