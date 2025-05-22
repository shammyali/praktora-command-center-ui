
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CommandCenter from "@/components/CommandCenter";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <CommandCenter />
      </div>
    </div>
  );
};

export default Index;
