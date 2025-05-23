
import { useState } from "react";
import { Document } from "@/types/documentTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Download, X, Link, Rotate3D, FileText, Clock, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentDetailsPanelProps {
  document: Document | null;
  onClose: () => void;
}

const DocumentDetailsPanel = ({ document, onClose }: DocumentDetailsPanelProps) => {
  const [activeTab, setActiveTab] = useState("preview");
  
  if (!document) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-[400px] border-l bg-white h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-lg">Document Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList className="w-full">
            <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="ocr" className="flex-1">OCR Text</TabsTrigger>
            <TabsTrigger value="audit" className="flex-1">Audit Log</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="flex-1 p-4 overflow-y-auto">
          <Card className="mb-4">
            <CardContent className="p-0 h-[500px] flex items-center justify-center bg-gray-50 relative">
              <img 
                src={document.preview} 
                alt={document.fileName} 
                className="max-w-full max-h-full object-contain" 
              />
              {document.confidence && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {document.confidence}% AI confidence
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mb-4">
            <Button variant="outline" size="sm" className="flex-1 mr-2">
              <Rotate3D className="h-4 w-4 mr-2" /> Rotate
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-sm">Document Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">File Name:</span>
                <span className="font-medium">{document.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">File Type:</span>
                <span>{document.attachmentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span>{document.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Uploaded:</span>
                <span>{formatDate(document.dateAdded)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Uploaded By:</span>
                <span>{document.uploadedBy.name}</span>
              </div>
            </div>
          </div>

          {document.linkedTo && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="font-medium mb-2 text-sm">Linked to</h3>
                <Card className="bg-blue-50">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{document.linkedTo.name}</div>
                      <div className="text-xs text-gray-500">
                        {document.linkedTo.type}: {document.linkedTo.id}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Link className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {document.status === "Suggested" && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="font-medium mb-2 text-sm flex items-center">
                  <Badge variant="outline" className="mr-2 bg-blue-50 border-blue-200 text-blue-800">AI</Badge>
                  Suggested Link
                </h3>
                <Card className="bg-blue-50">
                  <CardContent className="p-3">
                    <p className="text-sm">
                      This document appears to be related to:{" "}
                      <span className="font-medium">Client CLT901 (Ahmad Al Najjar)</span>
                    </p>
                    <div className="flex mt-2">
                      <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/90 mr-2">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="details" className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Document Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  <Badge className="mr-1">{document.type}</Badge>
                  {document.confidence && (
                    <span className="text-xs text-gray-500">
                      ({document.confidence}% confidence)
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge 
                  variant="outline" 
                  className={
                    document.status === 'Linked' ? 'bg-green-50 border-green-200 text-green-800' : 
                    document.status === 'Unlinked' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                    document.status === 'Expired' ? 'bg-red-50 border-red-200 text-red-800' :
                    document.status === 'Duplicate' ? 'bg-purple-50 border-purple-200 text-purple-800' :
                    'bg-blue-50 border-blue-200 text-blue-800'
                  }
                >
                  {document.status}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Source</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <Badge variant="outline" className="bg-gray-50 border-gray-200">
                  {document.source}
                </Badge>
              </CardContent>
            </Card>

            {document.aiTags && document.aiTags.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {document.aiTags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {document.fileScore && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">File Quality Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${document.fileScore}%` }}
                      ></div>
                    </div>
                    <span>{document.fileScore}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ocr" className="flex-1 p-4 overflow-y-auto">
          <div className="bg-gray-50 border rounded-md p-4 h-full overflow-y-auto">
            {document.ocrText ? (
              <pre className="text-sm whitespace-pre-wrap">{document.ocrText}</pre>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FileText className="mx-auto h-8 w-8 opacity-25 mb-2" />
                <p>No OCR text available for this document</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-3">
            {document.auditTrail.map((entry, i) => (
              <div key={i} className="flex">
                <div className="mr-4 relative">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {entry.user === "P²RA AI" ? (
                      <span className="text-xs font-bold">AI</span>
                    ) : (
                      <UserCircle className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  {i < document.auditTrail.length - 1 && (
                    <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{entry.action}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{entry.details}</p>
                  <div className="text-xs text-gray-500 mt-1">By {entry.user}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentDetailsPanel;
