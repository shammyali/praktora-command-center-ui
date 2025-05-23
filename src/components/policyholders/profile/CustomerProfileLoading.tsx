
import { Loader2 } from "lucide-react";

const CustomerProfileLoading = () => {
  return (
    <div className="flex justify-center items-center p-12">
      <Loader2 className="h-8 w-8 animate-spin text-praktora-burgundy" />
      <span className="ml-2 text-lg">Loading customer data...</span>
    </div>
  );
};

export default CustomerProfileLoading;
