
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  FileText,
  MessageCircle,
  Flag,
  AlertTriangle,
  FileUp,
  Eye,
  RefreshCw,
  UserCheck,
  Mail,
  MessageSquare,
  Star,
  AlertOctagon,
  CreditCard,
  Link,
  Loader2
} from "lucide-react";

import PolicyholderOverview from "@/components/policyholders/PolicyholderOverview";
import KycRiskSummary from "@/components/policyholders/KycRiskSummary";
import DocumentTracker from "@/components/policyholders/DocumentTracker";
import ComplaintHistory from "@/components/policyholders/ComplaintHistory";
import LinkedEntities from "@/components/policyholders/LinkedEntities";
import InternalNotes from "@/components/policyholders/InternalNotes";
import SmartActionsBar from "@/components/policyholders/SmartActionsBar";
import PortfolioTracker from "@/components/policyholders/PortfolioTracker";
import CustomerSearchBar from "@/components/policyholders/CustomerSearchBar";
import CustomerSearchResults from "@/components/policyholders/CustomerSearchResults";
import { praktoraWebApi, type Customer, type SearchParams } from "@/services/api/praktoraWebApi";

const PolicyholderProfile = () => {
  // Customer search and selection state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);

  // Customer data loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
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
  
  // Select customer
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    toast.success(`Loaded profile for ${customer.fullName}`);
    // Clear search results after selection to clean up UI
    setSearchResults([]);
  };
  
  // Initial data load
  useEffect(() => {
    // In a real implementation, you might want to load a default customer
    // or the last viewed customer from localStorage/session
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // For demo/development purposes, load the first mock customer
        const customer = await praktoraWebApi.getCustomerById("1");
        if (customer) {
          setSelectedCustomer(customer);
        }
      } catch (error) {
        console.error("Failed to load initial customer data", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          title="Policyholder Profile" 
          subtitle="Customer Intelligence Hub"
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            {/* Customer Search Section */}
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
                  onSelectCustomer={handleSelectCustomer}
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
            
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-praktora-burgundy" />
                <span className="ml-2 text-lg">Loading customer data...</span>
              </div>
            ) : selectedCustomer ? (
              <>
                {/* Section 1: Policyholder Overview Panel */}
                <PolicyholderOverview customer={selectedCustomer} />
                
                {/* Section 2: Portfolio Tracker */}
                <PortfolioTracker />
                
                {/* Main content sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 grid gap-6">
                    {/* Section 3: KYC & Risk Summary */}
                    <KycRiskSummary />
                    
                    {/* Section 4: Document Tracker */}
                    <DocumentTracker />
                    
                    {/* Section 5: Complaint & Escalation History */}
                    <ComplaintHistory />
                  </div>
                  
                  <div className="grid gap-6">
                    {/* Section 6: Linked Entities */}
                    <LinkedEntities customerId={selectedCustomer.id} />
                    
                    {/* Section 7: Internal Notes & Flags */}
                    <InternalNotes customerId={selectedCustomer.id} />
                  </div>
                </div>
                
                {/* Section 8: Smart Actions Bar */}
                <SmartActionsBar />
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicyholderProfile;
