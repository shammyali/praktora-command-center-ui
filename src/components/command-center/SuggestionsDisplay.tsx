
import { SparklesIcon } from "lucide-react";

const SuggestionsDisplay = () => {
  return (
    <div className="h-full w-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
          <p className="text-[#5A6B82]/40 italic font-semibold">
            Try: 'Compare RSA and AXA for MP2118' or 'Create endorsement for GM123/1'
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
          <p className="text-[#5A6B82]/40 italic font-semibold">
            Try: 'Upload Emirates ID and generate new enquiry' or 'Convert quote MP2396 to policy and issue invoice'
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
          <p className="text-[#5A6B82]/40 italic font-semibold">
            Try: 'Send WhatsApp quote to Ali Qamar' or 'Download AXA motor policy's expiring today'
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
          <p className="text-[#5A6B82]/40 italic font-semibold">
            Try: 'Follow up on pending claims for Al Zahra Trading' or 'List all unpaid customer invoices over 30 days'
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsDisplay;
