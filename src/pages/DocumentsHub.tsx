
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Grid,
  List,
  SortAsc,
  Trash,
  Link as LinkIcon,
  MoreHorizontal,
  FileText,
  ChevronDown,
  ArrowUpDown,
  X,
  LayoutGrid
} from "lucide-react";
import DocumentFilterSidebar from "@/components/documents/DocumentFilterSidebar";
import DocumentCard from "@/components/documents/DocumentCard";
import DocumentDetailsPanel from "@/components/documents/DocumentDetailsPanel";
import DocumentUploadZone from "@/components/documents/DocumentUploadZone";
import DocumentAnalyticsPanel from "@/components/documents/DocumentAnalyticsPanel";
import { documentsData } from "@/data/documentsData";
import { Document, DocumentType, DocumentStatus, DocumentSource } from "@/types/documentTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DocumentsHub = () => {
  const [documents, setDocuments] = useState<Document[]>(documentsData);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documentsData);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<{
    searchText: string;
    types: DocumentType[];
    statuses: DocumentStatus[];
    sources: DocumentSource[];
  }>({
    searchText: "",
    types: [],
    statuses: [],
    sources: [],
  });

  useEffect(() => {
    // Apply active filters
    let result = [...documents];

    if (filters.searchText) {
      result = result.filter((doc) =>
        doc.fileName.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((doc) => filters.types.includes(doc.type));
    }

    if (filters.statuses.length > 0) {
      result = result.filter((doc) => filters.statuses.includes(doc.status));
    }

    if (filters.sources.length > 0) {
      result = result.filter((doc) => filters.sources.includes(doc.source));
    }

    if (searchQuery) {
      result = result.filter((doc) =>
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDocuments(result);
  }, [documents, filters, searchQuery]);

  const handleDocumentSelect = (doc: Document, selected: boolean) => {
    if (selected) {
      setSelectedDocuments([...selectedDocuments, doc.id]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== doc.id));
    }
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({
      searchText: newFilters.searchText || "",
      types: newFilters.types || [],
      statuses: newFilters.statuses || [],
      sources: newFilters.sources || [],
    });
  };

  const handleBulkAction = (action: string) => {
    if (action === "delete") {
      setDocuments(
        documents.filter((doc) => !selectedDocuments.includes(doc.id))
      );
      setSelectedDocuments([]);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const getDocumentTypeIcon = (type: DocumentType) => {
    return <FileText className="h-4 w-4" />;
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

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredDocuments.length > 0 ? (
        filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onViewDocument={handleViewDocument}
            onSelectDocument={handleDocumentSelect}
            selected={selectedDocuments.includes(doc.id)}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <FileText className="mx-auto h-10 w-10 text-gray-300 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );

  const renderListView = () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={
                  selectedDocuments.length === filteredDocuments.length &&
                  filteredDocuments.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDocuments(filteredDocuments.map((doc) => doc.id));
                  } else {
                    setSelectedDocuments([]);
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
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
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
                      handleDocumentSelect(doc, e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell
                  className="font-medium cursor-pointer hover:text-blue-600"
                  onClick={() => handleViewDocument(doc)}
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
                      onClick={() => handleViewDocument(doc)}
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
            ))
          ) : (
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
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Layout>
      <div className="flex h-full">
        <DocumentFilterSidebar onFilterChange={handleFilterChange} />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="bg-white border-b py-4 px-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-praktora-burgundy">
                P²RA Document Hub — Where Evidence Becomes Action
              </h1>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setShowAnalytics(!showAnalytics)}
                >
                  <Filter className="h-4 w-4" />
                  Analytics
                </Button>
                <Button 
                  className="gap-2 bg-praktora-burgundy hover:bg-praktora-burgundy/90"
                  onClick={() => setShowUploadZone(!showUploadZone)}
                >
                  <Plus className="h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              One place. Every file. Every link. Always know where it lives.
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-praktora-burgundy focus:border-transparent"
                  placeholder="Search documents by name, type, client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {selectedDocuments.length > 0 && (
                  <div className="flex items-center gap-2 mr-2">
                    <span className="text-sm font-medium">
                      {selectedDocuments.length} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => setSelectedDocuments([])}
                    >
                      <X className="h-4 w-4" /> Clear
                    </Button>
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={selectedDocuments.length === 0}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      disabled={selectedDocuments.length === 0}
                    >
                      Actions <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Link Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleBulkAction("delete")}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Documents
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-none rounded-l-md"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-none rounded-r-md"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <SortAsc className="h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <ArrowUpDown className="h-4 w-4 mr-2" rotate={180} />
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Name (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Name (Z-A)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Type
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {showUploadZone && (
              <div className="mb-6">
                <DocumentUploadZone onClose={() => setShowUploadZone(false)} />
              </div>
            )}
            
            {viewMode === "grid" ? renderGridView() : renderListView()}
          </div>
        </div>
        
        {selectedDocument && (
          <DocumentDetailsPanel
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}
        
        {showAnalytics && <DocumentAnalyticsPanel />}
      </div>
    </Layout>
  );
};

export default DocumentsHub;
