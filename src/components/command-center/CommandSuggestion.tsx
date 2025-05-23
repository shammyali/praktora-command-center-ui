
import { Badge } from "@/components/ui/badge";

interface CommandSuggestionProps {
  text: string;
  onClick?: () => void;
}

const CommandSuggestion = ({ text, onClick }: CommandSuggestionProps) => {
  return (
    <Badge 
      variant="outline" 
      className="px-3 py-1 cursor-pointer hover:bg-slate-100"
      onClick={onClick}
    >
      {text}
    </Badge>
  );
};

export default CommandSuggestion;
