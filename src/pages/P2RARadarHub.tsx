
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  Filter, 
  Settings, 
  CheckCircle, 
  MessageCircle,
  FileText,
  User,
  CreditCard,
  BrainCircuit,
  Hourglass,
  ArrowDownToLine,
  Send,
  Users,
  Repeat,
  MailIcon,
  ChevronDown,
  ChevronUp,
  Timer
} from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { 
  radarAlerts, 
  aiOpportunities, 
  radarStats,
  AlertType,
  AlertCategory,
  AlertPriority,
  RadarAlert,
  AIOpportunity,
  classTypes,
  sourceTypes,
  agentsList,
  ageRanges,
  urgencyLevels
} from '@/data/radarData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FilterState {
  urgency: string;
  classType: string;
  source: string;
  ageRange: string;
  agent: string;
  showAiPredictions: boolean;
}

const P2RARadarHub = () => {
  const [allAlerts, setAllAlerts] = useState<Array<RadarAlert | AIOpportunity>>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Array<RadarAlert | AIOpportunity>>([]);
  const [refreshTimer, setRefreshTimer] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    urgency: "All",
    classType: "All",
    source: "All",
    ageRange: "All",
    agent: "All",
    showAiPredictions: true
  });

  // Categories for grouping alerts
  const categories: AlertCategory[] = [
    "quotes", 
    "claims", 
    "renewals", 
    "communications", 
    "finance", 
    "opportunities"
  ];

  const categoryLabels: Record<AlertCategory, string> = {
    quotes: "Quotes & Enquiries",
    claims: "Claims",
    renewals: "Renewals",
    communications: "Client Communications",
    finance: "Finance & Payments",
    opportunities: "AI Revenue Triggers"
  };

  // First, merge regular alerts and AI opportunities
  useEffect(() => {
    const combinedAlerts = [...radarAlerts];
    
    // Only add AI opportunities if the filter is enabled
    if (filters.showAiPredictions) {
      combinedAlerts.push(...aiOpportunities);
    }
    
    setAllAlerts(combinedAlerts);
  }, [filters.showAiPredictions]);

  // Then apply filters to all alerts
  useEffect(() => {
    let result = [...allAlerts];

    // Apply urgency filter
    if (filters.urgency === "Urgent Only") {
      result = result.filter(alert => alert.priority === "critical");
    } else if (filters.urgency === "Actioned") {
      result = result.filter(alert => alert.priority === "handled");
    }

    // Apply class filter
    if (filters.classType !== "All") {
      result = result.filter(alert => alert.classType === filters.classType);
    }

    // Apply agent filter
    if (filters.agent !== "All") {
      result = result.filter(alert => alert.agent === filters.agent);
    }

    // Apply age filter
    if (filters.ageRange === ">24h") {
      result = result.filter(alert => alert.elapsedDays >= 1);
    } else if (filters.ageRange === ">48h") {
      result = result.filter(alert => alert.elapsedDays >= 2);
    } else if (filters.ageRange === ">72h") {
      result = result.filter(alert => alert.elapsedDays >= 3);
    }

    setFilteredAlerts(result);
  }, [allAlerts, filters]);

  // Handle auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTimer(prev => {
        if (prev <= 1) {
          handleRefresh();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      // In a real app, you would fetch new data here
      setIsRefreshing(false);
      setRefreshTimer(60);
    }, 1000);
  };

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'enquiry':
        return <Hourglass className="h-5 w-5 text-blue-500" />;
      case 'policy':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'invoice':
        return <CreditCard className="h-5 w-5 text-amber-500" />;
      case 'chat':
        return <MessageCircle className="h-5 w-5 text-indigo-600" />;
      case 'opportunity':
        return <BrainCircuit className="h-5 w-5 text-purple-600" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getPriorityBadge = (priority: AlertPriority) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-600 font-medium">Critical</span>
          </span>
        );
      case 'attention':
        return (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span className="text-amber-600 font-medium">Attention Needed</span>
          </span>
        );
      case 'handled':
        return (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-green-600 font-medium">Recently Handled</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Get alerts for a specific category
  const getAlertsByCategory = (category: AlertCategory) => {
    return filteredAlerts.filter(alert => alert.category === category);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          title="P²RA Radar" 
          subtitle="Intelligent Watchtower for Brokerage Execution" 
        />
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 italic">
              Monitors everything. Misses nothing. Suggests your next best move.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PANEL: Live AI Radar Feed */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-praktora-burgundy" />
                  Live AI Radar Feed
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Auto-refresh in: {refreshTimer}s
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Alert Categories Accordion */}
              <Accordion type="multiple" defaultValue={categories} className="space-y-4">
                {categories.map((category) => (
                  <AccordionItem 
                    key={category} 
                    value={category}
                    className="border rounded-lg bg-white shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <h3 className="font-medium">{categoryLabels[category]}</h3>
                        <Badge variant="secondary">
                          {getAlertsByCategory(category).length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2">
                      {getAlertsByCategory(category).length > 0 ? (
                        <div className="space-y-3">
                          {getAlertsByCategory(category).map((alert) => (
                            <Card 
                              key={alert.id} 
                              className={`
                                overflow-hidden transition-all duration-300
                                ${alert.priority === 'critical' ? 'border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : ''}
                                ${alert.isNew ? 'animate-fade-in' : ''}
                              `}
                            >
                              <CardContent className="p-4">
                                <div className="flex flex-col space-y-3">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                      {getAlertIcon(alert.type)}
                                      <div>
                                        <h4 className="font-medium text-sm">{alert.title}</h4>
                                        <p className="text-xs text-gray-500">
                                          {alert.client} • {alert.agent} • {alert.classType}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge 
                                      variant="outline" 
                                      className={`
                                        ${alert.priority === 'critical' ? 'border-red-300 text-red-600' : ''}
                                        ${alert.priority === 'attention' ? 'border-amber-300 text-amber-600' : ''}
                                        ${alert.priority === 'handled' ? 'border-green-300 text-green-600' : ''}
                                      `}
                                    >
                                      {alert.elapsedTime}
                                    </Badge>
                                  </div>
                                  
                                  {'insight' in alert && (
                                    <Alert className="bg-blue-50 border-blue-200">
                                      <AlertDescription className="text-xs text-blue-700">
                                        {alert.insight}
                                      </AlertDescription>
                                    </Alert>
                                  )}
                                  
                                  <div className="flex justify-between items-center pt-2">
                                    <div>
                                      {getPriorityBadge(alert.priority)}
                                    </div>
                                    <Button 
                                      size="sm" 
                                      asChild
                                      variant={alert.priority === 'critical' ? 'default' : 'outline'}
                                    >
                                      <Link to={alert.actionLink}>
                                        {alert.suggestedAction}
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic py-2">No alerts in this category</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* RIGHT PANEL: Controls & Filters */}
            <div className="space-y-6">
              {/* KPI Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Radar Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Active Alerts</span>
                      <span className="font-medium">{radarStats.totalActiveAlerts}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Alert Age</span>
                      <span className="font-medium">{radarStats.avgAlertAge} days</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Resolved Today</span>
                      <span className="font-medium">{radarStats.resolvedToday}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">AI Opportunity Score</span>
                      <span className="font-medium">{radarStats.aiOpportunityScore}%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue at Risk</span>
                      <span className="font-medium text-red-600">AED {radarStats.revenueAtRisk.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Radar Filters */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Radar Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Urgency</label>
                    <Select 
                      value={filters.urgency}
                      onValueChange={(value) => setFilters({...filters, urgency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {urgencyLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Class</label>
                    <Select 
                      value={filters.classType}
                      onValueChange={(value) => setFilters({...filters, classType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {classTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Source</label>
                    <Select 
                      value={filters.source}
                      onValueChange={(value) => setFilters({...filters, source: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sourceTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Select 
                      value={filters.ageRange}
                      onValueChange={(value) => setFilters({...filters, ageRange: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {ageRanges.map(range => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Agent</label>
                    <Select 
                      value={filters.agent}
                      onValueChange={(value) => setFilters({...filters, agent: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {agentsList.map(agent => (
                            <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Radar Settings */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Radar Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show AI Predictions</label>
                    <Switch 
                      checked={filters.showAiPredictions} 
                      onCheckedChange={(checked) => setFilters({...filters, showAiPredictions: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">SLA-Only Mode</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-Escalate after 3 days</label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Radar Actions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Radar Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                    <CheckCircle className="h-4 w-4" />
                    Bulk Resolve Selected
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                    <Repeat className="h-4 w-4" />
                    Assign to Agent
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                    <Send className="h-4 w-4" />
                    Send Mass Reminder
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                    <ArrowDownToLine className="h-4 w-4" />
                    Export Current Radar
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                    <MailIcon className="h-4 w-4" />
                    Send Radar Digest
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2RARadarHub;
