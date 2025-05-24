
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { openAiApi } from "@/services/api/openAiApi";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal = ({ open, onOpenChange, onSave }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(true);

  // Load saved API key if available
  useEffect(() => {
    if (open) {
      const savedKey = openAiApi.getApiKey();
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, [open]);

  const handleSave = () => {
    onSave(apiKey);
    
    // If remember option is unchecked, clear the stored key after using it
    if (!rememberKey) {
      // We'll set a session-only flag to clear on page refresh
      sessionStorage.setItem("openai_temp_key", apiKey);
      localStorage.removeItem("p2ra_openai_api_key");
    }
    
    setApiKey("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable OpenAI integration.
            Your key can be stored securely in your browser's local storage.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-key" 
              checked={rememberKey} 
              onCheckedChange={(checked) => setRememberKey(checked === true)}
            />
            <Label htmlFor="remember-key" className="text-sm text-gray-600">
              Remember API key (saves in browser local storage)
            </Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
            onClick={handleSave}
            disabled={!apiKey.trim()}
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
