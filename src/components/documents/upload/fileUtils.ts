
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

export const getFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // Handle image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || '');
      };
      reader.readAsDataURL(file);
      return;
    }
    
    // Handle PDF files
    if (file.type === 'application/pdf') {
      return resolve('/lovable-uploads/8631928b-0cb8-4709-ae6b-3b209802c5a2.png'); // PDF icon
    }
    
    // Handle text files
    if (file.type.match('text/*') || 
        file.type === 'application/json' ||
        file.type === 'application/xml') {
      return resolve('/lovable-uploads/697ccaf3-c184-41b8-9126-e6f758cc6368.png'); // Text icon
    }
    
    // Handle MS Office documents
    if (file.type.includes('word') || 
        file.type.includes('officedocument.wordprocessing')) {
      return resolve('/lovable-uploads/66a81866-061b-4545-bd43-d1742f06411f.png'); // Word icon
    }
    
    if (file.type.includes('excel') || 
        file.type.includes('officedocument.spreadsheet')) {
      return resolve('/lovable-uploads/ebc38715-372d-4cc1-b293-cb0855312520.png'); // Excel icon
    }
    
    // Default file icon
    resolve('/lovable-uploads/0c589e91-71e8-46aa-89f8-e0b62156ee97.png');
  });
};
