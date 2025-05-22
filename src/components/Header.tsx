
import { MoonIcon, BellIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-praktora-burgundy mr-2">
            P²RA — Intelligence in Motion
          </h1>
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
