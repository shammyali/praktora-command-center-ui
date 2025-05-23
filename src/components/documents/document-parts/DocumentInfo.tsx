
import React from "react";
import { Document } from "@/types/documentTypes";
import { DocumentStatusBadge } from "../document-badges/DocumentStatusBadge";
import { DocumentTypeBadge } from "../document-badges/DocumentTypeBadge";
import { format } from "date-fns";

interface DocumentInfoProps {
  document: Document;
}

export const DocumentInfo = ({ document }: DocumentInfoProps) => {
  // Format the date to be more readable
  const formattedDate = () => {
    try {
      return format(new Date(document.dateAdded), "MMM dd, yyyy");
    } catch {
      return document.dateAdded;
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-sm truncate" title={document.fileName}>
          {document.fileName}
        </h4>
      </div>
      
      <div className="flex flex-wrap gap-2 text-xs">
        <DocumentTypeBadge type={document.type} />
        <DocumentStatusBadge status={document.status} />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 pt-2">
        <div>{document.fileSize}</div>
        <div>{formattedDate()}</div>
      </div>
      
      {document.linkedTo && (
        <div className="text-xs bg-blue-50 p-2 rounded-md">
          <span className="font-medium">Linked to:</span> {document.linkedTo.name}
        </div>
      )}
    </div>
  );
};
