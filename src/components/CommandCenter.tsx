import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { PenIcon, ImageIcon, UserIcon, CodeIcon, PlusIcon, SparklesIcon, CheckCircle, XCircle, AlertCircle, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Command, CommandItem } from "./ui/command";
import { praktoraWebApi } from "@/services/api/praktoraWebApi";
import { toast } from "sonner";
import DocumentUploadZone from "./documents/DocumentUploadZone";

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  color: string;
  tooltip: string;
}

const ActionCard = ({
  icon: Icon,
  title,
  color,
  tooltip
}: ActionCardProps) => {
  return <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">{title}</span>
            </div>
            <Button variant="ghost" size="icon">
              <PlusIcon className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="right" align="start" className="max-w-xs">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>;
};

// KYC Status Badge component
const KycStatusBadge = ({ status }: { status: "YES" | "NO" | "PEP" | "Request" }) => {
  const getStatusColor = () => {
    switch (status) {
      case "YES":
        return "text-green-600 font-bold";
      case "NO":
        return "text-red-600 font-bold";
      case "PEP":
        return "text-red-600 font-bold animate-pulse";
      case "Request":
        return "text-blue-600 font-bold";
      default:
        return "text-gray-600 font-bold";
    }
  };

  return (
    <div className="inline-flex items-center">
      <span className="text-sm font-medium text-black">KYC - </span>
      {status === "PEP" ? (
        <span className={`text-sm ml-1 text-red-600 font-bold relative`}>
          <span className="animate-pulse">PEP</span>
          <span className="absolute -inset-1 rounded-full bg-red-100 animate-ping opacity-75"></span>
        </span>
      ) : (
        <span className={`text-sm ml-1 ${getStatusColor()}`}>{status}</span>
      )}
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  status?: string;
  statusColor?: "green" | "yellow" | "red" | "blue";
  animate?: boolean;
  customerName: string;
  kycStatus: "YES" | "NO" | "PEP" | "Request";
}

const ProjectCard = ({
  title,
  description,
  status,
  statusColor = "blue",
  animate = false,
  customerName,
  kycStatus
}: ProjectCardProps) => {
  return <Card className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <KycStatusBadge status={kycStatus} />
            {status && <span className={`text-xs font-medium
                ${statusColor === "green" ? "text-green-700" : statusColor === "yellow" ? "text-amber-700" : statusColor === "red" ? "text-red-700" : "text-blue-700"}
                ${animate ? "animate-pulse-slow" : ""}
              `}>
              {status}
            </span>}
          </div>
          <div className="mb-1">
            <h3 className="font-medium">
              {title} <span className="font-bold">{customerName}</span>
            </h3>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>;
};

const CommandSuggestion = ({
  text,
  onClick
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <Badge 
      variant="outline" 
      className="px-3 py-1 cursor-pointer hover:bg-slate-100"
      onClick={onClick}
    >
      {text}
    </Badge>
  );
};

const EmptyEngagements = () => {
  return <Card className="border border-dashed bg-white/50 p-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <PenIcon className="h-5 w-5 text-gray-400" />
        <p className="text-sm text-gray-600">
          No active engagements at the moment. Use Instant Commands to get started.
        </p>
      </div>
    </Card>;
};

const CommandCenter = () => {
  const [activeEngagements, setActiveEngagements] = useState<any[]>([]);
  const [commandText, setCommandText] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  // Load active engagements on component mount
  useEffect(() => {
    loadActiveEngagements();
  }, []);

  const loadActiveEngagements = async () => {
    try {
      setIsLoading(true);
      const engagements = await praktoraWebApi.getActiveEngagements();
      setActiveEngagements(engagements);
    } catch (error) {
      console.error("Failed to load active engagements:", error);
      // Fallback to empty array if API fails
      setActiveEngagements([]);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCommand = async () => {
    if (!commandText.trim()) {
      toast.error("Please enter a command");
      return;
    }

    try {
      setIsExecuting(true);
      const result = await praktoraWebApi.executeCommand(commandText);
      
      toast.success(`Command executed successfully: ${result.result}`);
      setCommandText("");
      
      // Refresh engagements after command execution
      await loadActiveEngagements();
    } catch (error) {
      console.error("Command execution failed:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCommandText(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeCommand();
    }
  };

  const handleDocumentUploadClose = () => {
    setShowDocumentUpload(false);
  };

  return <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="flex flex-col h-full">
        {/* Right Panel for Instant Commands and Active Engagements */}
        <div className="fixed top-16 right-0 bottom-0 w-80 border-l border-gray-200 bg-white p-5 overflow-auto z-10">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Instant Commands</h2>
            <TooltipProvider>
              <div className="space-y-3">
                <ActionCard icon={PenIcon} title="Quote Launch" color="bg-amber-400" tooltip="Launch a new insurance quote process with smart form pre-filling based on customer history." />
                <ActionCard icon={ImageIcon} title="Initiate Policy Services" color="bg-blue-400" tooltip="Access policy amendment tools including endorsements, cancellations and renewals with one click." />
                <ActionCard icon={UserIcon} title="Log Claim FNOL" color="bg-green-400" tooltip="First Notice of Loss form with automated severity assessment and claim handler assignment." />
                <ActionCard icon={CodeIcon} title="What's Pending" color="bg-purple-400" tooltip="2 quotes, 1 endorsement, and 2 claims have no response in the last 24 hours." />
              </div>
            </TooltipProvider>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Engagements</h2>
              <Button variant="ghost" size="sm" className="text-sm" onClick={loadActiveEngagements}>
                {isLoading ? "Loading..." : "Refresh"}
              </Button>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center text-gray-500">Loading engagements...</div>
              ) : activeEngagements.length > 0 ? (
                activeEngagements.map((engagement, index) => (
                  <ProjectCard 
                    key={index} 
                    title={engagement.title} 
                    customerName={engagement.customerName} 
                    description={engagement.description} 
                    status={engagement.status} 
                    statusColor={engagement.statusColor} 
                    animate={engagement.animate} 
                    kycStatus={engagement.kycStatus}
                  />
                ))
              ) : (
                <EmptyEngagements />
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="fixed left-60 right-80 bottom-0 top-16 overflow-hidden">
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Display Area - 75% of the available space initially */}
            <ResizablePanel defaultSize={75} minSize={60}>
              <div className="h-full p-5 bg-gradient-to-br from-white to-blue-50 overflow-auto">
                <div className="h-full w-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
                      <p className="text-[#5A6B82]/40 italic font-semibold">
                        Try: 'Compare RSA and AXA for MP2118' or 'Create endorsement for GM123/1'
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
                      <p className="text-[#5A6B82]/40 italic font-semibold">
                        Try: 'Upload Emirates ID and generate new enquiry' or 'Convert quote MP2396 to policy'
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#5A6B82]/40" />
                      <p className="text-[#5A6B82]/40 italic font-semibold">
                        Try: 'Send WhatsApp quote to Ali Qamar' or 'Download AXA motor policies expiring today'
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Prompt Area - 25% of the available space initially (reduced from 30%) */}
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="h-full p-5 bg-white">
                {showDocumentUpload && (
                  <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full">
                      <DocumentUploadZone onClose={handleDocumentUploadClose} />
                    </div>
                  </div>
                )}
                
                <Card className="shadow-md h-full border-[#9C2D55]/20 flex flex-col">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-lg">P²RA Command Console</h3>
                      <span className="text-xs text-gray-500">{commandText.length}/2000</span>
                    </div>
                    <Separator className="my-3" />
                    
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <CommandSuggestion 
                        text="Upload Emirates ID" 
                        onClick={() => handleSuggestionClick("Upload Emirates ID and generate new enquiry")}
                      />
                      <CommandSuggestion 
                        text="Convert quote MP2396" 
                        onClick={() => handleSuggestionClick("Convert quote MP2396 to policy and issue invoice")}
                      />
                      <CommandSuggestion 
                        text="Send WhatsApp quote" 
                        onClick={() => handleSuggestionClick("Send WhatsApp quote to Ali Qamar")}
                      />
                    </div>
                    
                    <Textarea 
                      placeholder="Ask any question about clients, policies, or market trends... (Press Enter to execute)" 
                      className="min-h-16 flex-grow resize-none focus-visible:ring-0 border-none bg-transparent" 
                      value={commandText}
                      onChange={(e) => setCommandText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      maxLength={2000}
                    />
                    <div className="flex items-center justify-between mt-4 pt-2">
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowDocumentUpload(true)}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Upload documents or images to include with your query</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">Templates</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Access saved command templates for common tasks</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-[#9C2D55] hover:bg-[#9C2D55]/90 text-white whitespace-nowrap"
                            onClick={executeCommand}
                            disabled={isExecuting || !commandText.trim()}
                          >
                            {isExecuting ? "Processing..." : "Execute Command"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Process your query and provide intelligent assistance (or press Enter)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>;
};

export default CommandCenter;
