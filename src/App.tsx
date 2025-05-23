
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LiveWorkflows from "./pages/LiveWorkflows";
import WhatsAppHub from "./pages/WhatsAppHub";
import ActiveEnquiries from "./pages/ActiveEnquiries";
import PolicyholderProfile from "./pages/PolicyholderProfile";
import UnactionedEmailHub from "./pages/UnactionedEmailHub";
import TelegramHub from "./pages/TelegramHub";
import IntelligenceHub from "./pages/IntelligenceHub";
import P2RARadarHub from "./pages/P2RARadarHub";
import ConversionFunnels from "./pages/ConversionFunnels";
import AutomationsLab from "./pages/AutomationsLab";
import HistoryEventCenter from "./pages/HistoryEventCenter";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflows" element={<LiveWorkflows />} />
          <Route path="/whatsapp" element={<WhatsAppHub />} />
          <Route path="/enquiries" element={<ActiveEnquiries />} />
          <Route path="/policyholders" element={<PolicyholderProfile />} />
          <Route path="/emails" element={<UnactionedEmailHub />} />
          <Route path="/telegram" element={<TelegramHub />} />
          <Route path="/intelligence" element={<IntelligenceHub />} />
          <Route path="/radar" element={<P2RARadarHub />} />
          <Route path="/funnels" element={<ConversionFunnels />} />
          <Route path="/automations" element={<AutomationsLab />} />
          <Route path="/history" element={<HistoryEventCenter />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
