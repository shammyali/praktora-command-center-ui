
import { Upload } from 'lucide-react';

interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropZone = ({ 
  isDragging, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onFileInputChange 
}: DropZoneProps) => {
  return (
    <div
      className={`h-40 flex flex-col items-center justify-center rounded-md transition-colors ${
        isDragging ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-50'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
            onChange={onFileInputChange}
          />
        </label>
      </div>
    </div>
  );
};

export default DropZone;
