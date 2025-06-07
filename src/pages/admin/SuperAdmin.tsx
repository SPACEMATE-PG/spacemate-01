
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
  Crown
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
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "free":
        return <Badge className="bg-blue-100 text-blue-800">Free Trial</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-safe pb-safe">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-lg">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Crown className="h-7 w-7 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-blue-100 text-sm">Monetization & Revenue Management</p>
            </div>
          </div>
          
          {/* Revenue Banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-300" />
                <span className="font-semibold">Total Monthly Revenue</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹{monthlyRevenue.toLocaleString()}</div>
                <div className="text-green-300 text-sm">+12% from last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <Building2 className="h-8 w-8 text-blue-200" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{totalPGs}</div>
                  <div className="text-xs text-blue-200">Total PGs</div>
                </div>
              </div>
              <div className="text-sm text-blue-100">{activePGs} currently active</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <IndianRupee className="h-8 w-8 text-green-200" />
                <div className="text-right">
                  <div className="text-2xl font-bold">₹{(monthlyRevenue / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-green-200">Monthly Revenue</div>
                </div>
              </div>
              <div className="text-sm text-green-100">Revenue this month</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <CheckCircle className="h-8 w-8 text-purple-200" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{activeSubscriptions}</div>
                  <div className="text-xs text-purple-200">Active Plans</div>
                </div>
              </div>
              <div className="text-sm text-purple-100">of {pgAdmins.length} total admins</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <Target className="h-8 w-8 text-orange-200" />
                <div className="text-right">
                  <div className="text-2xl font-bold">67%</div>
                  <div className="text-xs text-orange-200">Conversion</div>
                </div>
              </div>
              <div className="text-sm text-orange-100">trial to paid</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced PG Admin Management */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              PG Admin Management
              <Badge variant="outline" className="ml-auto">
                {filteredAdmins.length} Admins
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Enhanced Search and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or Common ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 bg-white h-12"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Subscriptions</option>
                  <option value="free">Free Trial</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Enhanced Mobile Cards */}
            <div className="space-y-4 sm:hidden">
              {filteredAdmins.map((admin) => (
                <Card key={admin.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          {admin.commonId}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">{admin.totalPGs}</span>
                          <span className="text-gray-500"> / </span>
                          <span className="text-green-600 font-semibold">{admin.activePGs}</span>
                          <span className="text-gray-500 ml-1">PGs</span>
                        </div>
                        {getStatusBadge(admin.subscriptionStatus)}
                      </div>
                      
                      <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-700 text-lg">
                          ₹{admin.monthlyRevenue.toLocaleString()}
                        </div>
                        {admin.freeTrialEnd && (
                          <div className="text-xs text-gray-500">
                            Trial: {new Date(admin.freeTrialEnd).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Monthly Plan
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Yearly Plan
                        </Button>
                      </div>
                      
                      {admin.subscriptionStatus === "free" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExtendTrial(admin.id)}
                          className="w-full border-gray-300 hover:bg-gray-50"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Extend Trial
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Desktop Table */}
            <div className="hidden sm:block">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                      <TableHead className="font-semibold text-gray-700">Admin Details</TableHead>
                      <TableHead className="font-semibold text-gray-700">Common ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">PGs (Total/Active)</TableHead>
                      <TableHead className="font-semibold text-gray-700">Subscription</TableHead>
                      <TableHead className="font-semibold text-gray-700">Revenue/Month</TableHead>
                      <TableHead className="font-semibold text-gray-700">Trial Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.map((admin) => (
                      <TableRow key={admin.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {admin.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{admin.name}</div>
                              <div className="text-sm text-gray-500">{admin.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            {admin.commonId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">
                              {admin.totalPGs} / <span className="text-green-600">{admin.activePGs}</span>
                            </div>
                            <div className="text-xs text-gray-500">total / active</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getStatusBadge(admin.subscriptionStatus)}
                            {admin.subscriptionTier && (
                              <div className="text-xs text-gray-500 capitalize">
                                {admin.subscriptionTier.replace('_', ' ')} plan
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600 text-lg">
                            ₹{admin.monthlyRevenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            ₹1,000 × {admin.totalPGs} PGs
                          </div>
                        </TableCell>
                        <TableCell>
                          {admin.freeTrialEnd && (
                            <div>
                              <div className="text-sm font-medium">
                                {new Date(admin.freeTrialEnd).toLocaleDateString()}
                              </div>
                              <div className={`text-xs ${new Date(admin.freeTrialEnd) > new Date() ? "text-green-600" : "text-red-600"}`}>
                                {new Date(admin.freeTrialEnd) > new Date() ? "Active Trial" : "Expired"}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                              >
                                Monthly
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs"
                              >
                                Yearly
                              </Button>
                            </div>
                            {admin.subscriptionStatus === "free" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleExtendTrial(admin.id)}
                                className="text-xs w-full border-gray-300 hover:bg-gray-50"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Extend Trial
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Subscription Pricing */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              Subscription Pricing Model
              <Badge className="ml-auto bg-purple-100 text-purple-700">Per PG Pricing</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-900 text-lg mb-2">Monthly Plan</h3>
                  <div className="text-3xl font-bold text-blue-900 mb-2">₹1,000</div>
                  <div className="text-blue-700 text-sm mb-4">per PG per month</div>
                  <Badge className="bg-blue-200 text-blue-800">Most Flexible</Badge>
                  <div className="text-xs text-blue-600 mt-2">Perfect for testing</div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    POPULAR
                  </Badge>
                </div>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-purple-900 text-lg mb-2">6-Month Plan</h3>
                  <div className="text-3xl font-bold text-purple-900 mb-2">₹5,500</div>
                  <div className="text-purple-700 text-sm mb-4">per PG (save ₹500)</div>
                  <Badge className="bg-purple-200 text-purple-800">8% Discount</Badge>
                  <div className="text-xs text-purple-600 mt-2">Great for growth</div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-green-900 text-lg mb-2">Yearly Plan</h3>
                  <div className="text-3xl font-bold text-green-900 mb-2">₹10,000</div>
                  <div className="text-green-700 text-sm mb-4">per PG (save ₹2,000)</div>
                  <Badge className="bg-green-200 text-green-800">17% Discount</Badge>
                  <div className="text-xs text-green-600 mt-2">Best value option</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-900 mb-1">Free Trial Period</h4>
                    <p className="text-sm text-amber-800">
                      New PG admins receive <strong>2-3 months</strong> of complimentary premium access 
                      to explore all features before subscription enforcement begins.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdmin;
