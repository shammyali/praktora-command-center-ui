
import { useLocation } from "react-router-dom";
import { 
  HomeIcon, 
  FolderIcon, 
  FileTextIcon,
  UsersIcon,
  MessageCircleIcon,
  MailIcon,
  BrainCircuitIcon,
  RadarIcon,
  BarChart4Icon,
  FlaskRoundIcon,
  HistoryIcon,
  SendIcon,
  SettingsIcon
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const SidebarNav = () => {
  const location = useLocation();

  return (
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
        active={location.pathname === "/policyholders"}
        to="/policyholders" 
      />
      <SidebarItem 
        icon={MailIcon} 
        label="Unactioned email" 
        badge={5} 
        redDot={true} 
        active={location.pathname === "/emails"}
        to="/emails"
      />
      <SidebarItem 
        icon={SendIcon} 
        label="Telegram" 
        badge={2}
        greenDot={true}
        active={location.pathname === "/telegram"}
        to="/telegram"
      />
      <SidebarItem 
        icon={BrainCircuitIcon} 
        label="Intelligence & Analytics" 
        active={location.pathname === "/intelligence"}
        to="/intelligence"
      />
      <SidebarItem 
        icon={RadarIcon} 
        label="P²RA Radar" 
        badge="NEW"
        active={location.pathname === "/radar"}
        to="/radar"
      />
      <SidebarItem 
        icon={BarChart4Icon} 
        label="Conversion Funnels" 
        active={location.pathname === "/funnels"}
        to="/funnels"
      />
      <SidebarItem 
        icon={FlaskRoundIcon} 
        label="Automations Lab"
        badge="BETA"
        active={location.pathname === "/automations"}
        to="/automations"
      />
      <SidebarItem 
        icon={HistoryIcon} 
        label="History" 
        active={location.pathname === "/history"}
        to="/history"
      />
      <SidebarItem 
        icon={SettingsIcon} 
        label="Settings" 
        active={location.pathname === "/settings"}
        to="/settings"
      />
    </nav>
  );
};

export default SidebarNav;
