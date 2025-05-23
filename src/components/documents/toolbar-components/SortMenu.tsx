
import React from "react";
import { Button } from "@/components/ui/button";
import { SortAsc, ArrowUpDown, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SortMenu = () => {
  return (
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
  );
};
