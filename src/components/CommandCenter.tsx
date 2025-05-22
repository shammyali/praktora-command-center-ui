import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { PenIcon, ImageIcon, UserIcon, CodeIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "./ui/tooltip";

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  color: string;
  tooltip: string;
}

const ActionCard = ({ icon: Icon, title, color, tooltip }: ActionCardProps) => {
  return (
    <Tooltip>
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
    </Tooltip>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  status?: string;
  statusColor?: "green" | "yellow" | "red" | "blue";
  animate?: boolean;
  customerName: string;
}

const ProjectCard = ({ title, description, status, statusColor = "blue", animate = false, customerName }: ProjectCardProps) => {
  return (
    <Card className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        {status && (
          <div className="flex justify-end mb-1">
            <span 
              className={`text-xs font-medium
                ${statusColor === "green" ? "text-green-700" : 
                 statusColor === "yellow" ? "text-amber-700" :
                 statusColor === "red" ? "text-red-700" :
                 "text-blue-700"}
                ${animate ? "animate-pulse-slow" : ""}
              `}
            >
              {status}
            </span>
          </div>
        )}
        <div className="mb-1">
          <h3 className="font-medium">
            {title} <span className="font-bold">{customerName}</span>
          </h3>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

const CommandSuggestion = ({ text }: { text: string }) => {
  return (
    <Badge 
      variant="outline" 
      className="px-3 py-1 cursor-pointer hover:bg-[#9C2D55]/10 active:bg-[#9C2D55]/20 transition-colors duration-150 border-[#9C2D55]/50 text-gray-700"
    >
      {text}
    </Badge>
  );
};

const EmptyEngagements = () => {
  return (
    <Card className="border border-dashed bg-white/50 p-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <PenIcon className="h-5 w-5 text-gray-400" />
        <p className="text-sm text-gray-600">
          No active engagements at the moment. Use Instant Commands to get started.
        </p>
      </div>
    </Card>
  );
};

const CommandCenter = () => {
  const [activeEngagements, setActiveEngagements] = useState([
    { 
      title: "Workmen's Compensation Renewal -",
      customerName: "Tom Robers",
      description: "Comprehensive coverage renewal assessment required", 
      status: "Awaiting Confirmation",
      statusColor: "yellow" as const,
      animate: true
    },
    { 
      title: "New Motor Quote -",
      customerName: "Abdullah Ali",
      description: "Comprehensive coverage proposal ready for review", 
      status: "Quoted",
      statusColor: "yellow" as const,
      animate: false
    },
    { 
      title: "Medical Claim -",
      customerName: "Vijay Singh",
      description: "Claim assessment completed and approved", 
      status: "Claim Settled",
      statusColor: "green" as const,
      animate: false
    },
    { 
      title: "Risk Assessment",
      customerName: "Mohan Lal",
      description: "Complete risk profile for healthcare client", 
      status: "In Progress",
      statusColor: "blue" as const,
      animate: false
    }
  ]);

  return (
    <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="flex flex-col h-full">
        {/* Right Panel for Instant Commands and Active Engagements */}
        <div className="fixed top-16 right-0 bottom-0 w-80 border-l border-gray-200 bg-white p-5 overflow-auto z-10">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Instant Commands</h2>
            <TooltipProvider>
              <div className="space-y-3">
                <ActionCard 
                  icon={PenIcon} 
                  title="Quote Launch" 
                  color="bg-amber-400"
                  tooltip="Launch a new insurance quote process with smart form pre-filling based on customer history."
                />
                <ActionCard 
                  icon={ImageIcon} 
                  title="Initiate Policy Services" 
                  color="bg-blue-400"
                  tooltip="Access policy amendment tools including endorsements, cancellations and renewals with one click."
                />
                <ActionCard 
                  icon={UserIcon} 
                  title="Log Claim FNOL" 
                  color="bg-green-400"
                  tooltip="First Notice of Loss form with automated severity assessment and claim handler assignment."
                />
                <ActionCard 
                  icon={CodeIcon} 
                  title="What's Pending" 
                  color="bg-purple-400"
                  tooltip="2 quotes, 1 endorsement, and 2 claims have no response in the last 24 hours."
                />
              </div>
            </TooltipProvider>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Engagements</h2>
              <Button variant="ghost" size="sm" className="text-sm">View all</Button>
            </div>
            <div className="space-y-3">
              {activeEngagements.length > 0 ? (
                activeEngagements.map((engagement, index) => (
                  <ProjectCard 
                    key={index}
                    title={engagement.title}
                    customerName={engagement.customerName}
                    description={engagement.description}
                    status={engagement.status}
                    statusColor={engagement.statusColor}
                    animate={engagement.animate}
                  />
                ))
              ) : (
                <EmptyEngagements />
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content Area - Using ResizablePanelGroup for flexible sizing */}
        <div className="fixed left-60 right-80 bottom-0 top-16 overflow-hidden">
          <ResizablePanelGroup
            direction="vertical"
            className="h-full"
          >
            {/* Display Area - 70% of the available space initially */}
            <ResizablePanel defaultSize={70} minSize={50}>
              <div className="h-full p-5 bg-gradient-to-br from-white to-blue-50 overflow-auto">
                <div className="h-full w-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-[#5A6B82]" />
                    <p className="text-[#5A6B82] italic font-semibold">
                      Try: 'Compare RSA and AXA for MP2118' or 'Create endorsement for GM123/1'
                    </p>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Prompt Area - 30% of the available space initially */}
            <ResizablePanel defaultSize={30} minSize={15}>
              <div className="h-full p-5 bg-white overflow-auto">
                <Card className="shadow-md h-[250px] border-[#9C2D55]/20 flex flex-col">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-lg">P²RA Command Console</h3>
                      <span className="text-xs text-gray-500">20/2000</span>
                    </div>
                    <Separator className="my-3" />
                    
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CommandSuggestion text="Upload Emirates ID and generate new enquiry" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Scan and auto-extract customer details from Emirates ID</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CommandSuggestion text="Convert quote MP2396 to policy and issue invoice" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Automatically convert an existing quote to policy and generate invoice</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CommandSuggestion text="Send WhatsApp quote to Ali Qamar" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send quote details via WhatsApp to the customer</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CommandSuggestion text="List all unpaid invoices over 30 days" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View all outstanding invoices that are overdue by 30+ days</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <Textarea 
                      placeholder="Ask any question about clients, policies, or market trends..." 
                      className="min-h-24 flex-grow resize-none focus-visible:ring-0 border-none bg-transparent" 
                    />
                    <div className="flex items-center justify-between mt-4 pt-2">
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">Attach</Button>
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
                          >
                            Execute Command
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Process your query and provide intelligent assistance</p>
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
    </div>
  );
};

export default CommandCenter;
