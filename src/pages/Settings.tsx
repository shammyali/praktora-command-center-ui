
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SettingsLayout from "@/components/settings/SettingsLayout";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  useEffect(() => {
    // Notify user when settings page is loaded
    toast({
      title: "Settings loaded",
      description: "Your system configuration settings are ready for adjustment",
      duration: 3000,
    });
  }, []);

  return (
    <Layout>
      <SettingsLayout />
    </Layout>
  );
};

export default Settings;
