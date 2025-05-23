
import React from "react";
import { DocumentStatus } from "@/types/documentTypes";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: DocumentStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "Linked":
      return (
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
          Linked
        </Badge>
      );
    case "Unlinked":
      return (
        <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">
          Unlinked
        </Badge>
      );
    case "Expired":
      return (
        <Badge variant="outline" className="bg-red-50 border-red-200 text-red-800">
          Expired
        </Badge>
      );
    case "Duplicate":
      return (
        <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
          Duplicate
        </Badge>
      );
    case "Suggested":
      return (
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
          Needs Review
        </Badge>
      );
    default:
      return null;
  }
};
