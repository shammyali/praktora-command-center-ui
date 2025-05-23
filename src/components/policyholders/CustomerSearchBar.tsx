
import { useState, useRef, useEffect } from "react";
import { Search, X, User, Mail, Phone, FileText, CreditCard, FileCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerSearchBarProps {
  onSearch: (query: string, searchType: string) => void;
  isSearching: boolean;
  onClear: () => void;
}

const CustomerSearchBar = ({ onSearch, isSearching, onClear }: CustomerSearchBarProps) => {
  const [searchType, setSearchType] = useState<string>("name");
  const [query, setQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Debounce search to avoid too many API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim(), searchType);
      }
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [query, searchType, onSearch]);
  
  const handleClear = () => {
    setQuery("");
    onClear();
    searchInputRef.current?.focus();
  };

  const getSearchTypeIcon = () => {
    switch(searchType) {
      case "name": return <User className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "mobile": return <Phone className="h-4 w-4" />;
      case "code": return <CreditCard className="h-4 w-4" />;
      case "emiratesId": return <FileCheck className="h-4 w-4" />;
      case "passportNo": return <FileText className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };
  
  const getSearchPlaceholder = () => {
    switch(searchType) {
      case "name": return "Search by customer name...";
      case "email": return "Search by email address...";
      case "mobile": return "Search by mobile number...";
      case "code": return "Search by customer code...";
      case "emiratesId": return "Search by Emirates ID...";
      case "passportNo": return "Search by passport number...";
      default: return "Search customers...";
    }
  };
  
  return (
    <div className="flex gap-2 mb-6">
      <Select
        value={searchType}
        onValueChange={setSearchType}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Search by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Name</span>
            </div>
          </SelectItem>
          <SelectItem value="email">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </div>
          </SelectItem>
          <SelectItem value="mobile">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Mobile</span>
            </div>
          </SelectItem>
          <SelectItem value="code">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Customer Code</span>
            </div>
          </SelectItem>
          <SelectItem value="emiratesId">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Emirates ID</span>
            </div>
          </SelectItem>
          <SelectItem value="passportNo">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Passport No.</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {getSearchTypeIcon()}
        </div>
        <Input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={getSearchPlaceholder()}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomerSearchBar;
