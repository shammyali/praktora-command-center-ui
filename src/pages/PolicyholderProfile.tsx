
import Layout from "@/components/Layout";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import CustomerSearchPanel from "@/components/policyholders/search/CustomerSearchPanel";
import CustomerProfileContent from "@/components/policyholders/profile/CustomerProfileContent";
import CustomerProfileLoading from "@/components/policyholders/profile/CustomerProfileLoading";

const PolicyholderProfile = () => {
  const { selectedCustomer, isLoading, handleSelectCustomer } = useCustomerProfile();
  
  return (
    <Layout
      title="Policyholder Profile" 
      subtitle="Customer Intelligence Hub"
      showBackButton={false}
    >
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-6">
          {/* Customer Search Section */}
          <CustomerSearchPanel 
            onSelectCustomer={handleSelectCustomer}
            selectedCustomer={selectedCustomer}
          />
          
          {isLoading ? (
            <CustomerProfileLoading />
          ) : selectedCustomer ? (
            <CustomerProfileContent customer={selectedCustomer} />
          ) : null}
        </div>
      </main>
    </Layout>
  );
};

export default PolicyholderProfile;
