
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from "lucide-react";

interface KpiCard {
  title: string;
  value: number | string;
  change?: 'up' | 'down' | 'neutral';
  changeValue?: string;
}

interface BusinessPulseProps {
  dateRange?: "today" | "week" | "month";
}

const kpiData = {
  today: [
    { title: 'New Enquiries Today', value: 27, change: 'up', changeValue: '8%' },
    { title: 'Quotes Sent', value: 12, change: 'neutral', changeValue: '0%' },
    { title: 'Policies Issued', value: 5, change: 'down', changeValue: '3%' },
    { title: 'Claims Filed', value: 3, change: 'up', changeValue: '15%' },
    { title: 'Pending Endorsements', value: 8, change: 'down', changeValue: '5%' },
    { title: 'Revenue Today', value: 'AED 12,450', change: 'up', changeValue: '22%' },
  ],
  week: [
    { title: 'New Enquiries (7 Days)', value: 147, change: 'up', changeValue: '12%' },
    { title: 'Quotes Sent', value: 68, change: 'up', changeValue: '5%' },
    { title: 'Policies Issued', value: 23, change: 'up', changeValue: '7%' },
    { title: 'Claims Filed', value: 18, change: 'down', changeValue: '4%' },
    { title: 'Pending Endorsements', value: 32, change: 'neutral', changeValue: '0%' },
    { title: 'Revenue (7 Days)', value: 'AED 84,750', change: 'up', changeValue: '15%' },
  ],
  month: [
    { title: 'New Enquiries (Month)', value: 582, change: 'up', changeValue: '18%' },
    { title: 'Quotes Sent', value: 246, change: 'up', changeValue: '14%' },
    { title: 'Policies Issued', value: 87, change: 'up', changeValue: '11%' },
    { title: 'Claims Filed', value: 53, change: 'down', changeValue: '2%' },
    { title: 'Pending Endorsements', value: 126, change: 'up', changeValue: '8%' },
    { title: 'Revenue (Month)', value: 'AED 347,890', change: 'up', changeValue: '21%' },
  ]
};

const BusinessPulse = ({ dateRange = "today" }: BusinessPulseProps) => {
  const kpis = kpiData[dateRange];
  
  return (
    <Card className="border shadow-sm h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Business Pulse KPIs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="border shadow-sm overflow-hidden">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  {kpi.change && (
                    <div className={`flex items-center ${
                      kpi.change === 'up' ? 'text-green-600' :
                      kpi.change === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {kpi.change === 'up' && <ChevronUpIcon className="w-4 h-4 mr-1" />}
                      {kpi.change === 'down' && <ChevronDownIcon className="w-4 h-4 mr-1" />}
                      {kpi.change === 'neutral' && <MinusIcon className="w-4 h-4 mr-1" />}
                      <span className="text-xs font-medium">{kpi.changeValue}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessPulse;
