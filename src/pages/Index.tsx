
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CommandCenter from "@/components/CommandCenter";
import { Link } from "react-router-dom";
import { ArrowRight, MousePointerClick } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-praktora-burgundy/20 mb-8">
              <h2 className="text-xl font-bold text-praktora-burgundy mb-4 text-center">Dashboard Navigation</h2>
              <p className="text-gray-600 mb-4 text-center">
                Click the button below to access the P²RA Control Center Dashboard
              </p>
              <Link to="/dashboard" className="block w-full">
                <Button className="w-full bg-praktora-burgundy hover:bg-praktora-burgundy/90 mb-2 text-lg flex items-center justify-center py-6 gap-3">
                  <MousePointerClick className="h-5 w-5" />
                  Go to P²RA Control Center
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  Dashboard is ready
                </span>
              </div>
            </div>
            
            <div className="w-full">
              <CommandCenter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
