
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SparklesIcon } from "lucide-react";

type Complaint = {
  id: string;
  type: "Claim" | "Quote" | "Service";
  status: "Open" | "Closed" | "Resolved";
  resolutionTime: string;
  summary: string;
};

const ComplaintHistory = () => {
  // Sample data - would be replaced with real data from API
  const complaints: Complaint[] = [
    {
      id: "CMT-2026-0012",
      type: "Claim",
      status: "Resolved",
      resolutionTime: "4 days",
      summary: "Delayed claim approval for medical expenses"
    },
    {
      id: "CMT-2026-0008",
      type: "Service",
      status: "Closed",
      resolutionTime: "2 days",
      summary: "Document missing for policy renewal"
    },
    {
      id: "CMT-2025-0037",
      type: "Quote",
      status: "Open",
      resolutionTime: "1 day (ongoing)",
      summary: "Quote higher than expected for motor insurance"
    }
  ];

  const getTotalPolicies = () => 12; // Would be from API
  const getComplaintPercentage = () => ((complaints.length / getTotalPolicies()) * 100).toFixed(1);
  const aiSummary = "3 complaints in the last 18 months — 2 related to medical claims.";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Complaint & Escalation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complaint ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resolution Time</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">{complaint.id}</TableCell>
                <TableCell>{complaint.type}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      complaint.status === "Open" ? "bg-amber-500" : 
                      complaint.status === "Closed" ? "bg-gray-500" : "bg-green-500"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>{complaint.resolutionTime}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={complaint.summary}>
                  {complaint.summary}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-sm">
              <span className="font-medium">{getComplaintPercentage()}%</span> of policies have had complaints
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#9C2D55]/5 p-2 px-3 rounded-md">
            <SparklesIcon className="h-4 w-4 text-[#9C2D55]" />
            <span className="text-sm">{aiSummary}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintHistory;
