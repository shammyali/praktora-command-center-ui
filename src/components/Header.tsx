
import { MoonIcon, BellIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/d0552695-0b71-4745-ba07-934a5776da0e.png" 
            alt="P²RA Logo" 
            className="h-10"
          />
        </div>
        
        {/* Centered company name and tagline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-praktora-burgundy">
            PRAKTORA_PRÁXIS
          </h1>
          <p className="text-xs text-gray-500">P²RA: INTELLIGENCE IN MOTION</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoonIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
            Switch to PraktoraWeb
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-praktora-burgundy text-white">BP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
