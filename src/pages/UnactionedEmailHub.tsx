
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MailIcon, 
  SearchIcon, 
  FilterIcon, 
  CheckCircle, 
  ChevronDown,
  AlertCircle,
  ArrowUpRight,
  Clock,
  UserCircle2,
  FileText,
  PanelRight,
  PanelLeft,
  SparklesIcon,
  SendIcon,
  LinkIcon,
  CheckIcon,
  XIcon,
  MailQuestionIcon,
  MessageSquareIcon,
  FileTextIcon,
  ClipboardCheckIcon,
  PlusCircleIcon,
  ForwardIcon
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmailDetailPanel from "@/components/email/EmailDetailPanel";
import EmailActionPanel from "@/components/email/EmailActionPanel";
import { mockEmails } from "@/data/emailsData";
import { useToast } from "@/hooks/use-toast";

// Email types
type EmailStatus = "Unlinked" | "In Progress" | "Done";
type EmailType = "Quote Request" | "Renewal" | "Claim" | "Complaint" | "Unknown";

type Email = {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  receivedTime: string;
  detectedType: EmailType;
  clientMatch: string | null;
  suggestedAction: string;
  status: EmailStatus;
  content: string;
  unread: boolean;
  attachments: {
    name: string;
    type: string;
    size: string;
  }[];
  aiSummary: string;
  priority: "high" | "medium" | "low";
};

const UnactionedEmailHub = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailPanel, setShowDetailPanel] = useState(true);
  const [showActionPanel, setShowActionPanel] = useState(true);
  const [filterType, setFilterType] = useState<EmailType | "All">("All");
  const [filterStatus, setFilterStatus] = useState<EmailStatus | "All">("All");
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call to fetch emails
    if (emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0]);
    }
  }, [emails, selectedEmail]);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    
    // Mark email as read if unread
    if (email.unread) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, unread: false } : e
      ));
    }
  };

  const handleMarkActioned = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id 
        ? { ...email, status: "Done" } 
        : email
    ));
    
    toast({
      title: "Email marked as actioned",
      description: "Email has been marked as completed",
    });
  };
  
  const handleSetInProgress = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id 
        ? { ...email, status: "In Progress" } 
        : email
    ));
    
    toast({
      title: "Status updated",
      description: "Email marked as in progress",
    });
  };

  const filteredEmails = emails
    .filter(email => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          email.subject.toLowerCase().includes(query) ||
          email.sender.toLowerCase().includes(query) ||
          email.senderEmail.toLowerCase().includes(query) ||
          email.content.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(email => {
      // Apply type filter
      if (filterType !== "All") {
        return email.detectedType === filterType;
      }
      return true;
    })
    .filter(email => {
      // Apply status filter
      if (filterStatus !== "All") {
        return email.status === filterStatus;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by unread first, then by status (Unlinked > In Progress > Done)
      if (a.unread !== b.unread) return a.unread ? -1 : 1;
      
      const statusOrder = {
        "Unlinked": 0,
        "In Progress": 1,
        "Done": 2
      };
      
      return statusOrder[a.status] - statusOrder[b.status];
    });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 overflow-hidden">
          {/* Dashboard metrics */}
          <div className="grid grid-cols-5 gap-4 p-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">17</div>
                <p className="text-xs text-muted-foreground">New Unlinked Emails Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Linked to Workflows</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">2h 18m</div>
                <p className="text-xs text-muted-foreground">Avg. Email Response Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Quote Requests via Email</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">9</div>
                <p className="text-xs text-muted-foreground">P²RA Suggested Actions Executed</p>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Unactioned Email Hub — P²RA Intelligence-Driven Inbox</h1>
                <p className="text-muted-foreground">
                  AI-powered analysis of emails requiring attention
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDetailPanel(!showDetailPanel)}>
                  <PanelLeft className="h-4 w-4 mr-1" /> {showDetailPanel ? "Hide" : "Show"} Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowActionPanel(!showActionPanel)}>
                  <PanelRight className="h-4 w-4 mr-1" /> {showActionPanel ? "Hide" : "Show"} Actions
                </Button>
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-1" /> Filter
                </Button>
                <Button size="sm" className="bg-praktora-burgundy hover:bg-praktora-burgundy/80">
                  <SparklesIcon className="h-4 w-4 mr-1" /> Auto-Process
                </Button>
              </div>
            </div>

            <div className="my-4 flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search emails..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="bg-background border rounded-md px-3 py-2 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as EmailType | "All")}
                >
                  <option value="All">All Types</option>
                  <option value="Quote Request">Quote Request</option>
                  <option value="Renewal">Renewal</option>
                  <option value="Claim">Claim</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Unknown">Unknown</option>
                </select>
                
                <select 
                  className="bg-background border rounded-md px-3 py-2 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as EmailStatus | "All")}
                >
                  <option value="All">All Status</option>
                  <option value="Unlinked">Unlinked</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>

            {/* Main layout */}
            <div className="flex gap-4 h-[calc(100vh-330px)]">
              {/* Email list */}
              <div className="w-full lg:w-2/5 border rounded-md overflow-hidden">
                <div className="bg-muted p-2 border-b flex justify-between items-center">
                  <span className="font-medium">Emails ({filteredEmails.length})</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <AlertCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-380px)]">
                  <div className="divide-y">
                    {filteredEmails.length > 0 ? (
                      filteredEmails.map((email) => (
                        <div
                          key={email.id}
                          className={cn(
                            "p-3 cursor-pointer hover:bg-muted",
                            selectedEmail?.id === email.id && "bg-muted",
                            email.unread && "border-l-4 border-praktora-burgundy"
                          )}
                          onClick={() => handleEmailClick(email)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-medium flex items-center">
                              {email.unread && (
                                <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                              )}
                              {email.sender}
                            </div>
                            <div className="text-xs text-muted-foreground">{email.receivedTime}</div>
                          </div>
                          <div className="text-sm font-medium mb-1 truncate">{email.subject}</div>
                          <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {email.aiSummary}
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge
                              className={cn(
                                email.detectedType === "Quote Request" && "bg-blue-100 text-blue-800",
                                email.detectedType === "Renewal" && "bg-green-100 text-green-800",
                                email.detectedType === "Claim" && "bg-amber-100 text-amber-800",
                                email.detectedType === "Complaint" && "bg-red-100 text-red-800",
                                email.detectedType === "Unknown" && "bg-gray-100 text-gray-800"
                              )}
                            >
                              {email.detectedType}
                            </Badge>
                            <Badge
                              className={cn(
                                email.status === "Unlinked" && "bg-red-100 text-red-800",
                                email.status === "In Progress" && "bg-amber-100 text-amber-800",
                                email.status === "Done" && "bg-green-100 text-green-800"
                              )}
                            >
                              {email.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <MailIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="font-medium text-lg">No emails found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Center panel - Email detail */}
              {selectedEmail && showDetailPanel && (
                <EmailDetailPanel 
                  email={selectedEmail} 
                  className="w-full lg:flex-1 border rounded-md overflow-hidden" 
                />
              )}

              {/* Right panel - Actions */}
              {selectedEmail && showActionPanel && (
                <EmailActionPanel 
                  email={selectedEmail}
                  onMarkActioned={() => handleMarkActioned(selectedEmail.id)}
                  onSetInProgress={() => handleSetInProgress(selectedEmail.id)}
                  className="w-full lg:w-1/4 border rounded-md overflow-hidden"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnactionedEmailHub;
