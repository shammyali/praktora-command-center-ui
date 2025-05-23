
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps) => {
  return (
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
  );
};
