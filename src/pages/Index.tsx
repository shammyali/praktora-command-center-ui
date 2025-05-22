
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CommandCenter from "@/components/CommandCenter";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <Link to="/dashboard">
              <Button className="bg-praktora-burgundy hover:bg-praktora-burgundy/90 mb-4">
                Go to P²RA Control Center
              </Button>
            </Link>
          </div>
          <CommandCenter />
        </div>
      </div>
    </div>
  );
};

export default Index;
