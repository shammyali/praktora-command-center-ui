
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  BarChart4,
  Filter,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OperationsMetric, OperationsMetrics } from "@/data/intelligenceData";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from "recharts";

interface OperationsMetricCardProps {
  metric: OperationsMetric;
}

const OperationsMetricCard = ({ metric }: OperationsMetricCardProps) => {
  const renderTrendIcon = () => {
    switch (metric.trend) {
      case "up":
        return (
          <div className={`flex items-center ${
            // For some metrics, "up" is bad (SLA breach, time to response)
            metric.name.includes("SLA") || metric.name.includes("Time") ? "text-red-600" : "text-green-600"
          }`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{metric.changePercentage}</span>
          </div>
        );
      case "down":
        return (
          <div className={`flex items-center ${
            // For some metrics, "down" is good (SLA breach, time to response)
            metric.name.includes("SLA") || metric.name.includes("Time") ? "text-green-600" : "text-red-600"
          }`}>
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

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{metric.name}</p>
          {renderTrendIcon()}
        </div>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-2xl font-bold">{metric.value}</p>
        </div>
        {metric.details && (
          <p className="mt-1 text-xs text-muted-foreground">{metric.details}</p>
        )}
      </CardContent>
    </Card>
  );
};

// Mock chart data
const mockChartData = [
  { name: "Jan", enquiries: 65, quotes: 55, policies: 42 },
  { name: "Feb", enquiries: 59, quotes: 48, policies: 38 },
  { name: "Mar", enquiries: 80, quotes: 64, policies: 51 },
  { name: "Apr", enquiries: 81, quotes: 68, policies: 54 },
  { name: "May", enquiries: 56, quotes: 48, policies: 39 },
  { name: "Jun", enquiries: 55, quotes: 42, policies: 32 },
  { name: "Jul", enquiries: 40, quotes: 35, policies: 27 }
];

interface OperationsMetricsPanelProps {
  metrics: OperationsMetrics;
}

const OperationsMetricsPanel = ({ metrics }: OperationsMetricsPanelProps) => {
  const [agentFilter, setAgentFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center">
          <span className="mr-2">⚙️</span> Operations Metrics
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="h-8 w-[130px]" aria-label="Filter by agent">
                <Users className="h-3.5 w-3.5 mr-2" />
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="omar">Omar H.</SelectItem>
                <SelectItem value="fatima">Fatima S.</SelectItem>
                <SelectItem value="ahmed">Ahmed M.</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="h-8 w-[130px]" aria-label="Filter by class">
                <Filter className="h-3.5 w-3.5 mr-2" />
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="motor">Motor</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="property">Property</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <OperationsMetricCard metric={metrics.enquiryToQuoteTime} />
            <OperationsMetricCard metric={metrics.issuePolicyTime} />
            <OperationsMetricCard metric={metrics.emailResponseTime} />
            <OperationsMetricCard metric={metrics.slaBreachRate} />
            <OperationsMetricCard metric={metrics.enquiriesNotQuoted} />
            <OperationsMetricCard metric={metrics.claimsPendingSurvey} />
          </div>
          
          <div className="md:col-span-4 h-72 pt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <BarChart4 className="h-3.5 w-3.5 mr-1.5" />
                Funnel Conversion Trends
              </h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <RechartsTooltip />
                <Area 
                  type="monotone" 
                  dataKey="enquiries" 
                  name="Enquiries"
                  stackId="1" 
                  stroke="#9C2D55" 
                  fill="#9C2D55" 
                  fillOpacity={0.8}
                />
                <Area 
                  type="monotone" 
                  dataKey="quotes" 
                  name="Quotes"
                  stackId="2" 
                  stroke="#0ea5e9" 
                  fill="#0ea5e9" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="policies" 
                  name="Policies"
                  stackId="3" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationsMetricsPanel;
