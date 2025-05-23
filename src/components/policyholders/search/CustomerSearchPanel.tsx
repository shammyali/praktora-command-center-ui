
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import CustomerSearchBar from "../CustomerSearchBar";
import CustomerSearchResults from "../CustomerSearchResults";
import { praktoraWebApi, type Customer, type SearchParams } from "@/services/api/praktoraWebApi";

interface CustomerSearchPanelProps {
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

const CustomerSearchPanel = ({ onSelectCustomer, selectedCustomer }: CustomerSearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);
  
  // Handle search
  const handleSearch = async (query: string, type: string) => {
    if (!query) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }
    
    setIsSearching(true);
    setSearchQuery(query);
    setSearchType(type);
    setCurrentPage(1);
    
    try {
      const searchParams: SearchParams = {
        query,
        searchType: type as any,
        page: 1,
        limit: 5
      };
      
      const response = await praktoraWebApi.searchCustomers(searchParams);
      
      setSearchResults(response.customers);
      setTotalResults(response.total);
      setHasMoreResults(response.hasMore);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search customers");
    } finally {
      setIsSearching(false);
    }
  };
  
  // Load more results
  const handleLoadMore = async () => {
    if (isSearching || !hasMoreResults) return;
    
    setIsSearching(true);
    const nextPage = currentPage + 1;
    
    try {
      const searchParams: SearchParams = {
        query: searchQuery,
        searchType: searchType as any,
        page: nextPage,
        limit: 5
      };
      
      const response = await praktoraWebApi.searchCustomers(searchParams);
      
      setSearchResults([...searchResults, ...response.customers]);
      setCurrentPage(nextPage);
      setHasMoreResults(response.hasMore);
    } catch (error) {
      console.error("Load more error:", error);
      toast.error("Failed to load more results");
    } finally {
      setIsSearching(false);
    }
  };
  
  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setTotalResults(0);
  };

  return (
    <Card className="border-t-4 border-t-[#9C2D55]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Customer Search</CardTitle>
      </CardHeader>
      <CardContent>
        <CustomerSearchBar 
          onSearch={handleSearch}
          isSearching={isSearching}
          onClear={handleClearSearch}
        />
        
        <CustomerSearchResults 
          customers={searchResults}
          total={totalResults}
          isSearching={isSearching}
          hasMore={hasMoreResults}
          onLoadMore={handleLoadMore}
          onSelectCustomer={onSelectCustomer}
        />
        
        {!selectedCustomer && searchResults.length === 0 && (
          <div className="text-center p-6 bg-muted/30 rounded-md">
            <h3 className="font-medium mb-2">No Customer Selected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Search for a customer by name, email, mobile number, or customer code to view their profile.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerSearchPanel;
