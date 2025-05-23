
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface IdentitySectionProps {
  name: string;
  role: string;
  isConnected: boolean;
  sessionTime: string;
  geoLocation: string;
  ipAddress: string;
}

const IdentitySection = ({ 
  name, 
  role, 
  isConnected, 
  sessionTime, 
  geoLocation, 
  ipAddress 
}: IdentitySectionProps) => {
  return (
    <div className="p-4 bg-gradient-to-r from-praktora-burgundy/10 to-transparent">
      <h3 className="text-sm font-semibold text-praktora-burgundy mb-1 flex items-center gap-1.5">
        <span className="bg-praktora-burgundy/20 w-5 h-5 rounded-full flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-praktora-burgundy animate-pulse"></span>
        </span>
        Node Control Deck — P²RA Operator Interface
      </h3>
      
      <div className="flex items-center gap-3 mt-3">
        <Avatar className="h-12 w-12 border-2 border-white shadow-md bg-praktora-burgundy">
          <AvatarImage src="/lovable-uploads/ebc38715-372d-4cc1-b293-cb0855312520.png" alt={name} />
          <AvatarFallback className="bg-praktora-burgundy text-white">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <h4 className="font-medium text-sm flex items-center">
            {name}
            <span className="ml-2 text-[10px] text-praktora-burgundy">Command Node</span>
          </h4>
          
          <div className="flex items-center gap-1.5 text-xs mt-1">
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="text-gray-600">Live in P²RA Mesh</span>
          </div>
          
          <div className="flex items-center justify-between w-full text-[10px] text-gray-500 mt-1">
            <span>{sessionTime}</span>
            <span>•</span>
            <span>{geoLocation}</span>
            <span>•</span>
            <span>{ipAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
