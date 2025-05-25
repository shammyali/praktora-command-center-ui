
import { useState } from "react";
import { SearchBar } from "./toolbar-components/SearchBar";
import { ViewModeToggle } from "./toolbar-components/ViewModeToggle";
import { SortMenu } from "./toolbar-components/SortMenu";
import { BulkActionsMenu } from "./toolbar-components/BulkActionsMenu";
import { ToolbarHeader } from "./toolbar-components/ToolbarHeader";

interface DocumentToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  selectedDocuments: string[];
  setSelectedDocuments: (ids: string[]) => void;
  onBulkAction: (action: string) => void;
  showUploadZone: boolean;
  setShowUploadZone: (show: boolean) => void;
  showAnalytics: boolean;
  setShowAnalytics: (show: boolean) => void;
}

const DocumentToolbar = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  selectedDocuments,
  setSelectedDocuments,
  onBulkAction,
  showUploadZone,
  setShowUploadZone,
  showAnalytics,
  setShowAnalytics,
}: DocumentToolbarProps) => {
  return (
    <div className="bg-white border-b py-4 px-6">
      <ToolbarHeader 
        showUploadZone={showUploadZone}
        setShowUploadZone={setShowUploadZone}
        showAnalytics={showAnalytics}
        setShowAnalytics={setShowAnalytics}
      />
      
      <div className="text-sm text-gray-600 mb-4">
        One place. Every file. Every link. Always know where it lives.
      </div>

      <div className="flex justify-between items-center gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="flex items-center gap-2">
          <BulkActionsMenu 
            selectedDocuments={selectedDocuments}
            setSelectedDocuments={setSelectedDocuments}
            onBulkAction={onBulkAction}
          />
          
          <ViewModeToggle 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
          />
          
          <SortMenu />
        </div>
      </div>
    </div>
  );
};

export default DocumentToolbar;
