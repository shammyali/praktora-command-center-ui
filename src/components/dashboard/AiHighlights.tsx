
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesIcon, AlertTriangleIcon } from "lucide-react";

interface Insight {
  id: string;
  text: string;
  type: 'warning' | 'insight' | 'opportunity';
}

const insights: Insight[] = [
  { id: '1', text: '3 policies expire in 5 days, no renewal started', type: 'warning' },
  { id: '2', text: '1 claim is stuck without insurer reply for 7 days', type: 'warning' },
  { id: '3', text: '7 enquiries from WhatsApp, 2 unquoted after 24 hours', type: 'insight' },
  { id: '4', text: 'Client Al Futtaim has 3 policies with different insurers - opportunity for consolidation', type: 'opportunity' },
  { id: '5', text: 'Renewal rates for motor fleet policies have decreased 3% on average this month', type: 'insight' },
  { id: '6', text: 'Agent Mohammed has quoted 5 prospects from the same industry - potential specialization', type: 'opportunity' },
  { id: '7', text: '2 claims submitted without complete documentation', type: 'warning' },
];

const getInsightColor = (type: Insight['type']) => {
  switch (type) {
    case 'warning':
      return 'text-amber-600';
    case 'insight':
      return 'text-blue-600';
    case 'opportunity':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

const AiHighlights = () => {
  return (
    <Card className="border shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <SparklesIcon className="mr-2 h-5 w-5 text-praktora-burgundy" />
          <CardTitle className="text-lg font-semibold">AI Highlights & Warnings</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight) => (
            <li key={insight.id} className="flex items-start gap-2">
              <span className={`inline-block mt-0.5 ${getInsightColor(insight.type)}`}>•</span>
              <span className="text-sm">{insight.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AiHighlights;
