
import { MessageCircle } from "lucide-react";

export default function EmptyConversation() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
      <MessageCircle className="h-12 w-12 mb-2 opacity-20" />
      <p className="text-sm">Select a conversation from the list</p>
    </div>
  );
}
