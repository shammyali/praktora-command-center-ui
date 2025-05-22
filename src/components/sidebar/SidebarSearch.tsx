
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const SidebarSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <SearchIcon className="h-4 w-4 text-gray-400" />
      <Input
        type="search"
        placeholder="Search"
        className="h-9 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SidebarSearch;
