
import Layout from "@/components/Layout";
import CommandCenter from "@/components/CommandCenter";
import WelcomeCard from "@/components/welcome/WelcomeCard";

const Index = () => {
  return (
    <Layout subtitle="Command Console">
      <div className="flex flex-col items-center">
        <WelcomeCard />
        
        <div className="w-full">
          <CommandCenter />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
