
import { createContext, useState, useContext, ReactNode } from 'react';

export interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  content?: string; // Base64 or text content
}

interface DocumentContextType {
  uploadedDocuments: UploadedDocument[];
  addDocument: (doc: UploadedDocument) => void;
  removeDocument: (id: string) => void;
  clearDocuments: () => void;
}

const DocumentContext = createContext<DocumentContextType>({
  uploadedDocuments: [],
  addDocument: () => {},
  removeDocument: () => {},
  clearDocuments: () => {},
});

export const useDocuments = () => useContext(DocumentContext);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);

  const addDocument = (doc: UploadedDocument) => {
    setUploadedDocuments((prev) => [...prev, doc]);
  };

  const removeDocument = (id: string) => {
    setUploadedDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const clearDocuments = () => {
    setUploadedDocuments([]);
  };

  return (
    <DocumentContext.Provider
      value={{ uploadedDocuments, addDocument, removeDocument, clearDocuments }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
