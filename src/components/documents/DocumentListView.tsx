
import { Document } from "@/types/documentTypes";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { EmptyDocumentsTable } from "./list-view-components/EmptyDocumentsTable";
import { DocumentTableRow } from "./list-view-components/DocumentTableRow";
import { DocumentTableHeader } from "./list-view-components/DocumentTableHeader";

interface DocumentListViewProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (doc: Document, selected: boolean) => void;
  onViewDocument: (doc: Document) => void;
}

const DocumentListView = ({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onViewDocument,
}: DocumentListViewProps) => {
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      onDocumentSelect({ ...documents[0], id: "all" }, true);
    } else {
      onDocumentSelect({ ...documents[0], id: "none" }, false);
    }
  };

  if (documents.length === 0) {
    return <EmptyDocumentsTable />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <DocumentTableHeader
          documents={documents}
          selectedDocuments={selectedDocuments}
          onSelectAll={handleSelectAll}
        />
        <TableBody>
          {documents.map((doc) => (
            <DocumentTableRow
              key={doc.id}
              doc={doc}
              selected={selectedDocuments.includes(doc.id)}
              onSelectDocument={onDocumentSelect}
              onViewDocument={onViewDocument}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentListView;
