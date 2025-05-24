
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, X, Check } from 'lucide-react';

interface FileItemProps {
  file: File;
  index: number;
  uploading: boolean;
  uploadProgress: number;
  onRemove: (index: number) => void;
}

const FileItem = ({ file, index, uploading, uploadProgress, onRemove }: FileItemProps) => {
  const getFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex items-center p-2 bg-gray-50 rounded-md">
      <FileText className="h-8 w-8 text-gray-400 mr-3" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
        <p className="text-xs text-gray-500">{getFileSize(file.size)}</p>
        {uploading && (
          <div className="mt-1">
            <Progress 
              value={uploadProgress || 0} 
              className="h-1"
            />
            {uploadProgress === 100 && (
              <div className="flex items-center text-green-600 mt-1 text-xs">
                <Check className="h-3 w-3 mr-1" /> Upload complete
              </div>
            )}
          </div>
        )}
      </div>
      {!uploading && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onRemove(index)}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default FileItem;
