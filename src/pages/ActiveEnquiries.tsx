import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { RefreshCw, Volume2, AlertTriangle, FileDown, BarChart2 } from "lucide-react";
import { 
  activeEnquiries, 
  EnquiryItem, 
  mockEnquiryStats,
  urgentEnquiries,
  quotedEnquiries
} from "@/data/enquiriesData";
import EnquiryTable from "@/components/enquiries/EnquiryTable";
import EnquiryFilters from "@/components/enquiries/EnquiryFilters";
import EnquirySidebar from "@/components/enquiries/EnquirySidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";

// New trend data for the mini trend view
const trendData = {
  conversionByClass: [
    { name: "Motor", rate: 67 },
    { name: "Medical", rate: 42 },
    { name: "Property", rate: 58 },
    { name: "Liability", rate: 31 },
  ],
  conversionBySource: [
    { name: "WhatsApp", rate: 72 },
    { name: "Portal", rate: 44 },
    { name: "Agent", rate: 63 },
    { name: "Direct", rate: 51 },
  ],
  dropoffReasons: [
    { name: "Quote Not Sent", count: 32 },
    { name: "No Client Reply", count: 48 },
    { name: "Delayed Pricing", count: 21 },
    { name: "Competitor Win", count: 14 },
  ]
};

export default function ActiveEnquiries() {
  const [filteredEnquiries, setFilteredEnquiries] = useState<EnquiryItem[]>(activeEnquiries);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showTrendView, setShowTrendView] = useState(false);
  
  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    
    // Simulate filtering delay
    setTimeout(() => {
      let result = [...activeEnquiries];
      
      // Filter by search query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        result = result.filter(
          enquiry => enquiry.id.toLowerCase().includes(query) || 
                     enquiry.customerName.toLowerCase().includes(query)
        );
      }
      
      // Filter by business classes
      if (filters.businessClasses && filters.businessClasses.length > 0) {
        result = result.filter(
          enquiry => filters.businessClasses.includes(enquiry.businessClass)
        );
      }
      
      // Filter by sources
      if (filters.sources && filters.sources.length > 0) {
        result = result.filter(
          enquiry => filters.sources.includes(enquiry.source)
        );
      }
      
      // Filter by status
      if (filters.status) {
        result = result.filter(
          enquiry => enquiry.status === filters.status
        );
      }
      
      // Filter by agents
      if (filters.agents && filters.agents.length > 0) {
        result = result.filter(
          enquiry => filters.agents.includes(enquiry.assignedAgent)
        );
      }
      
      // Filter by age
      if (filters.age) {
        const hours = parseInt(filters.age);
        result = result.filter(enquiry => {
          const daysOld = enquiry.age !== 'Today' ? parseInt(enquiry.age) : 0;
          return (daysOld * 24) > hours;
        });
      }
      
      setFilteredEnquiries(result);
      setIsLoading(false);
    }, 500);
  };
  
  // Handle selecting an enquiry
  const handleSelectEnquiry = (enquiry: EnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setSidebarOpen(true);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
      toast.success("Enquiries refreshed successfully");
    }, 800);
  };
  
  // Handle voice command
  const handleVoiceCommand = () => {
    toast.info("Voice command activated: 'Show urgent enquiries'");
    setFilteredEnquiries(urgentEnquiries);
  };

  // NEW: Handle export
  const handleExport = () => {
    toast.success("Exporting enquiries to Excel...");
    
    // Simulate export delay
    setTimeout(() => {
      toast.success("Enquiries exported successfully");
    }, 1500);
  };

  // NEW: Toggle trend view
  const toggleTrendView = () => {
    setShowTrendView(!showTrendView);
  };

  useEffect(() => {
    // Simulate initial loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <div className="p-4 pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-2xl font-bold text-praktora-burgundy">Active Enquiries</h1>
              <p className="text-sm text-gray-500">Enhanced Intelligence Mode</p>
            </div>
            
            <div className="flex items-center gap-2 self-start">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTrendView}
                className={`hidden sm:flex items-center gap-1 ${showTrendView ? 'border-praktora-burgundy text-praktora-burgundy' : ''}`}
              >
                <BarChart2 className="h-3.5 w-3.5" />
                Trend View
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                className="hidden sm:flex items-center gap-1"
              >
                <FileDown className="h-3.5 w-3.5" />
                Export
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleVoiceCommand}
                className="hidden sm:flex items-center gap-1"
              >
                <Volume2 className="h-3.5 w-3.5" />
                Voice Command
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <div className="text-xs text-gray-500 hidden md:block">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Total Enquiries</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">{mockEnquiryStats.total}</div>
                <CardDescription>Active across all channels</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Awaiting Action</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">{mockEnquiryStats.awaiting}</div>
                <CardDescription>Client response pending</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  <span>Urgent Attention</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-red-500">{mockEnquiryStats.urgent}</div>
                <CardDescription>Exceeding response SLAs</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">{mockEnquiryStats.conversion.rate}%</div>
                <CardDescription className="flex items-center">
                  <span className="text-green-600">{mockEnquiryStats.conversion.trend}</span>
                  <span className="ml-1">vs last week</span>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          {/* Mini Trend View */}
          {showTrendView && (
            <div className="mb-5 animate-fade-in">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Conversion Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {/* Conversion by Class */}
                    <div>
                      <h4 className="text-xs font-semibold mb-2">By Business Class</h4>
                      <div className="space-y-2">
                        {trendData.conversionByClass.map((item) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.rate}%</span>
                            </div>
                            <Progress value={item.rate} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Conversion by Source */}
                    <div>
                      <h4 className="text-xs font-semibold mb-2">By Source</h4>
                      <div className="space-y-2">
                        {trendData.conversionBySource.map((item) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.rate}%</span>
                            </div>
                            <Progress 
                              value={item.rate} 
                              className="h-1.5" 
                              indicatorClassName="bg-praktora-burgundy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Drop-off Reasons */}
                    <div>
                      <h4 className="text-xs font-semibold mb-2">Drop-off Reasons</h4>
                      <div className="space-y-2">
                        {trendData.dropoffReasons.map((item) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.count}</span>
                            </div>
                            <Progress 
                              value={(item.count / Math.max(...trendData.dropoffReasons.map(i => i.count))) * 100} 
                              className="h-1.5"
                              indicatorClassName="bg-amber-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Filters */}
          <div className="mb-4">
            <EnquiryFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Main Table */}
          <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <EnquiryTable 
              enquiries={filteredEnquiries}
              onSelectEnquiry={handleSelectEnquiry}
              selectedEnquiryId={selectedEnquiry?.id || null}
            />
            
            {filteredEnquiries.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No enquiries match your filters</p>
                <Button 
                  variant="link" 
                  onClick={() => handleFilterChange({})}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sidebar for enquiry details */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent className="w-full sm:w-[400px] p-0">
          <EnquirySidebar 
            enquiry={selectedEnquiry} 
            onClose={() => setSidebarOpen(false)} 
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
