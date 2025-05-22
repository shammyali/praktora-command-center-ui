
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  SearchIcon, 
  HomeIcon, 
  FolderIcon, 
  FileTextIcon,
  UsersIcon,
  HistoryIcon,
  SettingsIcon,
  MessageSquareIcon,
  MessageCircleIcon,
  MailIcon,
  SparklesIcon
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string | number;
  dots?: number;
  redDot?: boolean;
  greenDot?: boolean;
  onClick?: () => void;
  to?: string;
}

const SidebarItem = ({ icon: Icon, label, active, badge, dots, redDot, greenDot, onClick, to }: SidebarItemProps) => {
  const content = (
    <>
      <Icon className={cn("h-5 w-5", active && "text-[#9C2D55]")} />
      <span className="flex-grow text-left">{label}</span>
      {dots && (
        <div className="flex gap-1 ml-2">
          {Array.from({ length: dots }).map((_, i) => (
            <span 
              key={i} 
              className="h-2 w-2 rounded-full bg-green-500"
              style={{
                animation: 'dot-progress 1.5s infinite',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      {redDot && (
        <span 
          className="h-2.5 w-2.5 rounded-full bg-red-500 ml-2"
          style={{
            animation: 'red-dot-pulse 1.5s infinite'
          }}
        />
      )}
      {greenDot && (
        <span 
          className="h-2.5 w-2.5 rounded-full bg-green-500 ml-2"
          style={{
            animation: 'green-dot-pulse 1.5s infinite'
          }}
        />
      )}
      {badge && (
        <span className={cn(
          "ml-auto rounded-full px-2 py-0.5 text-xs",
          typeof badge === "string" && badge.toLowerCase() === "new" 
            ? "bg-blue-100 text-blue-800" 
            : redDot
              ? "bg-red-100 text-red-800"
              : greenDot
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
        )}>
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          active && "bg-sidebar-accent font-medium text-[#9C2D55]"
        )}
        onClick={onClick}
        asChild
      >
        <Link to={to}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent font-medium text-[#9C2D55]"
      )}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

const AISupportChat = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]);

  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: query}]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (query.toLowerCase().includes("endorsement")) {
        response = "To create an endorsement, go to the policy details page and click the 'New Endorsement' button in the top right corner.";
      } else if (query.toLowerCase().includes("upload") || query.toLowerCase().includes("id")) {
        response = "Yes, you can upload a scanned Emirates ID. Go to 'Policyholders', select the customer, then click 'Documents' tab and use the upload function.";
      } else if (query.toLowerCase().includes("invoice") || query.toLowerCase().includes("invoices")) {
        response = "Pending invoices can be found under 'Finance' > 'Accounts Receivable' > 'Pending Invoices' section.";
      } else {
        response = "I don't have specific information about that. Would you like me to log a support request for you?";
      }
      
      setMessages(prev => [...prev, {type: 'ai', content: response}]);
    }, 1000);
    
    setQuery("");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-praktora-burgundy">P²RA Assistant</h3>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-600">Active</span>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md h-60 overflow-y-auto p-2 flex flex-col gap-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-auto text-xs">
            <SparklesIcon className="h-6 w-6 mx-auto mb-2 text-praktora-burgundy opacity-50" />
            <p>Ask P²RA anything about the platform.</p>
            <p className="text-xs text-gray-400 mt-1">Try: "How do I create an endorsement?"</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={cn(
              "rounded-lg p-2 max-w-[80%] text-sm",
              msg.type === 'user' 
                ? "bg-gray-100 ml-auto" 
                : "bg-praktora-burgundy/10 mr-auto"
            )}>
              {msg.content}
            </div>
          ))
        )}
      </div>
      
      <div className="flex gap-2">
        <Input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask P²RA..."
          className="text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button 
          size="sm"
          onClick={handleSendMessage}
          className="bg-praktora-burgundy hover:bg-praktora-burgundy/80"
          disabled={!query.trim()}
        >
          Ask
        </Button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-200 bg-sidebar">
      <div className="flex items-center gap-2 px-4 py-2">
        <SearchIcon className="h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search"
          className="h-9 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem 
            icon={HomeIcon} 
            label="P²RA" 
            active={location.pathname === "/"} 
            to="/" 
          />
          <SidebarItem 
            icon={HomeIcon} 
            label="Dashboard" 
            active={location.pathname === "/dashboard"} 
            to="/dashboard" 
          />
          <SidebarItem 
            icon={FolderIcon} 
            label="Live Workflows" 
            badge={7} 
            greenDot={true} 
            active={location.pathname === "/workflows"}
            to="/workflows"
          />
          <SidebarItem 
            icon={MessageCircleIcon} 
            label="WhatsApp" 
            badge={3} 
            greenDot={true}
            active={location.pathname === "/whatsapp"}
            to="/whatsapp" 
          />
          <SidebarItem 
            icon={FileTextIcon} 
            label="Active Enquiries" 
            dots={3}
            active={location.pathname === "/enquiries"}
            to="/enquiries"
          />
          <SidebarItem 
            icon={UsersIcon} 
            label="Policyholders" 
            badge="NEW" 
          />
          <SidebarItem 
            icon={MailIcon} 
            label="Unactioned email" 
            badge={5} 
            redDot={true} 
          />
          <SidebarItem 
            icon={HistoryIcon} 
            label="History" 
          />
        </nav>

        <Separator className="my-4" />

        <div className="px-3 text-xs font-semibold text-gray-400 mb-2">
          Support & AI Assistance
        </div>
        <nav className="grid gap-1 px-2">
          <SidebarItem 
            icon={MessageSquareIcon} 
            label="Ask P²RA" 
            active={false} 
            to="/dashboard" 
          />
          <SidebarItem icon={SettingsIcon} label="Settings" />
        </nav>
      </div>
      
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-praktora-burgundy text-white flex items-center justify-center font-medium">
            BP
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Broker Profile</span>
            <span className="text-xs text-gray-500">broker@praktora.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
