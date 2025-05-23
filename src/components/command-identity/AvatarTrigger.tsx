
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarTriggerProps {
  isConnected: boolean;
}

const AvatarTrigger = ({ isConnected }: AvatarTriggerProps) => {
  return (
    <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9 p-0">
      <Avatar className="h-9 w-9 border-2 border-white/10 shadow-lg bg-praktora-burgundy">
        <AvatarImage src="/lovable-uploads/ebc38715-372d-4cc1-b293-cb0855312520.png" alt="Shammy Ali" />
        <AvatarFallback className="bg-praktora-burgundy text-white text-xs font-medium">SA</AvatarFallback>
      </Avatar>
      <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
        {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
      </span>
    </Button>
  );
};

export default AvatarTrigger;
