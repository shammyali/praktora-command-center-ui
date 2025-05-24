
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCheck, Star, Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Customer } from "@/services/api/praktoraWebApi";

interface PolicyholderOverviewProps {
  customer: Customer;
}

const PolicyholderOverview = ({ customer }: PolicyholderOverviewProps) => {
  const handleEmailContact = () => {
    window.open(`mailto:${customer.email}`);
    toast.success(`Opening email to ${customer.email}`);
  };

  const handlePhoneContact = () => {
    window.open(`tel:${customer.mobile}`);
    toast.success(`Calling ${customer.mobile}`);
  };

  const handleWhatsAppContact = () => {
    // WhatsApp API link format
    window.open(`https://wa.me/${customer.mobile.replace(/\s+/g, "")}`);
    toast.success(`Opening WhatsApp chat with ${customer.mobile}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Set or update VIP status
  const handleVipStatusChange = (checked: boolean) => {
    toast.success(`${checked ? 'Set' : 'Removed'} VIP status for ${customer.fullName}`);
    // In a real implementation, this would update the customer data via API
  };

  return (
    <Card className="border-t-4 border-t-[#9C2D55]">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Client basic info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-4">
              {/* Client Name and VIP Badge */}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">{customer.fullName}</h2>
                  {customer.isVip && (
                    <Badge className="bg-amber-500">
                      <Star className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mt-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Client Type</p>
                    <p>{customer.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Agent</p>
                    <p>{customer.assignedAgent || "Not Assigned"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Source</p>
                    <p>{customer.source || "Direct"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category/Group</p>
                    <p>{customer.category || "Not Categorized"}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Client Status</p>
                    <Badge 
                      className={
                        customer.status === "Active" ? "bg-green-500" : 
                        customer.status === "Inactive" ? "bg-gray-500" :
                        customer.status === "Dormant" ? "bg-amber-500" : "bg-red-500"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center column - Profile Image or Logo */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex-shrink-0">
              <div className="w-32 h-40 overflow-hidden border-2 border-[#9C2D55] rounded">
                {customer.profileImage ? (
                  <img
                    src={customer.profileImage}
                    alt={`${customer.fullName} ${customer.type === "Individual" ? "photo" : "logo"}`}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-2xl font-semibold">{getInitials(customer.fullName)}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-center mt-1 text-muted-foreground">
                {customer.type === "Individual" ? "Passport Photo" : "Company Logo"}
              </div>
            </div>
          </div>
          
          {/* Right column - Contact info and KYC status */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Contact Information</h3>
              <div className="flex items-center gap-2">
                <Switch 
                  id="vip-mode" 
                  checked={customer.isVip} 
                  onCheckedChange={handleVipStatusChange}
                />
                <Label htmlFor="vip-mode">VIP Client</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-y-2 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <p>{customer.email}</p>
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
                  <p>{customer.mobile}</p>
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
                  <p>{customer.mobile}</p>
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
                    customer.kycCompletionStatus === "Completed" ? "bg-green-500" : 
                    customer.kycCompletionStatus === "Incomplete" ? "bg-red-500" : "bg-amber-500"
                  }
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  {customer.kycCompletionStatus === "Completed" ? "Completed" : 
                   customer.kycCompletionStatus === "Incomplete" ? "Incomplete" : "Expiring Soon"}
                </Badge>
              </div>
              <Progress 
                value={customer.kycCompletionPercentage} 
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
