
import { Document, DocumentStatus, DocumentType } from "@/types/documentTypes";
import { FileText, Eye, Download, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  onViewDocument 
}: DocumentListViewProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
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

  if (documents.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
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
          <TableBody>
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                <FileText className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  No documents found
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your filters or search query
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
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
                onChange={(e) => {
                  if (e.target.checked) {
                    onDocumentSelect({...documents[0], id: 'all'}, true);
                  } else {
                    onDocumentSelect({...documents[0], id: 'none'}, false);
                  }
                }}
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
        <TableBody>
          {documents.map((doc) => (
            <TableRow
              key={doc.id}
              className={selectedDocuments.includes(doc.id) ? "bg-blue-50" : ""}
            >
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={(e) =>
                    onDocumentSelect(doc, e.target.checked)
                  }
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
              <TableCell>{getStatusBadge(doc.status)}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentListView;
