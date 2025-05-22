
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  message: string;
  severity: 'red' | 'yellow' | 'green';
  timestamp: string;
}

const alerts: Alert[] = [
  { id: '1', message: 'Claim #C23091 is pending insurer response for 15 days', severity: 'red', timestamp: '9:15 AM' },
  { id: '2', message: 'Client XYZ Group has not responded to quote sent 7 days ago', severity: 'yellow', timestamp: '9:22 AM' },
  { id: '3', message: 'High-value policy issued for Dubai Holding - AED 87,500 premium', severity: 'green', timestamp: '9:34 AM' },
  { id: '4', message: 'Claim #C23087 is pending documentation for 12 days', severity: 'red', timestamp: '9:41 AM' },
  { id: '5', message: 'Policy MTC889 renewal quote not sent, expires in 7 days', severity: 'yellow', timestamp: '9:47 AM' },
];

const getAlertStyles = (severity: Alert['severity']) => {
  switch (severity) {
    case 'red':
      return 'bg-red-100 border-l-4 border-red-600';
    case 'yellow':
      return 'bg-amber-100 border-l-4 border-amber-500';
    case 'green':
      return 'bg-green-100 border-l-4 border-green-600';
    default:
      return 'bg-gray-100 border-l-4 border-gray-500';
  }
};

const CriticalAlerts = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <AlertCircleIcon className="mr-2 h-5 w-5 text-praktora-burgundy" />
          <CardTitle className="text-lg font-semibold">Critical Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "p-3 rounded-md",
                getAlertStyles(alert.severity)
              )}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm">{alert.message}</p>
                <time className="text-xs font-mono">{alert.timestamp}</time>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalAlerts;
