
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CustomerContactInfoProps {
  email: string;
  mobile: string;
  isVip: boolean;
  fullName: string;
  onVipStatusChange: (checked: boolean) => void;
}

const CustomerContactInfo = ({ 
  email, 
  mobile, 
  isVip, 
  fullName, 
  onVipStatusChange 
}: CustomerContactInfoProps) => {
  const navigate = useNavigate();

  const handleEmailContact = () => {
    window.open(`mailto:${email}`);
    toast.success(`Opening email to ${email}`);
  };

  const handlePhoneContact = () => {
    window.open(`tel:${mobile}`);
    toast.success(`Calling ${mobile}`);
  };

  const handleWhatsAppContact = () => {
    // Navigate to internal WhatsApp module with the mobile number as a parameter
    const formattedMobile = mobile.replace(/\s+/g, "");
    navigate(`/whatsapp?phone=${formattedMobile}`);
    toast.success(`Opening WhatsApp chat for ${fullName}`);
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Contact Information</h3>
        <div className="flex items-center gap-2">
          <Switch 
            id="vip-mode" 
            checked={isVip} 
            onCheckedChange={onVipStatusChange}
          />
          <Label htmlFor="vip-mode">VIP Client</Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-y-2 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <div className="flex items-center gap-2">
            <p>{email}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleEmailContact}
              className="p-1 h-auto"
            >
              <Mail className="h-4 w-4 text-praktora-burgundy" />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Mobile</p>
          <div className="flex items-center gap-2">
            <p>{mobile}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePhoneContact}
              className="p-1 h-auto"
            >
              <Phone className="h-4 w-4 text-praktora-burgundy" />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">WhatsApp</p>
          <div className="flex items-center gap-2">
            <p>{mobile}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleWhatsAppContact}
              className="p-1 h-auto"
            >
              <MessageSquare className="h-4 w-4 text-praktora-burgundy" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerContactInfo;
