
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { v4 as uuidv4 } from 'uuid';
import { useDocuments, UploadedDocument } from '../command-center/DocumentContext';

interface DocumentUploadZoneProps {
  onClose: () => void;
}

const DocumentUploadZone = ({ onClose }: DocumentUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const { addDocument } = useDocuments();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const getFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload progress
    const progressIntervals: NodeJS.Timeout[] = [];
    
    files.forEach((file, index) => {
      setUploadProgress(prev => ({...prev, [index]: 0}));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[index] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          
          // Randomize progress increment to simulate variable upload speeds
          const increment = Math.floor(Math.random() * 10) + 5;
          const newProgress = Math.min(currentProgress + increment, 100);
          
          return {...prev, [index]: newProgress};
        });
      }, 300);
      
      progressIntervals.push(interval);
      
      // Read file content
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          // Add document to context
          const docId = uuidv4();
          const docContent = typeof event.target.result === 'string' 
            ? event.target.result 
            : URL.createObjectURL(new Blob([event.target.result]));
            
          const newDoc: UploadedDocument = {
            id: docId,
            name: file.name,
            size: getFileSize(file.size),
            type: file.type,
            content: docContent
          };
          
          addDocument(newDoc);
        }
      };
      
      if (file.type.match('text/*') || file.type === 'application/json') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
    
    // Simulate completion
    setTimeout(() => {
      progressIntervals.forEach(clearInterval);
      setUploadProgress(Object.fromEntries(files.map((_, i) => [i, 100])));
      
      // Reset after "completion"
      setTimeout(() => {
        setFiles([]);
        setUploading(false);
        setUploadProgress({});
        onClose();
      }, 1000);
    }, files.length * 1000);
  };

  return (
    <Card className="p-6 shadow-lg rounded-lg border-2 border-dashed border-gray-300 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upload Documents</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {files.length === 0 ? (
        <div
          className={`h-40 flex flex-col items-center justify-center rounded-md transition-colors ${
            isDragging ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Drag and drop files here</p>
          <p className="text-xs text-gray-400 mb-4">PDF, Word, Images, or any other document</p>
          
          <div>
            <label htmlFor="file-upload">
              <div className="bg-praktora-burgundy hover:bg-praktora-burgundy/90 text-white px-4 py-2 rounded-md text-sm cursor-pointer">
                Browse Files
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
              <FileText className="h-8 w-8 text-gray-400 mr-3" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-gray-500">{getFileSize(file.size)}</p>
                {uploading && (
                  <div className="mt-1">
                    <Progress 
                      value={uploadProgress[index] || 0} 
                      className="h-1"
                    />
                    {uploadProgress[index] === 100 && (
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
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          
          <div className="flex justify-end space-x-2 mt-4">
            {!uploading && (
              <>
                <Button variant="outline" size="sm" onClick={() => setFiles([])}>
                  Clear All
                </Button>
                <Button 
                  size="sm" 
                  className="bg-praktora-burgundy hover:bg-praktora-burgundy/90" 
                  onClick={uploadFiles}
                >
                  Upload {files.length} {files.length === 1 ? 'file' : 'files'}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default DocumentUploadZone;
