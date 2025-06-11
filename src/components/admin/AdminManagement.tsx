import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  Search, 
  Filter, 
  Building2, 
  IndianRupee, 
  RefreshCw,
  Eye,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PGAdmin, useUpdateSubscription, useExtendTrial } from "@/hooks/usePGAdmins";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface AdminManagementProps {
  admins: PGAdmin[];
  isLoading?: boolean;
  onRefresh?: () => void;
  selectedAdmins?: string[];
  onSelectionChange?: (adminIds: string[]) => void;
  onAdminClick?: (admin: PGAdmin) => void;
}

const AdminManagement = ({ 
  admins, 
  isLoading, 
  onRefresh, 
  selectedAdmins = [], 
  onSelectionChange,
  onAdminClick
}: AdminManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const updateSubscriptionMutation = useUpdateSubscription();
  const extendTrialMutation = useExtendTrial();

  // Filter admins based on search and status
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.commonId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || admin.subscriptionStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs font-medium">Active</Badge>;
      case "free":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs font-medium">Free Trial</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-700 border-red-200 text-xs font-medium">Expired</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs font-medium">Pending</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const handleUpdateSubscription = (adminId: string, newTier: string) => {
    updateSubscriptionMutation.mutate({ adminId, newTier }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Subscription updated to ${newTier} successfully`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update subscription",
          variant: "destructive",
        });
      }
    });
  };

  const handleExtendTrial = (adminId: string) => {
    extendTrialMutation.mutate(adminId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Trial extended by 30 days successfully",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to extend trial",
          variant: "destructive",
        });
      }
    });
  };

  const handleAdminSelection = (adminId: string, checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      onSelectionChange([...selectedAdmins, adminId]);
    } else {
      onSelectionChange(selectedAdmins.filter(id => id !== adminId));
    }
  };

  const handleCallAdmin = (email: string) => {
    // In a real app, this would integrate with a calling service
    toast({
      title: "Call Feature",
      description: `Calling ${email}... (Feature would integrate with VoIP service)`,
    });
  };

  const handleEmailAdmin = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-indigo-600" />
            PG Admin Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="bg-white border-b border-slate-100 rounded-t-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
            <Users className="h-5 w-5 mr-3 text-indigo-600" />
            PG Admin Management
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 w-full sm:w-auto text-center">
              {filteredAdmins.length} Admins
            </Badge>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 w-full"
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-auto pl-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="free">Free Trial</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      {/* Admin Cards - Mobile Optimized with Accordion */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredAdmins.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No admins found matching your criteria</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredAdmins.map((admin) => (
              <AccordionItem key={admin.id} value={admin.id} className="border border-slate-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-md rounded-lg">
                <AccordionTrigger className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {admin.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-base truncate">{admin.name}</h3>
                    <p className="text-slate-600 text-sm truncate">{admin.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{admin.commonId}</Badge>
                      {getStatusBadge(admin.subscriptionStatus)}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-slate-50">
                  {/* Details and actions, same as before, but stacked for mobile */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{admin.totalPGs} PGs</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-medium">
                      <IndianRupee className="h-4 w-4" />
                      <span>₹{admin.monthlyRevenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallAdmin(admin.email)}
                        className="flex-1 text-xs border-slate-300 hover:bg-slate-50"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEmailAdmin(admin.email)}
                        className="flex-1 text-xs border-slate-300 hover:bg-slate-50"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      {onAdminClick && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAdminClick(admin)}
                          className="flex-1 text-xs border-slate-300 hover:bg-slate-50"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      )}
                    </div>
                    {/* Dropdown for more actions, as before */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Card>
  );
};

export default AdminManagement;
