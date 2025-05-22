
import { MoonIcon, BellIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Header = () => {
  return <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          {/* Logo moved to the left */}
          <img 
            src="/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png" 
            alt="Praktora Práxis Logo" 
            className="h-10 md:h-12" 
          />
        </div>
        
        {/* Command Panel in the center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <h1 className="text-lg font-semibold">Command Panel</h1>
          <p className="text-xs text-[#9C2D55]">P²RA is online — standing by for your command</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center mr-2">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
            <span className="text-xs text-gray-500">P²RA Status: Online</span>
          </div>
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
    </header>;
};

export default Header;
