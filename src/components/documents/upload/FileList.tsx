
import { Button } from '@/components/ui/button';
import FileItem from './FileItem';

interface FileListProps {
  files: File[];
  uploading: boolean;
  uploadProgress: {[key: string]: number};
  onRemoveFile: (index: number) => void;
  onClearAll: () => void;
  onUpload: () => void;
}

const FileList = ({ 
  files, 
  uploading, 
  uploadProgress, 
  onRemoveFile, 
  onClearAll, 
  onUpload 
}: FileListProps) => {
  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <FileItem 
          key={index}
          file={file}
          index={index}
          uploading={uploading}
          uploadProgress={uploadProgress[index] || 0}
          onRemove={onRemoveFile}
        />
      ))}
      
      <div className="flex justify-end space-x-2 mt-4">
        {!uploading && (
          <>
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
            <Button 
              size="sm" 
              className="bg-praktora-burgundy hover:bg-praktora-burgundy/90" 
              onClick={onUpload}
            >
              Upload {files.length} {files.length === 1 ? 'file' : 'files'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileList;
