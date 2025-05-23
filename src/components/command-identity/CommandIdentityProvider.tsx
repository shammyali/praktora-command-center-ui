
import { createContext, useContext, useState } from "react";

interface CommandIdentityContextType {
  isNodeConnected: boolean;
  setIsNodeConnected: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  sessionInfo: {
    sessionTime: string;
    ipAddress: string;
    geoLocation: string;
  };
  aiInfo: {
    aiSuggestion: string;
    aiAcceptanceRate: string;
    overrideCount: number;
  };
}

const CommandIdentityContext = createContext<CommandIdentityContextType | undefined>(undefined);

export const useCommandIdentity = () => {
  const context = useContext(CommandIdentityContext);
  if (!context) {
    throw new Error("useCommandIdentity must be used within a CommandIdentityProvider");
  }
  return context;
};

export const CommandIdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNodeConnected, setIsNodeConnected] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Static data for now, but could be dynamic in the future
  const sessionInfo = {
    sessionTime: "01h 42m active",
    ipAddress: "192.168.1.X",
    geoLocation: "DXB Server",
  };
  
  const aiInfo = {
    aiSuggestion: "Drafted renewal quote for MI002 @ 13:41",
    aiAcceptanceRate: "87%",
    overrideCount: 2,
  };
  
  const value = {
    isNodeConnected,
    setIsNodeConnected,
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    sessionInfo,
    aiInfo,
  };
  
  return (
    <CommandIdentityContext.Provider value={value}>
      {children}
    </CommandIdentityContext.Provider>
  );
};
