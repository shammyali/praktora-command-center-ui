
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useDocuments } from '../command-center/DocumentContext';
import DropZone from './upload/DropZone';
import FileList from './upload/FileList';
import { readFileContent, createDocumentFromFile } from './upload/fileUtils';

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

  const clearAllFiles = () => {
    setFiles([]);
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
      
      // Process file content
      readFileContent(file, (docContent, docId) => {
        const newDoc = createDocumentFromFile(file, docId, docContent);
        addDocument(newDoc);
      });
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
        <DropZone 
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileInputChange={handleFileInput}
        />
      ) : (
        <FileList 
          files={files}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onRemoveFile={removeFile}
          onClearAll={clearAllFiles}
          onUpload={uploadFiles}
        />
      )}
    </Card>
  );
};

export default DocumentUploadZone;
