
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Clock,
  MessageCircle,
  GitMerge,
  Send,
  Car,
  HeartPulse,
  TrendingUp,
  Mail,
  Heart,
  Repeat,
  Share2,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { InsightCard } from "@/data/intelligenceData";
import { Badge } from "@/components/ui/badge";

interface InsightCardComponentProps {
  insight: InsightCard;
}

const InsightCardComponent = ({ insight }: InsightCardComponentProps) => {
  const getIcon = () => {
    switch (insight.icon) {
      case "message-circle": return <MessageCircle className="h-5 w-5" />;
      case "heart-pulse": return <HeartPulse className="h-5 w-5" />;
      case "clock": return <Clock className="h-5 w-5" />;
      case "git-merge": return <GitMerge className="h-5 w-5" />;
      case "car": return <Car className="h-5 w-5" />;
      case "trending-up": return <TrendingUp className="h-5 w-5" />;
      case "alert-triangle": return <AlertCircle className="h-5 w-5" />;
      case "alert-circle": return <AlertCircle className="h-5 w-5" />;
      case "mail": return <Mail className="h-5 w-5" />;
      case "heart": return <Heart className="h-5 w-5" />;
      case "repeat": return <Repeat className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  const getPriorityColor = () => {
    switch (insight.priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getCategoryLabel = () => {
    switch (insight.category) {
      case "what-happened": return "What Happened";
      case "patterns": return "Pattern";
      case "risks": return "Risk Alert";
      case "next-actions": return "Action Item";
      default: return "Insight";
    }
  };
  
  return (
    <Card className={`border ${insight.priority === "high" ? "border-red-300" : ""}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className={`p-2 rounded-full ${
            insight.category === "what-happened" ? "bg-blue-100 text-blue-600" :
            insight.category === "patterns" ? "bg-green-100 text-green-600" :
            insight.category === "risks" ? "bg-amber-100 text-amber-600" :
            "bg-praktora-burgundy/10 text-praktora-burgundy"
          }`}>
            {getIcon()}
          </div>
          <div className="flex gap-1">
            {insight.priority && (
              <Badge variant="outline" className={`${getPriorityColor()}`}>
                {insight.priority}
              </Badge>
            )}
            <Badge variant="outline" className="bg-gray-100 text-gray-800">
              {getCategoryLabel()}
            </Badge>
          </div>
        </div>
        <p className="text-sm mt-2">{insight.text}</p>
        
        {insight.actionable && (
          <div className="flex justify-end mt-3">
            <Button size="sm" className="text-xs h-7 rounded-full bg-praktora-burgundy hover:bg-praktora-burgundy/80">
              Take Action
              <Send className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface AIInsightsPanelProps {
  insights: InsightCard[];
}

const AIInsightsPanel = ({ insights }: AIInsightsPanelProps) => {
  const [activeView, setActiveView] = useState<"all" | "what-happened" | "patterns" | "risks" | "next-actions">("all");
  
  const filteredInsights = activeView === "all" 
    ? insights 
    : insights.filter(insight => insight.category === activeView);
  
  const whatHappenedInsights = insights.filter(i => i.category === "what-happened");
  const patternInsights = insights.filter(i => i.category === "patterns");
  const riskInsights = insights.filter(i => i.category === "risks");
  const nextActionInsights = insights.filter(i => i.category === "next-actions");
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center">
          <span className="mr-2">🧠</span> P²RA Intelligence
        </CardTitle>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-3.5 w-3.5" />
                <span className="sr-only">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share insights</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" />
                <span className="ml-1.5 text-xs">Export AI Report</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export AI report</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          <Button 
            size="sm" 
            variant={activeView === "all" ? "default" : "outline"}
            onClick={() => setActiveView("all")}
            className={activeView === "all" ? "bg-praktora-burgundy hover:bg-praktora-burgundy/80" : ""}
          >
            All Insights
            {insights.length > 0 && (
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5">{insights.length}</span>
            )}
          </Button>
          <Button 
            size="sm" 
            variant={activeView === "what-happened" ? "default" : "outline"}
            onClick={() => setActiveView("what-happened")}
            className={activeView === "what-happened" ? "bg-blue-500 hover:bg-blue-600" : ""}
          >
            What Happened
            {whatHappenedInsights.length > 0 && (
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5">{whatHappenedInsights.length}</span>
            )}
          </Button>
          <Button 
            size="sm" 
            variant={activeView === "patterns" ? "default" : "outline"}
            onClick={() => setActiveView("patterns")}
            className={activeView === "patterns" ? "bg-green-500 hover:bg-green-600" : ""}
          >
            Patterns
            {patternInsights.length > 0 && (
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5">{patternInsights.length}</span>
            )}
          </Button>
          <Button 
            size="sm" 
            variant={activeView === "risks" ? "default" : "outline"}
            onClick={() => setActiveView("risks")}
            className={activeView === "risks" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            Risks
            {riskInsights.length > 0 && (
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5">{riskInsights.length}</span>
            )}
          </Button>
          <Button 
            size="sm" 
            variant={activeView === "next-actions" ? "default" : "outline"}
            onClick={() => setActiveView("next-actions")}
            className={activeView === "next-actions" ? "bg-praktora-burgundy hover:bg-praktora-burgundy/80" : ""}
          >
            Action Items
            {nextActionInsights.length > 0 && (
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5">{nextActionInsights.length}</span>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredInsights.map((insight) => (
            <InsightCardComponent key={insight.id} insight={insight} />
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button className="bg-praktora-burgundy hover:bg-praktora-burgundy/80">
            Generate New Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
