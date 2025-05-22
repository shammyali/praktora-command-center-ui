
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  FileText,
  Mail,
  MessageSquare,
  Star,
  AlertOctagon,
  CreditCard,
  Link
} from "lucide-react";

const SmartActionsBar = () => {
  const handleAction = (actionName: string) => {
    toast.success(`${actionName} action initiated`);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3 justify-between">
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Generate KYC PDF")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate KYC PDF
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Email KYC request")}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email KYC request
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Send WhatsApp message")}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send WhatsApp
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Mark as VIP")}
          >
            <Star className="h-4 w-4 mr-2" />
            Mark as VIP
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Escalate to compliance")}
          >
            <AlertOctagon className="h-4 w-4 mr-2" />
            Escalate
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Start Credit Review")}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Credit Review
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 min-w-fit"
            onClick={() => handleAction("Link to Legacy DB")}
          >
            <Link className="h-4 w-4 mr-2" />
            Legacy DB
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartActionsBar;
