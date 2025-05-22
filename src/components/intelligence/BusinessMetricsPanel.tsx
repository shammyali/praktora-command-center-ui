
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BusinessMetric, BusinessMetrics } from "@/data/intelligenceData";

interface BusinessMetricCardProps {
  metric: BusinessMetric;
}

const BusinessMetricCard = ({ metric }: BusinessMetricCardProps) => {
  const renderTrendIcon = () => {
    switch (metric.trend) {
      case "up":
        return (
          <div className="flex items-center text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{metric.changePercentage}</span>
          </div>
        );
      case "down":
        return (
          <div className="flex items-center text-red-600">
            <TrendingDown className="h-4 w-4 mr-1" />
            <span>{metric.changePercentage}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600">
            <Minus className="h-4 w-4 mr-1" />
            <span>{metric.changePercentage}</span>
          </div>
        );
    }
  };

  const renderSparkline = () => {
    if (!metric.sparklineData || metric.sparklineData.length === 0) return null;

    const max = Math.max(...metric.sparklineData);
    const min = Math.min(...metric.sparklineData);
    const range = max - min || 1;
    
    // Create SVG path for the sparkline
    const points = metric.sparklineData.map((value, index) => {
      const x = (index / (metric.sparklineData!.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(" ");

    return (
      <div className="h-8 w-16">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={metric.trend === "up" ? "#10B981" : metric.trend === "down" ? "#EF4444" : "#6B7280"}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{metric.name}</p>
          {renderTrendIcon()}
        </div>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-2xl font-bold">{metric.value}</p>
          {renderSparkline()}
        </div>
      </CardContent>
    </Card>
  );
};

interface BusinessMetricsPanelProps {
  metrics: BusinessMetrics;
  onRefresh: () => void;
}

const BusinessMetricsPanel = ({ metrics, onRefresh }: BusinessMetricsPanelProps) => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center">
          <span className="mr-2">📊</span> Business Metrics
        </CardTitle>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="sr-only">Refresh</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh metrics</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" />
                <span className="sr-only">Export</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export data</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <BusinessMetricCard metric={metrics.totalEnquiries} />
          <BusinessMetricCard metric={metrics.policiesIssued} />
          <BusinessMetricCard metric={metrics.claimsFiled} />
          <BusinessMetricCard metric={metrics.quotesSent} />
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-4">
          <BusinessMetricCard metric={metrics.revenueEstimate} />
          <BusinessMetricCard metric={metrics.conversionRate} />
          <BusinessMetricCard metric={metrics.whatsappQuotes} />
          <BusinessMetricCard metric={metrics.emailQuotes} />
        </div>

        <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <AlertCircle className="h-3 w-3 mr-1.5" />
            <p>Based on 30 day rolling data. Updated hourly.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessMetricsPanel;
