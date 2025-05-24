
import { v4 as uuidv4 } from 'uuid';
import { UploadedDocument } from '@/components/command-center/DocumentContext';

export const getFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const readFileContent = (
  file: File,
  onContentReady: (docContent: string, docId: string) => void
): void => {
  const reader = new FileReader();
  const docId = uuidv4();
  
  reader.onload = (event) => {
    if (event.target?.result) {
      const docContent = typeof event.target.result === 'string' 
        ? event.target.result 
        : URL.createObjectURL(new Blob([event.target.result]));
      
      onContentReady(docContent, docId);
    }
  };
  
  if (file.type.match('text/*') || file.type === 'application/json') {
    reader.readAsText(file);
  } else {
    reader.readAsDataURL(file);
  }
};

export const createDocumentFromFile = (
  file: File,
  docId: string,
  content: string
): UploadedDocument => {
  return {
    id: docId,
    name: file.name,
    size: getFileSize(file.size),
    type: file.type,
    content: content
  };
};
