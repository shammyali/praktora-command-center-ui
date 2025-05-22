
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUp, Eye, History } from "lucide-react";
import { toast } from "sonner";

type Document = {
  id: string;
  name: string;
  status: "valid" | "expired" | "missing";
  expiryDate: string | null;
  uploadedBy: string;
  uploadedOn: string;
};

const DocumentTracker = () => {
  // Sample data - would be replaced with real data from API
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Emirates ID",
      status: "valid",
      expiryDate: "15-Apr-2027",
      uploadedBy: "Sarah Johnson",
      uploadedOn: "02-Feb-2026",
    },
    {
      id: "2",
      name: "Passport Copy",
      status: "expired",
      expiryDate: "05-Jan-2026",
      uploadedBy: "Sarah Johnson",
      uploadedOn: "02-Feb-2025",
    },
    {
      id: "3",
      name: "VAT Certificate",
      status: "valid",
      expiryDate: null,
      uploadedBy: "Ahmed Hassan",
      uploadedOn: "15-Mar-2026",
    },
    {
      id: "4",
      name: "Utility Bill",
      status: "valid",
      expiryDate: null,
      uploadedBy: "Sarah Johnson",
      uploadedOn: "02-Feb-2026",
    },
    {
      id: "5",
      name: "Proof of Relationship",
      status: "missing",
      expiryDate: null,
      uploadedBy: "",
      uploadedOn: "",
    }
  ]);

  const handleUpload = (docId: string) => {
    toast.success("Document upload dialog would open here");
  };

  const handleView = (docId: string) => {
    toast.success("Document viewer would open here");
  };

  const handleViewAudit = (docId: string) => {
    toast.success("Audit log would open here");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Document Tracker</span>
          <Button size="sm" variant="outline" onClick={() => toast.success("Upload document dialog would open here")}>
            <FileUp className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      doc.status === "valid" ? "bg-green-500" : 
                      doc.status === "expired" ? "bg-red-500" : "bg-gray-400"
                    }
                  >
                    {doc.status === "valid" ? "Valid" : 
                     doc.status === "expired" ? "Expired" : "Missing"}
                  </Badge>
                </TableCell>
                <TableCell>{doc.expiryDate || "N/A"}</TableCell>
                <TableCell>{doc.status === "missing" ? "--" : doc.uploadedBy}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {doc.status !== "missing" ? (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => handleView(doc.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleViewAudit(doc.id)}>
                          <History className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleUpload(doc.id)}>
                        Upload
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentTracker;
