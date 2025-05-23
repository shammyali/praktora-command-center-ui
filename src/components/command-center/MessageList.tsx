
import { MessageType } from "./types";

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
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
