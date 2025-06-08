
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PGAdmin, useUpdateSubscription, useExtendTrial } from "@/hooks/usePGAdmins";

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
        return <Badge className="bg-emerald-100 text-emerald-700 font-medium">Active</Badge>;
      case "free":
        return <Badge className="bg-blue-100 text-blue-700 font-medium">Free Trial</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-700 font-medium">Expired</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 font-medium">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleUpdateSubscription = (adminId: string, newTier: string) => {
    updateSubscriptionMutation.mutate({ adminId, newTier });
  };

  const handleExtendTrial = (adminId: string) => {
    extendTrialMutation.mutate(adminId);
  };

  const handleAdminSelection = (adminId: string, checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      onSelectionChange([...selectedAdmins, adminId]);
    } else {
      onSelectionChange(selectedAdmins.filter(id => id !== adminId));
    }
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              {filteredAdmins.length} Admins
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-white text-sm min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="free">Free Trial</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Admin Cards */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {filteredAdmins.map((admin) => (
            <Card key={admin.id} className="border border-slate-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  {onSelectionChange && (
                    <Checkbox
                      checked={selectedAdmins.includes(admin.id)}
                      onCheckedChange={(checked) => handleAdminSelection(admin.id, checked as boolean)}
                      className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                  )}
                  
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                      {admin.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-lg">{admin.name}</h3>
                      <p className="text-slate-600 text-sm">{admin.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{admin.commonId}</Badge>
                        {getStatusBadge(admin.subscriptionStatus)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{admin.totalPGs} PGs</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 font-medium">
                        <IndianRupee className="h-4 w-4" />
                        <span>₹{admin.monthlyRevenue.toLocaleString()}/mo</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {onAdminClick && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAdminClick(admin)}
                          className="text-xs border-slate-300 hover:bg-slate-50"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="text-xs">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                            disabled={updateSubscriptionMutation.isPending}
                          >
                            Upgrade to Monthly
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                            disabled={updateSubscriptionMutation.isPending}
                          >
                            Upgrade to Yearly
                          </DropdownMenuItem>
                          {admin.subscriptionStatus === "free" && (
                            <DropdownMenuItem
                              onClick={() => handleExtendTrial(admin.id)}
                              disabled={extendTrialMutation.isPending}
                            >
                              Extend Trial
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminManagement;
