
import { Document, DocumentType } from "@/types/documentTypes";
import { Badge } from "@/components/ui/badge";

interface DocumentTypeBadgeProps {
  type: DocumentType;
}

export const DocumentTypeBadge = ({ type }: DocumentTypeBadgeProps) => {
  let className = "bg-gray-50 border-gray-200 text-gray-800";
  
  switch (type) {
    case "Policy Schedule":
      className = "bg-blue-50 border-blue-200 text-blue-800";
      break;
    case "Invoice":
      className = "bg-green-50 border-green-200 text-green-800";
      break;
    case "Emirates ID":
    case "Passport Copy":
      className = "bg-red-50 border-red-200 text-red-800";
      break;
    case "Endorsement":
      className = "bg-amber-50 border-amber-200 text-amber-800";
      break;
    case "Statement of Account":
      className = "bg-purple-50 border-purple-200 text-purple-800";
      break;
    case "Quote":
      className = "bg-cyan-50 border-cyan-200 text-cyan-800";
      break;
    case "Wordings":
      className = "bg-indigo-50 border-indigo-200 text-indigo-800";
      break;
    case "Trade License":
      className = "bg-emerald-50 border-emerald-200 text-emerald-800";
      break;
    case "Proposal":
      className = "bg-orange-50 border-orange-200 text-orange-800";
      break;
  }
  
  return <Badge variant="outline" className={className}>{type}</Badge>;
};
