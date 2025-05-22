import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { PenIcon, ImageIcon, UserIcon, CodeIcon, PlusIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  color: string;
}

const ActionCard = ({ icon: Icon, title, color }: ActionCardProps) => {
  return (
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
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard = ({ title, description }: ProjectCardProps) => {
  return (
    <Card className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

const CommandCenter = () => {
  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-white to-blue-50">
      <div className="flex flex-col h-full">
        {/* Right Panel for Action Cards and Recent Projects - Now moved to top */}
        <div className="fixed top-16 right-0 bottom-0 w-80 border-l border-gray-200 bg-white p-5 overflow-auto z-10">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <ActionCard 
                icon={PenIcon} 
                title="Create policy draft" 
                color="bg-amber-400" 
              />
              <ActionCard 
                icon={ImageIcon} 
                title="Generate proposals" 
                color="bg-blue-400" 
              />
              <ActionCard 
                icon={UserIcon} 
                title="Client onboarding" 
                color="bg-green-400" 
              />
              <ActionCard 
                icon={CodeIcon} 
                title="Policy analysis" 
                color="bg-purple-400" 
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <Button variant="ghost" size="sm" className="text-sm">View all</Button>
            </div>
            <div className="space-y-3">
              <ProjectCard 
                title="Commercial Insurance Renewal" 
                description="ABC Manufacturing renewal due in 30 days" 
              />
              <ProjectCard 
                title="New Business Quote" 
                description="XYZ Corp liability coverage proposal" 
              />
              <ProjectCard 
                title="Claims Processing" 
                description="Follow up on open claims for Johnson account" 
              />
              <ProjectCard 
                title="Risk Assessment" 
                description="Complete risk profile for healthcare client" 
              />
            </div>
          </div>
        </div>
        
        {/* Main Content Area - Now full height and positioned at bottom */}
        <div className="fixed left-60 right-80 bottom-0 top-16 p-5 bg-gradient-to-br from-white to-blue-50">
          <div className="flex flex-col h-full justify-end">
            <div className="mb-0">
              <Card className="shadow-md border-praktora-burgundy/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg">AI Assistant</h3>
                    <span className="text-xs text-gray-500">20/2000</span>
                  </div>
                  <Separator className="my-3" />
                  <Textarea 
                    placeholder="Ask any question about clients, policies, or market trends..." 
                    className="min-h-48 resize-none focus-visible:ring-0 border-none bg-transparent" 
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Attach</Button>
                      <Button variant="outline" size="sm">Templates</Button>
                    </div>
                    <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/90 text-white">
                      Send Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
