
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  X,
  SortAsc,
  ArrowUpDown,
  ChevronDown,
  List,
  Download,
  Trash,
  Link as LinkIcon,
  LayoutGrid,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                onClick={() => onBulkAction("delete")}
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
  );
};

export default DocumentToolbar;
