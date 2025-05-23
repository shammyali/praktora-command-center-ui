
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewChatButtonProps {
  onClick: () => void;
}

export default function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      variant="ghost" 
      className="w-full flex items-center justify-start px-3 py-2 h-auto gap-2 hover:bg-gray-100"
    >
      <MessageSquarePlus className="h-5 w-5 text-praktora-burgundy" />
      <span className="font-medium">New chat</span>
    </Button>
  );
}
