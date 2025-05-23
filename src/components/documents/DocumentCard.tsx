
import { useState } from "react";
import { Document } from "@/types/documentTypes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Link, MoreHorizontal, AlertTriangle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DocumentCardProps {
  document: Document;
  onViewDocument: (document: Document) => void;
  onSelectDocument: (document: Document, selected: boolean) => void;
  selected: boolean;
}

const DocumentCard = ({ document, onViewDocument, onSelectDocument, selected }: DocumentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get appropriate status icon and color
  const getStatusBadge = () => {
    switch (document.status) {
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

  // Get the document type badge
  const getTypeBadge = () => {
    let className = "bg-gray-50 border-gray-200 text-gray-800";
    
    switch (document.type) {
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
    
    return <Badge variant="outline" className={className}>{document.type}</Badge>;
  };

  // Format the date to be more readable
  const formattedDate = () => {
    try {
      return format(new Date(document.dateAdded), "MMM dd, yyyy");
    } catch {
      return document.dateAdded;
    }
  };

  return (
    <Card 
      className={`${selected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'} cursor-pointer transition-all`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectDocument(document, !selected)}
    >
      <div className={`absolute right-2 top-2 bg-white rounded-md shadow-sm transition-opacity ${isHovered || selected ? 'opacity-100' : 'opacity-0'}`}>
        <input
          type="checkbox"
          checked={selected}
          className="h-5 w-5"
          onChange={(e) => {
            e.stopPropagation();
            onSelectDocument(document, e.target.checked);
          }}
        />
      </div>
      
      <CardContent className="p-3 pb-0">
        <div className="aspect-[3/4] bg-gray-100 rounded-md mb-3 overflow-hidden relative">
          <img 
            src={document.preview} 
            alt={document.fileName} 
            className="object-cover w-full h-full" 
          />
          
          {document.confidence && (
            <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl">
              {document.confidence}% AI confidence
            </div>
          )}
          
          {document.fileScore && (
            <div className="absolute top-0 right-0 bg-white/70 text-xs px-2 py-1 rounded-bl">
              Score: {document.fileScore}%
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm truncate" title={document.fileName}>
              {document.fileName}
            </h4>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs">
            {getTypeBadge()}
            {getStatusBadge()}
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
      </CardContent>
      
      <CardFooter className="p-2 justify-between pt-3 mt-3 border-t">
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
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
