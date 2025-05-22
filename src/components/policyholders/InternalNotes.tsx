
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Note = {
  id: string;
  content: string;
  timestamp: string;
  agentName: string;
  isPrivate: boolean;
  category: "broker" | "compliance";
};

const InternalNotes = () => {
  // Sample data - would be replaced with real data from API
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      content: "Prefers RSA quotes, not AXA. Always asks about additional discounts for multi-policy.",
      timestamp: "12-May-2026 09:32",
      agentName: "Sarah Johnson",
      isPrivate: false,
      category: "broker"
    },
    {
      id: "2",
      content: "Client requested special terms on medical for pre-existing condition coverage.",
      timestamp: "03-Apr-2026 15:17",
      agentName: "Ahmed Hassan",
      isPrivate: true,
      category: "broker"
    },
    {
      id: "3",
      content: "KYC documents expiry dates need special tracking - set reminder for Feb 2027.",
      timestamp: "22-Mar-2026 11:05",
      agentName: "Fatima Al Qasimi",
      isPrivate: false,
      category: "compliance"
    }
  ]);
  
  const [newNote, setNewNote] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [activeTab, setActiveTab] = useState("broker");
  
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: (notes.length + 1).toString(),
      content: newNote,
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      agentName: "Current User",
      isPrivate: isPrivate,
      category: activeTab as "broker" | "compliance"
    };
    
    setNotes([...notes, note]);
    setNewNote("");
    setIsPrivate(false);
    toast.success("Note added successfully");
  };
  
  const filteredNotes = notes.filter(note => note.category === activeTab);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Internal Notes & Flags</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="broker" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="broker" className="flex-1">Broker Notes</TabsTrigger>
            <TabsTrigger value="compliance" className="flex-1">Compliance Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="broker" className="pt-4">
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div key={note.id} className="p-3 bg-background rounded-md border border-border">
                  <p className="text-sm">{note.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      {note.agentName} • {note.timestamp}
                    </p>
                    {note.isPrivate && (
                      <Badge variant="outline" className="text-xs">Private</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="pt-4">
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div key={note.id} className="p-3 bg-background rounded-md border border-border">
                  <p className="text-sm">{note.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      {note.agentName} • {note.timestamp}
                    </p>
                    {note.isPrivate && (
                      <Badge variant="outline" className="text-xs">Private</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 space-y-2">
          <Textarea 
            placeholder="Add a new note..." 
            className="resize-none"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsPrivate(!isPrivate)}
              className={isPrivate ? "bg-muted" : ""}
            >
              {isPrivate ? "Private Note" : "Public Note"}
            </Button>
            <Button 
              size="sm"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              Add Note
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalNotes;
