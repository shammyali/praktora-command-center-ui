
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string;
  fallbackPath?: string;
}

const BackButton = ({ className, fallbackPath = "/" }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // If no history, go to fallback path
      navigate(fallbackPath);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={handleGoBack} 
      className={`rounded-full w-10 flex-shrink-0 ${className || ""}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
