
import { Document, DocumentStatus } from "@/types/documentTypes";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Link, AlertTriangle } from "lucide-react";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

export const DocumentStatusBadge = ({ status }: DocumentStatusBadgeProps) => {
  switch (status) {
    case "Linked":
      return (
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Linked
        </Badge>
      );
    case "Unlinked":
      return (
        <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-800 flex items-center gap-1">
          <Link className="h-3 w-3" />
          Unlinked
        </Badge>
      );
    case "Expired":
      return (
        <Badge variant="outline" className="bg-red-50 border-red-200 text-red-800 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Expired
        </Badge>
      );
    case "Duplicate":
      return (
        <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Duplicate
        </Badge>
      );
    case "Suggested":
      return (
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Needs Review
        </Badge>
      );
    default:
      return null;
  }
};
