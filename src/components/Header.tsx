
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [notifications] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/66a81866-061b-4545-bd43-d1742f06411f.png" 
            alt="P²RA Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-praktora-burgundy">P²RA</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
