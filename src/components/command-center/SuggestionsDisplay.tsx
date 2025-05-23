
import { SparklesIcon } from "lucide-react";

const SuggestionsDisplay = () => {
  return (
    <div className="h-full w-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
      <div className="flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
        <p className="text-[#5A6B82]/40 italic font-semibold">
          Type your question or command here...
        </p>
      </div>
    </div>
  );
};

export default SuggestionsDisplay;
