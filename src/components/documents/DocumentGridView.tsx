
import { Document } from "@/types/documentTypes";
import DocumentCard from "./DocumentCard";
import { FileText } from "lucide-react";

interface DocumentGridViewProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (doc: Document, selected: boolean) => void;
  onViewDocument: (doc: Document) => void;
}

const DocumentGridView = ({ 
  documents, 
  selectedDocuments, 
  onDocumentSelect, 
  onViewDocument 
}: DocumentGridViewProps) => {
  if (documents.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <FileText className="mx-auto h-10 w-10 text-gray-300 mb-2" />
        <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
        <p className="text-sm text-gray-500 mt-1">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onViewDocument={onViewDocument}
          onSelectDocument={onDocumentSelect}
          selected={selectedDocuments.includes(doc.id)}
        />
      ))}
    </div>
  );
};

export default DocumentGridView;
