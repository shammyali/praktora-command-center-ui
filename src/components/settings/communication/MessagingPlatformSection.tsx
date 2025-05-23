
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface MessagingPlatformSectionProps {
  whatsappParsing: boolean;
  setWhatsappParsing: React.Dispatch<React.SetStateAction<boolean>>;
  telegramParsing: boolean;
  setTelegramParsing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessagingPlatformSection = ({ 
  whatsappParsing, 
  setWhatsappParsing,
  telegramParsing,
  setTelegramParsing
}: MessagingPlatformSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="whatsapp-parsing" className="text-base font-medium">WhatsApp Parsing</Label>
          <p className="text-sm text-muted-foreground">Automatically parse WhatsApp messages</p>
        </div>
        <Switch 
          id="whatsapp-parsing" 
          checked={whatsappParsing} 
          onCheckedChange={setWhatsappParsing}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="telegram-parsing" className="text-base font-medium">Telegram Bot Parsing</Label>
          <p className="text-sm text-muted-foreground">Automatically parse Telegram messages</p>
        </div>
        <Switch 
          id="telegram-parsing" 
          checked={telegramParsing} 
          onCheckedChange={setTelegramParsing}
        />
      </div>
    </div>
  );
};

export default MessagingPlatformSection;
