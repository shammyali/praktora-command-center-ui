
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Import our new components
import MessagingPlatformSection from "./communication/MessagingPlatformSection";
import EmailParsingSection from "./communication/EmailParsingSection";
import ChannelPrioritySection, { Channel } from "./communication/ChannelPrioritySection";

const CommunicationSettings = () => {
  const [whatsappParsing, setWhatsappParsing] = useState(true);
  const [telegramParsing, setTelegramParsing] = useState(true);
  const [emailSubjectRule, setEmailSubjectRule] = useState("");
  const [attachmentParsing, setAttachmentParsing] = useState(true);
  const [autoLinking, setAutoLinking] = useState(true);
  
  // Channel priority
  const [channels, setChannels] = useState<Channel[]>([
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'telegram', name: 'Telegram' },
    { id: 'email', name: 'Email' },
    { id: 'direct', name: 'Direct Call' },
  ]);
  
  const handleSave = () => {
    // Save settings logic
    console.log({
      whatsappParsing,
      telegramParsing,
      emailSubjectRule,
      attachmentParsing,
      autoLinking,
      channelPriority: channels.map(c => c.id)
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>Communication Parsing Settings</CardTitle>
        </div>
        <CardDescription>Configure how the system parses and prioritizes different communication channels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <MessagingPlatformSection
          whatsappParsing={whatsappParsing}
          setWhatsappParsing={setWhatsappParsing}
          telegramParsing={telegramParsing}
          setTelegramParsing={setTelegramParsing}
        />
        
        <Separator />
        
        <EmailParsingSection
          emailSubjectRule={emailSubjectRule}
          setEmailSubjectRule={setEmailSubjectRule}
          attachmentParsing={attachmentParsing}
          setAttachmentParsing={setAttachmentParsing}
          autoLinking={autoLinking}
          setAutoLinking={setAutoLinking}
        />
        
        <Separator />
        
        <ChannelPrioritySection
          channels={channels}
          setChannels={setChannels}
        />

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save Communication Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationSettings;
