
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";

interface ToolbarHeaderProps {
  showUploadZone: boolean;
  setShowUploadZone: (show: boolean) => void;
  showAnalytics: boolean;
  setShowAnalytics: (show: boolean) => void;
}

export const ToolbarHeader = ({
  showUploadZone,
  setShowUploadZone,
  showAnalytics,
  setShowAnalytics,
}: ToolbarHeaderProps) => {
  return (
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
  );
};
