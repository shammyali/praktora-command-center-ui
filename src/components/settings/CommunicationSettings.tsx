
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// DndKit for the drag-and-drop functionality
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="bg-white p-3 mb-2 rounded-md border flex items-center justify-between cursor-grab"
    >
      {children}
      <span className="text-gray-400">⋮⋮</span>
    </div>
  );
};

const CommunicationSettings = () => {
  const [whatsappParsing, setWhatsappParsing] = useState(true);
  const [telegramParsing, setTelegramParsing] = useState(true);
  const [emailSubjectRule, setEmailSubjectRule] = useState("");
  const [attachmentParsing, setAttachmentParsing] = useState(true);
  const [autoLinking, setAutoLinking] = useState(true);
  
  // Channel priority
  const [channels, setChannels] = useState([
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'telegram', name: 'Telegram' },
    { id: 'email', name: 'Email' },
    { id: 'direct', name: 'Direct Call' },
  ]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setChannels((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
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
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Email Parsing Rules</h3>
          
          <div className="space-y-3">
            <Label htmlFor="email-subject" className="text-sm">Subject Contains</Label>
            <Input 
              id="email-subject"
              value={emailSubjectRule}
              onChange={(e) => setEmailSubjectRule(e.target.value)}
              placeholder="Policy, Quote, Claim, etc."
            />
            <p className="text-xs text-muted-foreground">Comma-separated keywords to watch for in email subjects</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="attachment-parsing" className="text-sm">Attachment Present</Label>
              <p className="text-xs text-muted-foreground">Flag emails with attachments for priority processing</p>
            </div>
            <Switch 
              id="attachment-parsing" 
              checked={attachmentParsing} 
              onCheckedChange={setAttachmentParsing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-linking" className="text-sm">Auto-Linking Toggle</Label>
              <p className="text-xs text-muted-foreground">Automatically link communications to relevant entities</p>
            </div>
            <Switch 
              id="auto-linking" 
              checked={autoLinking} 
              onCheckedChange={setAutoLinking}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Channel Priority Order</h3>
          <p className="text-sm text-muted-foreground mb-3">Drag to reorder channels by priority (highest at top)</p>
          
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={channels.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {channels.map((channel) => (
                <SortableItem key={channel.id} id={channel.id}>
                  {channel.name}
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>

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
