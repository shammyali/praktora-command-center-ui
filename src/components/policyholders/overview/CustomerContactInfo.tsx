
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";
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
  fullName
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
      <h3 className="font-medium text-sm mr-4 inline-block">Contact Info</h3>
      
      <div className="flex items-center gap-4 mt-1">
        <div className="flex items-center gap-1">
          <Mail className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs truncate max-w-[120px]">{email}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEmailContact}
            className="p-0.5 h-auto"
          >
            <Mail className="h-3 w-3 text-praktora-burgundy" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Phone className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs">{mobile}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePhoneContact}
            className="p-0.5 h-auto"
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
            className="p-0 h-auto text-xs"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContactInfo;
