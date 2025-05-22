
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from "lucide-react";

interface KpiCard {
  title: string;
  value: number | string;
  change?: 'up' | 'down' | 'neutral';
  changeValue?: string;
}

const kpis: KpiCard[] = [
  { title: 'New Enquiries Today', value: 27, change: 'up', changeValue: '8%' },
  { title: 'Quotes Sent', value: 12, change: 'neutral', changeValue: '0%' },
  { title: 'Policies Issued', value: 5, change: 'down', changeValue: '3%' },
  { title: 'Claims Filed', value: 3, change: 'up', changeValue: '15%' },
  { title: 'Pending Endorsements', value: 8, change: 'down', changeValue: '5%' },
  { title: 'Revenue Today', value: 'AED 12,450', change: 'up', changeValue: '22%' },
];

const BusinessPulse = () => {
  return (
    <Card className="border shadow-sm h-full">
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
