
import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
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
  );
};
