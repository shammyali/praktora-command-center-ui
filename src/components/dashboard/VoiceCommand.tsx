
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface VoiceCommandProps {
  onCommand: (command: string) => void;
}

const VoiceCommand = ({ onCommand }: VoiceCommandProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = () => {
    setIsListening(true);
    
    // Simulated voice command processing
    const exampleCommands = [
      "P²RA, show me the top 5 delayed claims",
      "Summarize today's activity in 2 lines"
    ];
    
    // Randomly select one of the example commands
    const randomCommand = exampleCommands[Math.floor(Math.random() * exampleCommands.length)];
    
    toast.info("Processing voice command...");
    
    // Simulate processing time
    setTimeout(() => {
      toast.success(`Command recognized: "${randomCommand}"`);
      onCommand(randomCommand);
      setIsListening(false);
    }, 2000);
  };
  
  return (
    <Button
      onClick={handleVoiceCommand}
      variant="outline"
      className="bg-praktora-burgundy/10 hover:bg-praktora-burgundy/20 border-praktora-burgundy/30 text-praktora-burgundy"
      disabled={isListening}
    >
      {isListening ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Listening...
        </>
      ) : (
        <>
          <Mic className="h-4 w-4 mr-2" />
          Voice Command
        </>
      )}
    </Button>
  );
};

export default VoiceCommand;
