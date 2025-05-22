
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  time: string;
  description: string;
  category: 'quote' | 'claim' | 'policy' | 'renewal' | 'fnol';
}

const activities: ActivityItem[] = [
  { id: '1', time: '9:01 AM', description: 'Quote MI009 sent to AXA', category: 'quote' },
  { id: '2', time: '9:03 AM', description: 'FNOL created by Ali Qamar', category: 'fnol' },
  { id: '3', time: '9:05 AM', description: 'Renewal draft generated for Aster Medical', category: 'renewal' },
  { id: '4', time: '9:12 AM', description: 'Policy MHC271 issued to Dubai Holding', category: 'policy' },
  { id: '5', time: '9:18 AM', description: 'Claim C23094 submitted to Salama', category: 'claim' },
  { id: '6', time: '9:23 AM', description: 'Quote MI010 sent to RSA', category: 'quote' },
  { id: '7', time: '9:27 AM', description: 'Policy MT888 endorsed - vehicle added', category: 'policy' },
  { id: '8', time: '9:31 AM', description: 'FNOL created by Fatima Hassan', category: 'fnol' },
  { id: '9', time: '9:36 AM', description: 'Renewal confirmed for Al Nabooda Group', category: 'renewal' },
  { id: '10', time: '9:42 AM', description: 'Quote PR221 sent to Sukoon', category: 'quote' },
];

const getCategoryStyles = (category: ActivityItem['category']) => {
  switch (category) {
    case 'quote':
      return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
    case 'claim':
      return 'bg-red-100 text-red-800 border-l-4 border-red-500';
    case 'policy':
      return 'bg-green-100 text-green-800 border-l-4 border-green-500';
    case 'renewal':
      return 'bg-purple-100 text-purple-800 border-l-4 border-purple-500';
    case 'fnol':
      return 'bg-orange-100 text-orange-800 border-l-4 border-orange-500';
    default:
      return 'bg-gray-100 text-gray-800 border-l-4 border-gray-500';
  }
};

const ActivityTimeline = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex gap-3 py-2 min-w-max">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className={cn(
                  "flex-none p-3 rounded-md min-w-[200px] max-w-[230px]",
                  getCategoryStyles(activity.category)
                )}
              >
                <time className="text-xs font-semibold block">{activity.time}</time>
                <p className="mt-1 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
