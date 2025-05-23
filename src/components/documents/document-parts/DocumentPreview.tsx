
import React from "react";

interface DocumentPreviewProps {
  fileName: string;
  preview: string;
  confidence?: number;
  fileScore?: number;
}

export const DocumentPreview = ({ 
  fileName, 
  preview, 
  confidence, 
  fileScore 
}: DocumentPreviewProps) => {
  return (
    <div className="aspect-[3/4] bg-gray-100 rounded-md mb-3 overflow-hidden relative">
      <img 
        src={preview} 
        alt={fileName} 
        className="object-cover w-full h-full" 
      />
      
      {confidence && (
        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl">
          {confidence}% AI confidence
        </div>
      )}
      
      {fileScore && (
        <div className="absolute top-0 right-0 bg-white/70 text-xs px-2 py-1 rounded-bl">
          Score: {fileScore}%
        </div>
      )}
    </div>
  );
};
