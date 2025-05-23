
import { useState } from "react";
import { Document } from "@/types/documentTypes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DocumentPreview } from "./document-parts/DocumentPreview";
import { DocumentInfo } from "./document-parts/DocumentInfo";
import { DocumentActions } from "./document-parts/DocumentActions";

interface DocumentCardProps {
  document: Document;
  onViewDocument: (document: Document) => void;
  onSelectDocument: (document: Document, selected: boolean) => void;
  selected: boolean;
}

const DocumentCard = ({ document, onViewDocument, onSelectDocument, selected }: DocumentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        <DocumentPreview 
          fileName={document.fileName}
          preview={document.preview}
          confidence={document.confidence}
          fileScore={document.fileScore}
        />
        
        <DocumentInfo document={document} />
      </CardContent>
      
      <CardFooter className="p-2 justify-between pt-3 mt-3 border-t">
        <DocumentActions 
          document={document} 
          onViewDocument={onViewDocument}
        />
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
