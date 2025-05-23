
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FileIcon, Search, Filter, Plus, Eye, Download, Clock, FileText, FileCog } from "lucide-react";
import { useState } from "react";

const DocumentsHub = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample document data
  const documents = [
    { 
      id: 1, 
      name: "Policy Document - A123456", 
      type: "PDF",
      category: "Policy",
      uploadedBy: "System",
      uploadedDate: "2025-05-21",
      size: "1.2 MB",
      status: "active"
    },
    { 
      id: 2, 
      name: "Claim Form - CF78901", 
      type: "PDF",
      category: "Claims",
      uploadedBy: "Maria Lopez",
      uploadedDate: "2025-05-20",
      size: "845 KB",
      status: "pending"
    },
    { 
      id: 3, 
      name: "KYC Documentation - ID12345", 
      type: "ZIP",
      category: "KYC",
      uploadedBy: "James Wilson",
      uploadedDate: "2025-05-18",
      size: "3.4 MB",
      status: "active"
    },
    { 
      id: 4, 
      name: "Vehicle Insurance Certificate", 
      type: "PDF",
      category: "Certificate",
      uploadedBy: "Auto-generated",
      uploadedDate: "2025-05-15",
      size: "680 KB",
      status: "active"
    },
    { 
      id: 5, 
      name: "Renewal Terms - RT45678", 
      type: "DOCX",
      category: "Renewal",
      uploadedBy: "You",
      uploadedDate: "2025-05-13",
      size: "1.1 MB",
      status: "pending"
    }
  ];

  // Filter documents based on active tab
  const filteredDocuments = documents.filter(doc => {
    if (activeTab === "all") return true;
    if (activeTab === "policies") return doc.category === "Policy";
    if (activeTab === "claims") return doc.category === "Claims";
    if (activeTab === "kyc") return doc.category === "KYC";
    return true;
  }).filter(doc => {
    if (searchQuery) {
      return doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Documents Hub</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-praktora-burgundy hover:bg-praktora-burgundy/90">
            <Plus className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">184</div>
            <p className="text-xs text-muted-foreground">12 uploaded this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Policy Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">73</div>
            <p className="text-xs text-muted-foreground">4 pending renewal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claim Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">8 require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">KYC Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">69</div>
            <p className="text-xs text-muted-foreground">95% verified</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="gap-2">
            <FileText className="h-4 w-4" />
            All Documents
          </TabsTrigger>
          <TabsTrigger value="policies" className="gap-2">
            <FileIcon className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="claims" className="gap-2">
            <FileCog className="h-4 w-4" />
            Claims
          </TabsTrigger>
          <TabsTrigger value="kyc" className="gap-2">
            <FileText className="h-4 w-4" />
            KYC
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-0">
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Uploaded By</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Size</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{doc.name}</span>
                      </td>
                      <td className="p-4 align-middle">{doc.type}</td>
                      <td className="p-4 align-middle">
                        <span className={`px-2 py-1 rounded-md text-xs ${
                          doc.category === 'Policy' ? 'bg-blue-100 text-blue-800' : 
                          doc.category === 'Claims' ? 'bg-amber-100 text-amber-800' :
                          doc.category === 'KYC' ? 'bg-green-100 text-green-800' :
                          doc.category === 'Certificate' ? 'bg-purple-100 text-purple-800' :
                          doc.category === 'Renewal' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {doc.category}
                        </span>
                      </td>
                      <td className="p-4 align-middle">{doc.uploadedBy}</td>
                      <td className="p-4 align-middle">{doc.uploadedDate}</td>
                      <td className="p-4 align-middle">{doc.size}</td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="h-24 text-center">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default DocumentsHub;
