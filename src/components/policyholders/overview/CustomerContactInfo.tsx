
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
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium text-sm">Contact Info</h3>
        <div className="flex items-center gap-1">
          <Switch 
            id="vip-mode" 
            checked={isVip} 
            onCheckedChange={onVipStatusChange}
          />
          <Label htmlFor="vip-mode" className="text-xs">VIP</Label>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Mail className="h-3.5 w-3.5 text-gray-500" />
          <p className="text-sm truncate max-w-[150px]">{email}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEmailContact}
            className="p-1 h-auto"
          >
            <Mail className="h-3 w-3 text-praktora-burgundy" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-3.5 w-3.5 text-gray-500" />
          <p className="text-sm">{mobile}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePhoneContact}
            className="p-1 h-auto"
          >
            <Phone className="h-3 w-3 text-praktora-burgundy" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5 text-gray-500" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleWhatsAppContact}
            className="p-0.5 h-auto text-xs"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContactInfo;
