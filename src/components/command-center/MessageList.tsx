
import { MessageType } from "./types";
import { FileText } from "lucide-react";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-[#9C2D55] text-white' 
                : 'bg-white border border-gray-200 shadow-sm'
            }`}
          >
            {/* Display document icons if the message has attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex items-center gap-2 mb-2 bg-gray-100/80 p-2 rounded">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-xs text-gray-600">
                  {message.attachments.length} {message.attachments.length === 1 ? 'document' : 'documents'} attached
                </span>
              </div>
            )}
            
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
