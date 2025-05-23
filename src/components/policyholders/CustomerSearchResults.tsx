
import { Customer } from "@/services/api/praktoraWebApi";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Building2, Star } from "lucide-react";

interface CustomerSearchResultsProps {
  customers: Customer[];
  total: number;
  isSearching: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerSearchResults = ({
  customers,
  total,
  isSearching,
  hasMore,
  onLoadMore,
  onSelectCustomer,
}: CustomerSearchResultsProps) => {
  if (isSearching && customers.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4 flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-praktora-burgundy" />
          <span className="ml-2">Searching customers...</span>
        </CardContent>
      </Card>
    );
  }

  if (!isSearching && customers.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="mb-3 flex justify-between items-center">
          <h3 className="text-sm font-medium">
            Found {total} matching customer{total !== 1 ? "s" : ""}
          </h3>
        </div>

        <ScrollArea className="max-h-[300px] pr-4">
          <div className="space-y-2">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                onClick={() => onSelectCustomer(customer)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {customer.type === "Individual" ? (
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    ) : (
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{customer.fullName}</span>
                        {customer.isVip && (
                          <Badge className="bg-amber-500">
                            <Star className="h-3 w-3 mr-1" />
                            VIP
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="mr-2">Code: {customer.code}</span>
                        {customer.email && <span className="mr-2">• {customer.email}</span>}
                        {customer.mobile && <span>• {customer.mobile}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <Badge
                    className={
                      customer.status === "Active" ? "bg-green-500" : 
                      customer.status === "Inactive" ? "bg-gray-500" :
                      customer.status === "Dormant" ? "bg-amber-500" : "bg-red-500"
                    }
                  >
                    {customer.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={onLoadMore} disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Results"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerSearchResults;
