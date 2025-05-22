
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CommandCenter from "@/components/CommandCenter";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <Link to="/dashboard">
              <Button className="bg-praktora-burgundy hover:bg-praktora-burgundy/90 mb-4 text-lg flex items-center px-6 py-6 animate-pulse">
                Go to P²RA Control Center
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mb-6">
              ⬆️ Click here to navigate to the dashboard with all the features
            </p>
          </div>
          <CommandCenter />
        </div>
      </div>
    </div>
  );
};

export default Index;
