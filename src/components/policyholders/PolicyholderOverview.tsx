
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCheck, Star, Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PolicyholderOverview = () => {
  // Sample data - would be replaced with real data from API
  const policyholder = {
    name: "Ahmed Al Maktoum",
    type: "Individual", // or "Company"
    isVip: true,
    assignedAgent: "Sarah Johnson",
    source: "Agent",
    category: "TITAN GROUP",
    status: "Active",
    email: "ahmed@titangroup.ae",
    mobile: "+971 50 123 4567",
    whatsApp: "+971 50 123 4567",
    kycCompletionStatus: "completed", // completed, incomplete, expiring
    kycCompletionPercentage: 100,
    // New field for profile image or company logo
    profileImage: "/lovable-uploads/66a81866-061b-4545-bd43-d1742f06411f.png" // Sample placeholder
  };

  const handleEmailContact = () => {
    window.open(`mailto:${policyholder.email}`);
    toast.success(`Opening email to ${policyholder.email}`);
  };

  const handlePhoneContact = () => {
    window.open(`tel:${policyholder.mobile}`);
    toast.success(`Calling ${policyholder.mobile}`);
  };

  const handleWhatsAppContact = () => {
    // WhatsApp API link format
    window.open(`https://wa.me/${policyholder.whatsApp.replace(/\s+/g, "")}`);
    toast.success(`Opening WhatsApp chat with ${policyholder.whatsApp}`);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="border-t-4 border-t-[#9C2D55]">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Client basic info and profile image */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-4">
              {/* Profile Image or Logo */}
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32 border-2 border-[#9C2D55]">
                  <AvatarImage 
                    src={policyholder.profileImage} 
                    alt={`${policyholder.name} ${policyholder.type === "Individual" ? "photo" : "logo"}`} 
                  />
                  <AvatarFallback className="text-3xl bg-[#9C2D55] text-white">
                    {getInitials(policyholder.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs text-center mt-1 text-muted-foreground">
                  {policyholder.type === "Individual" ? "Client Photo" : "Company Logo"}
                </div>
              </div>

              {/* Client Name and VIP Badge */}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">{policyholder.name}</h2>
                  {policyholder.isVip && (
                    <Badge className="bg-amber-500">
                      <Star className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mt-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Client Type</p>
                    <p>{policyholder.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Agent</p>
                    <p>{policyholder.assignedAgent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Source</p>
                    <p>{policyholder.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category/Group</p>
                    <p>{policyholder.category}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Client Status</p>
                    <Badge 
                      className={
                        policyholder.status === "Active" ? "bg-green-500" : 
                        policyholder.status === "Inactive" ? "bg-gray-500" :
                        policyholder.status === "Dormant" ? "bg-amber-500" : "bg-red-500"
                      }
                    >
                      {policyholder.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Contact info and KYC status */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Contact Information</h3>
              <div className="flex items-center gap-2">
                <Switch id="vip-mode" checked={policyholder.isVip} />
                <Label htmlFor="vip-mode">VIP Client</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-y-2 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <p>{policyholder.email}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleEmailContact}
                    className="p-1 h-auto"
                  >
                    <Mail className="h-4 w-4 text-praktora-burgundy" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <div className="flex items-center gap-2">
                  <p>{policyholder.mobile}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handlePhoneContact}
                    className="p-1 h-auto"
                  >
                    <Phone className="h-4 w-4 text-praktora-burgundy" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <div className="flex items-center gap-2">
                  <p>{policyholder.whatsApp}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleWhatsAppContact}
                    className="p-1 h-auto"
                  >
                    <MessageSquare className="h-4 w-4 text-praktora-burgundy" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">KYC Completion Status</h3>
                <Badge 
                  className={
                    policyholder.kycCompletionStatus === "completed" ? "bg-green-500" : 
                    policyholder.kycCompletionStatus === "incomplete" ? "bg-red-500" : "bg-amber-500"
                  }
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  {policyholder.kycCompletionStatus === "completed" ? "Completed" : 
                   policyholder.kycCompletionStatus === "incomplete" ? "Incomplete" : "Expiring Soon"}
                </Badge>
              </div>
              <Progress 
                value={policyholder.kycCompletionPercentage} 
                className="h-2" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyholderOverview;
