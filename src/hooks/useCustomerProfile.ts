
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Customer, praktoraWebApi } from "@/services/api/praktoraWebApi";

export const useCustomerProfile = () => {
  // Customer search and selection state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  // Customer data loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Select customer
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    toast.success(`Loaded profile for ${customer.fullName}`);
  };
  
  // Initial data load
  useEffect(() => {
    // In a real implementation, you might want to load a default customer
    // or the last viewed customer from localStorage/session
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // For demo/development purposes, load the first mock customer
        const customer = await praktoraWebApi.getCustomerById("1");
        if (customer) {
          setSelectedCustomer(customer);
        }
      } catch (error) {
        console.error("Failed to load initial customer data", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  return {
    selectedCustomer,
    isLoading,
    handleSelectCustomer
  };
};
