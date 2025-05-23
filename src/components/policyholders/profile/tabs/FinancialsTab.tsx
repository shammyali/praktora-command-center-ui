
import { CreditCard, Mail, MessageSquare, FileText, Eye } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type FinancialData = {
  outstandingTotal: string;
  lastPaymentDate: string;
  nextInvoiceDate: string;
};

// Mock data for development
const financialData: FinancialData = {
  outstandingTotal: "AED 16,400",
  lastPaymentDate: "2024-04-15",
  nextInvoiceDate: "2024-06-01",
};

export const FinancialsTab = () => {
  // Action handlers
  const handleSendStatement = (method: string) => {
    toast.success(`Statement sent via ${method}`);
  };

  const handleSetReminder = () => {
    toast.success("Reminder set for finance team");
  };

  const handleGeneratePDF = () => {
    toast.success("Generating Outstanding Summary PDF...");
  };

  return (
    <div className="p-6 grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-3xl font-bold text-praktora-burgundy">{financialData.outstandingTotal}</p>
                <p className="text-sm text-muted-foreground mt-1">Last payment: {new Date(financialData.lastPaymentDate).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Next invoice: {new Date(financialData.nextInvoiceDate).toLocaleDateString()}</p>
              </div>
              <CreditCard className="h-12 w-12 text-praktora-burgundy opacity-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => handleSendStatement('Email')}>
                <Mail className="mr-2 h-4 w-4" />
                Email Statement
              </Button>
              <Button variant="outline" onClick={() => handleSendStatement('WhatsApp')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp Statement
              </Button>
              <Button variant="outline" onClick={handleGeneratePDF}>
                <FileText className="mr-2 h-4 w-4" />
                Generate PDF
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Financial Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <p className="text-sm font-medium">Set payment reminder</p>
                <div className="flex gap-2">
                  <Input 
                    type="date" 
                    className="max-w-[200px]"
                  />
                  <Button onClick={handleSetReminder}>Set Reminder</Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <p className="text-sm font-medium">Payment History</p>
                <Button variant="outline" className="w-fit">
                  <Eye className="mr-2 h-4 w-4" />
                  View Payment History
                </Button>
              </div>
              
              <div className="grid gap-2">
                <p className="text-sm font-medium">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Mark as Paid</Button>
                  <Button variant="outline" size="sm">Add Note</Button>
                  <Button variant="outline" size="sm">Payment Plan</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
