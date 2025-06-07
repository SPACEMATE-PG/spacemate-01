
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
  Bell
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
    <div className="space-y-6 p-4 sm:p-6 animate-fade-in">
      {/* Header Section - matching admin dashboard style */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Super Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Monetization & Revenue Management</p>
        </div>
        <div className="bg-hostel-accent text-hostel-primary px-3 py-1 rounded-full text-sm font-medium">
          Today's Overview
        </div>
      </div>

      {/* Key Metrics Cards - matching admin dashboard style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-hostel-primary">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Total PGs</span>
              <Building2 className="h-5 w-5 text-hostel-primary" />
            </div>
            <div className="text-2xl font-bold">{totalPGs}</div>
            <div className="text-xs text-gray-500 mt-1">{activePGs} active</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Revenue</span>
              <IndianRupee className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">₹{(monthlyRevenue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-500 mt-1">monthly</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Active Plans</span>
              <CheckCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <div className="text-xs text-gray-500 mt-1">subscriptions</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Conversion</span>
              <Target className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">67%</div>
            <div className="text-xs text-gray-500 mt-1">trial to paid</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PG Admin Management Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="h-4 w-4 mr-2 text-hostel-primary" />
                PG Admin Management
              </CardTitle>
              <div className="text-xs text-hostel-primary cursor-pointer">
                {filteredAdmins.length} Admins
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-hostel-primary focus:ring-hostel-primary bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="free">Free Trial</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Admin List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredAdmins.map((admin) => (
                <div key={admin.id} className="p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-hostel-primary flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-semibold">{admin.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{admin.name}</h3>
                        <p className="text-xs text-gray-500">{admin.commonId}</p>
                      </div>
                    </div>
                    {getStatusBadge(admin.subscriptionStatus)}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>{admin.totalPGs} PGs • ₹{admin.monthlyRevenue.toLocaleString()}/mo</span>
                    <span>{new Date(admin.lastActive).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                      className="text-xs bg-hostel-primary hover:bg-hostel-secondary"
                    >
                      Monthly
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                      className="text-xs bg-green-600 hover:bg-green-700"
                    >
                      Yearly
                    </Button>
                    {admin.subscriptionStatus === "free" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExtendTrial(admin.id)}
                        className="text-xs"
                      >
                        Extend Trial
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Pricing Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-hostel-primary" />
              Subscription Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-900">Monthly Plan</h3>
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-1">₹1,000</div>
                  <div className="text-blue-700 text-sm">per PG per month</div>
                  <Badge className="bg-blue-200 text-blue-800 mt-2">Most Flexible</Badge>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 bg-purple-50 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">POPULAR</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-900">6-Month Plan</h3>
                    <Building2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-900 mb-1">₹5,500</div>
                  <div className="text-purple-700 text-sm">per PG (save ₹500)</div>
                  <Badge className="bg-purple-200 text-purple-800 mt-2">8% Discount</Badge>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-900">Yearly Plan</h3>
                    <Crown className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-1">₹10,000</div>
                  <div className="text-green-700 text-sm">per PG (save ₹2,000)</div>
                  <Badge className="bg-green-200 text-green-800 mt-2">17% Discount</Badge>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-4 bg-amber-50 border-amber-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-900 text-sm">Free Trial</h4>
                    <p className="text-xs text-amber-800">2-3 months complimentary access for new PG admins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table View for larger screens */}
      <div className="hidden lg:block">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold">Detailed Admin Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin Details</TableHead>
                    <TableHead>Common ID</TableHead>
                    <TableHead>PGs (Total/Active)</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Revenue/Month</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-hostel-primary rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {admin.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{admin.name}</div>
                            <div className="text-xs text-gray-500">{admin.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{admin.commonId}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900 text-sm">
                            {admin.totalPGs} / <span className="text-green-600">{admin.activePGs}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(admin.subscriptionStatus)}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-green-600">
                          ₹{admin.monthlyRevenue.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                            className="text-xs bg-hostel-primary hover:bg-hostel-secondary"
                          >
                            Monthly
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                            className="text-xs bg-green-600 hover:bg-green-700"
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
  );
};

export default SuperAdmin;
