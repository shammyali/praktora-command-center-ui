
import { MoonIcon, BellIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import CommandIdentityTrigger from "./CommandIdentityTrigger";
import BackButton from "./navigation/BackButton";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonFallbackPath?: string;
}

const Header = ({ title, subtitle, showBackButton = false, backButtonFallbackPath }: HeaderProps) => {
  return <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <BackButton fallbackPath={backButtonFallbackPath} />
          )}
          {/* Logo with subtle intelligent animation */}
          <img 
            src="/lovable-uploads/ec2aba3b-11d1-4ded-818c-83bc51c65a53.png" 
            alt="Praktora Práxis Logo" 
            className="h-10 md:h-12 transition-all duration-500 hover:scale-105 hover:shadow-md" 
          />
        </div>
        
        {/* Command Panel in the center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <h1 className="text-lg font-semibold text-praktora-burgundy relative">
            {title || "P²RA: Intelligence in Motion"}
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-praktora-burgundy overflow-hidden">
              <span className="absolute h-full w-[20%] bg-white/30 animate-shine"></span>
            </span>
          </h1>
          <p className="text-xs text-[#9C2D55]">{subtitle || "Connected. Listening. Ready for Execution..."}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center mr-2">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse-slow"></span>
            <span className="text-xs text-gray-600">P²RA Status: Online</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoonIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <a href="#" className="flex items-center gap-1">
            <img 
              src="/lovable-uploads/a312dc92-7543-4167-80ca-a8dd1b16bcc6.png" 
              alt="PraktoraWeb Logo" 
              className="h-6 transition-transform hover:scale-105" 
            />
            <ExternalLinkIcon className="h-4 w-4 text-blue-600 hover:text-blue-800" />
          </a>
          <CommandIdentityTrigger />
        </div>
      </div>
    </header>;
};

export default Header;
