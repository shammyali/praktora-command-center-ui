
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DocumentFilterSidebar from "@/components/documents/DocumentFilterSidebar";
import DocumentDetailsPanel from "@/components/documents/DocumentDetailsPanel";
import DocumentUploadZone from "@/components/documents/DocumentUploadZone";
import DocumentAnalyticsPanel from "@/components/documents/DocumentAnalyticsPanel";
import DocumentToolbar from "@/components/documents/DocumentToolbar";
import DocumentGridView from "@/components/documents/DocumentGridView";
import DocumentListView from "@/components/documents/DocumentListView";
import { documentsData } from "@/data/documentsData";
import { Document, DocumentType, DocumentStatus, DocumentSource } from "@/types/documentTypes";

const DocumentsHub = () => {
  const [documents, setDocuments] = useState<Document[]>(documentsData);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documentsData);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [filters, setFilters] = useState<{
    types: DocumentType[];
    statuses: DocumentStatus[];
    sources: DocumentSource[];
  }>({
    types: [],
    statuses: [],
    sources: [],
  });

  useEffect(() => {
    // Apply active filters
    let result = [...documents];

    if (filters.types.length > 0) {
      result = result.filter((doc) => filters.types.includes(doc.type));
    }

    if (filters.statuses.length > 0) {
      result = result.filter((doc) => filters.statuses.includes(doc.status));
    }

    if (filters.sources.length > 0) {
      result = result.filter((doc) => filters.sources.includes(doc.source));
    }

    setFilteredDocuments(result);
  }, [documents, filters]);

  const handleDocumentSelect = (doc: Document, selected: boolean) => {
    if (doc.id === 'all') {
      setSelectedDocuments(filteredDocuments.map(d => d.id));
      return;
    } 
    
    if (doc.id === 'none') {
      setSelectedDocuments([]);
      return;
    }
    
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

  return (
    <Layout>
      <div className="flex h-full pt-16">
        <DocumentFilterSidebar onFilterChange={handleFilterChange} />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <DocumentToolbar 
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedDocuments={selectedDocuments}
            setSelectedDocuments={setSelectedDocuments}
            onBulkAction={handleBulkAction}
            showUploadZone={showUploadZone}
            setShowUploadZone={setShowUploadZone}
            showAnalytics={showAnalytics}
            setShowAnalytics={setShowAnalytics}
          />

          <div className="p-6 flex-1 overflow-y-auto">
            {showUploadZone && (
              <div className="mb-6">
                <DocumentUploadZone onClose={() => setShowUploadZone(false)} />
              </div>
            )}
            
            {viewMode === "grid" ? (
              <DocumentGridView
                documents={filteredDocuments}
                selectedDocuments={selectedDocuments}
                onDocumentSelect={handleDocumentSelect}
                onViewDocument={handleViewDocument}
              />
            ) : (
              <DocumentListView
                documents={filteredDocuments}
                selectedDocuments={selectedDocuments}
                onDocumentSelect={handleDocumentSelect}
                onViewDocument={handleViewDocument}
              />
            )}
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
