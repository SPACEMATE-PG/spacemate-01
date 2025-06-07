
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Building2, 
  IndianRupee, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  Award,
  Target,
  Crown,
  Bell,
  BarChart3,
  Zap,
  Shield,
  DollarSign
} from "lucide-react";

interface PGAdmin {
  id: string;
  name: string;
  email: string;
  commonId: string;
  totalPGs: number;
  activePGs: number;
  subscriptionStatus: "free" | "active" | "expired" | "pending";
  subscriptionTier: "monthly" | "six_month" | "yearly" | null;
  subscriptionStart: string | null;
  subscriptionEnd: string | null;
  monthlyRevenue: number;
  freeTrialEnd: string | null;
  lastActive: string;
}

// Mock data for PG Admins
const mockPGAdmins: PGAdmin[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@pgowner.com",
    commonId: "PG001",
    totalPGs: 3,
    activePGs: 3,
    subscriptionStatus: "active",
    subscriptionTier: "yearly",
    subscriptionStart: "2024-01-01",
    subscriptionEnd: "2024-12-31",
    monthlyRevenue: 3000,
    freeTrialEnd: "2023-12-31",
    lastActive: "2024-06-06"
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@hostels.com",
    commonId: "PG002",
    totalPGs: 1,
    activePGs: 1,
    subscriptionStatus: "free",
    subscriptionTier: null,
    subscriptionStart: null,
    subscriptionEnd: null,
    monthlyRevenue: 0,
    freeTrialEnd: "2024-08-01",
    lastActive: "2024-06-05"
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@pgmanagement.com",
    commonId: "PG003",
    totalPGs: 5,
    activePGs: 4,
    subscriptionStatus: "expired",
    subscriptionTier: "monthly",
    subscriptionStart: "2024-03-01",
    subscriptionEnd: "2024-05-31",
    monthlyRevenue: 5000,
    freeTrialEnd: "2024-02-29",
    lastActive: "2024-06-01"
  }
];

const SuperAdmin = () => {
  const [pgAdmins, setPGAdmins] = useState<PGAdmin[]>(mockPGAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  // Calculate totals
  const totalPGs = pgAdmins.reduce((sum, admin) => sum + admin.totalPGs, 0);
  const activePGs = pgAdmins.reduce((sum, admin) => sum + admin.activePGs, 0);
  const monthlyRevenue = pgAdmins.reduce((sum, admin) => sum + admin.monthlyRevenue, 0);
  const activeSubscriptions = pgAdmins.filter(admin => admin.subscriptionStatus === "active").length;

  // Filter admins based on search and status
  const filteredAdmins = pgAdmins.filter(admin => {
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
    setPGAdmins(prev => 
      prev.map(admin => 
        admin.id === adminId 
          ? { 
              ...admin, 
              subscriptionTier: newTier as "monthly" | "six_month" | "yearly",
              subscriptionStatus: "active",
              subscriptionStart: new Date().toISOString().split('T')[0],
              subscriptionEnd: getSubscriptionEndDate(newTier),
              monthlyRevenue: calculateMonthlyRevenue(admin.totalPGs)
            }
          : admin
      )
    );
    
    toast({
      title: "Subscription Updated",
      description: `Subscription tier updated to ${newTier}`,
    });
  };

  const getSubscriptionEndDate = (tier: string): string => {
    const start = new Date();
    switch (tier) {
      case "monthly":
        start.setMonth(start.getMonth() + 1);
        break;
      case "six_month":
        start.setMonth(start.getMonth() + 6);
        break;
      case "yearly":
        start.setFullYear(start.getFullYear() + 1);
        break;
    }
    return start.toISOString().split('T')[0];
  };

  const calculateMonthlyRevenue = (pgCount: number): number => {
    return pgCount * 1000; // ₹1000 per PG per month
  };

  const handleExtendTrial = (adminId: string) => {
    setPGAdmins(prev => 
      prev.map(admin => 
        admin.id === adminId 
          ? { 
              ...admin, 
              freeTrialEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
          : admin
      )
    );
    
    toast({
      title: "Trial Extended",
      description: "Free trial period extended by 30 days",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Professional Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Super Admin Dashboard</h1>
                  <p className="text-slate-600 text-sm mt-1">Revenue & Subscription Management Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Online
              </Badge>
              <div className="text-sm text-slate-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-900">{totalPGs}</div>
                  <div className="text-blue-600 text-sm font-medium">Total Properties</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="font-medium">{activePGs} Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-900">₹{(monthlyRevenue / 1000).toFixed(0)}K</div>
                  <div className="text-emerald-600 text-sm font-medium">Monthly Revenue</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="font-medium">+12% vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-900">{activeSubscriptions}</div>
                  <div className="text-purple-600 text-sm font-medium">Active Subscriptions</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-purple-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="font-medium">67% conversion rate</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-900">89%</div>
                  <div className="text-amber-600 text-sm font-medium">Customer Satisfaction</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-amber-600">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="font-medium">Excellent rating</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Admin Management */}
          <div className="xl:col-span-2">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-white border-b border-slate-100 rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
                    <Users className="h-5 w-5 mr-3 text-indigo-600" />
                    PG Admin Management
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      {filteredAdmins.length} Admins
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Enhanced Search and Filter */}
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

                {/* Enhanced Admin Cards */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filteredAdmins.map((admin) => (
                    <Card key={admin.id} className="border border-slate-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                              {admin.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-lg">{admin.name}</h3>
                              <p className="text-slate-600 text-sm">{admin.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{admin.commonId}</Badge>
                                {getStatusBadge(admin.subscriptionStatus)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
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
                              <Button
                                size="sm"
                                onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                              >
                                Monthly
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                Yearly
                              </Button>
                              {admin.subscriptionStatus === "free" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleExtendTrial(admin.id)}
                                  className="text-xs border-slate-300 hover:bg-slate-50"
                                >
                                  Extend Trial
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Pricing Section */}
          <div>
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-white border-b border-slate-100 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
                  <Zap className="h-5 w-5 mr-3 text-indigo-600" />
                  Subscription Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-blue-900 text-lg">Monthly Plan</h3>
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-900 mb-2">₹1,000</div>
                      <div className="text-blue-700 text-sm mb-3">per PG per month</div>
                      <Badge className="bg-blue-200 text-blue-800 text-xs">Most Flexible</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 relative hover:shadow-md transition-all duration-200">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white text-xs px-3 py-1">POPULAR</Badge>
                    </div>
                    <CardContent className="p-5 pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-purple-900 text-lg">6-Month Plan</h3>
                        <Building2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-purple-900 mb-2">₹5,500</div>
                      <div className="text-purple-700 text-sm mb-3">per PG (save ₹500)</div>
                      <Badge className="bg-purple-200 text-purple-800 text-xs">8% Discount</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-emerald-900 text-lg">Yearly Plan</h3>
                        <Crown className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-bold text-emerald-900 mb-2">₹10,000</div>
                      <div className="text-emerald-700 text-sm mb-3">per PG (save ₹2,000)</div>
                      <Badge className="bg-emerald-200 text-emerald-800 text-xs">17% Discount</Badge>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900 text-sm">Free Trial</h4>
                        <p className="text-xs text-amber-800">2-3 months complimentary access for new PG admins</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Desktop Table */}
        <div className="hidden lg:block">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-white border-b border-slate-100 rounded-t-lg">
              <CardTitle className="text-xl font-semibold text-slate-900">Detailed Admin Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Admin Details</TableHead>
                      <TableHead className="font-semibold text-slate-700">Common ID</TableHead>
                      <TableHead className="font-semibold text-slate-700">Properties</TableHead>
                      <TableHead className="font-semibold text-slate-700">Subscription</TableHead>
                      <TableHead className="font-semibold text-slate-700">Revenue</TableHead>
                      <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.map((admin) => (
                      <TableRow key={admin.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {admin.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{admin.name}</div>
                              <div className="text-sm text-slate-500">{admin.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-slate-300 text-slate-700">{admin.commonId}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-semibold text-slate-900">
                              {admin.totalPGs} / <span className="text-emerald-600">{admin.activePGs}</span>
                            </div>
                            <div className="text-xs text-slate-500">Total / Active</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(admin.subscriptionStatus)}
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-emerald-600 text-lg">
                            ₹{admin.monthlyRevenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">per month</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                              className="text-xs bg-indigo-600 hover:bg-indigo-700"
                            >
                              Monthly
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                              className="text-xs bg-emerald-600 hover:bg-emerald-700"
                            >
                              Yearly
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
