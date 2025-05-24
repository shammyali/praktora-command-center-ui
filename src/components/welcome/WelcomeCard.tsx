
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MousePointerClick, SparklesIcon, BrainCircuit } from "lucide-react";

const WelcomeCard = () => {
  return (
    <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-praktora-burgundy/20 mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <SparklesIcon className="h-6 w-6 text-praktora-burgundy" />
        <h2 className="text-xl font-bold text-praktora-burgundy text-center">
          P²RA Command Console
        </h2>
      </div>
      <p className="text-gray-600 mb-4 text-center">
        Powered by Mistral LLM and OpenAI, the P²RA Command Console provides intelligent assistance for all your insurance operations.
      </p>
      <Link to="/dashboard" className="block w-full">
        <Button className="w-full bg-praktora-burgundy hover:bg-praktora-burgundy/90 mb-2 text-lg flex items-center justify-center py-6 gap-3">
          <MousePointerClick className="h-5 w-5" />
          Go to P²RA Control Center
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>
      <div className="flex items-center justify-center gap-4 mt-2">
        <span className="text-sm text-gray-500 flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          Mistral LLM Connected
        </span>
        <span className="text-sm text-gray-500 flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-blue-500" />
          OpenAI Ready
        </span>
      </div>
    </div>
  );
};

export default WelcomeCard;
