
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, X, Check, Eye } from 'lucide-react';
import { getFilePreview } from './fileUtils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface FileItemProps {
  file: File;
  index: number;
  uploading: boolean;
  uploadProgress: number;
  onRemove: (index: number) => void;
}

const FileItem = ({ file, index, uploading, uploadProgress, onRemove }: FileItemProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const getFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const preview = await getFilePreview(file);
        setPreviewUrl(preview);
      } catch (error) {
        console.error('Failed to generate preview:', error);
      }
    };
    
    loadPreview();
  }, [file]);

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

  return (
    <div className="flex items-center p-2 bg-gray-50 rounded-md">
      {previewUrl && previewUrl.startsWith('data:image/') ? (
        <img 
          src={previewUrl} 
          alt="Preview" 
          className="h-8 w-8 rounded object-cover mr-3" 
          onClick={handlePreviewClick}
        />
      ) : (
        <FileText 
          className="h-8 w-8 text-gray-400 mr-3 cursor-pointer" 
          onClick={handlePreviewClick}
        />
      )}
      
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
      
      <div className="flex items-center">
        {!uploading && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 mr-1"
              onClick={handlePreviewClick}
              title="Preview file"
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onRemove(index)}
              title="Remove file"
            >
              <X className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
      
      {/* File Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <div className="py-4">
            <h2 className="text-xl font-semibold mb-4">{file.name}</h2>
            <div className="flex justify-center border rounded-md p-4 bg-gray-50">
              {previewUrl?.startsWith('data:image/') ? (
                <img 
                  src={previewUrl} 
                  alt={file.name} 
                  className="max-h-[70vh] object-contain" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <img 
                    src={previewUrl || '/lovable-uploads/0c589e91-71e8-46aa-89f8-e0b62156ee97.png'} 
                    alt="File icon" 
                    className="w-24 h-24 mb-4" 
                  />
                  <p className="text-sm text-gray-500">
                    {file.type ? `${file.type} - ${getFileSize(file.size)}` : 'Preview not available'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileItem;
