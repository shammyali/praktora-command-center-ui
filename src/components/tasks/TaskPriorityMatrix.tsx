
import { Badge } from "@/components/ui/badge";

const TaskPriorityMatrix = () => {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="bg-red-50 p-3 rounded-md border border-red-200">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Urgent & Important</span>
          <Badge className="bg-red-500">7</Badge>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
          <li className="truncate">Call Dubai Holding</li>
          <li className="truncate">Review medical claim</li>
          <li className="truncate">Upload Emirates ID</li>
        </ul>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Important</span>
          <Badge className="bg-amber-500">5</Badge>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
          <li className="truncate">Monthly renewal reviews</li>
          <li className="truncate">Client onboarding</li>
        </ul>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Urgent</span>
          <Badge className="bg-blue-500">5</Badge>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
          <li className="truncate">Send policy document</li>
          <li className="truncate">Follow up with client</li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Routine</span>
          <Badge variant="outline">7</Badge>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
          <li className="truncate">Update contact details</li>
          <li className="truncate">Weekly report</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskPriorityMatrix;
