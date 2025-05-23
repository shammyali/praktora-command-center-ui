
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { PoliciesTab } from "./PoliciesTab";
import { EnquiriesTab } from "./EnquiriesTab";
import { ClaimsTab } from "./ClaimsTab";
import { FinancialsTab } from "./FinancialsTab";

export const PortfolioTabs = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="bg-[#F8F8F8] border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-praktora-burgundy" />
          Portfolio Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="policies" className="w-full">
          <TabsList className="w-full justify-start p-0 bg-gray-100 rounded-none border-b">
            <TabsTrigger 
              value="policies" 
              className="rounded-none border-r data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Policies
            </TabsTrigger>
            <TabsTrigger 
              value="enquiries"
              className="rounded-none border-r data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Enquiries
            </TabsTrigger>
            <TabsTrigger 
              value="claims"
              className="rounded-none border-r data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Claims
            </TabsTrigger>
            <TabsTrigger 
              value="financials"
              className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-praktora-burgundy"
            >
              Financial Actions
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Contents */}
          <TabsContent value="policies" className="p-0">
            <PoliciesTab />
          </TabsContent>
          
          <TabsContent value="enquiries" className="p-0">
            <EnquiriesTab />
          </TabsContent>
          
          <TabsContent value="claims" className="p-0">
            <ClaimsTab />
          </TabsContent>
          
          <TabsContent value="financials" className="p-0">
            <FinancialsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
