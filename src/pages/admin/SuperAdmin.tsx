
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
  Filter
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Monetization & Subscription Management</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">Revenue Overview</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Total PGs</span>
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{totalPGs}</div>
            <div className="text-xs text-gray-500">{activePGs} active</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Monthly Revenue</span>
              <IndianRupee className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">₹{monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-green-600">+12% from last month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Active Subscriptions</span>
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <div className="text-xs text-blue-600">of {pgAdmins.length} total admins</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Conversion Rate</span>
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">67%</div>
            <div className="text-xs text-amber-600">trial to paid</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            PG Admin Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or Common ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="free">Free Trial</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin Details</TableHead>
                  <TableHead>Common ID</TableHead>
                  <TableHead>PGs (Total/Active)</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Revenue/Month</TableHead>
                  <TableHead>Trial End</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-sm text-gray-500">{admin.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{admin.commonId}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <span className="font-semibold">{admin.totalPGs}</span> / 
                        <span className="text-green-600 ml-1">{admin.activePGs}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(admin.subscriptionStatus)}
                        {admin.subscriptionTier && (
                          <div className="text-xs text-gray-500 capitalize">
                            {admin.subscriptionTier.replace('_', ' ')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-green-600">
                        ₹{admin.monthlyRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        ₹1000 × {admin.totalPGs} PGs
                      </div>
                    </TableCell>
                    <TableCell>
                      {admin.freeTrialEnd && (
                        <div className="text-sm">
                          <div>{admin.freeTrialEnd}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(admin.freeTrialEnd) > new Date() ? "Active" : "Expired"}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateSubscription(admin.id, "monthly")}
                            className="text-xs"
                          >
                            Monthly
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateSubscription(admin.id, "yearly")}
                            className="text-xs"
                          >
                            Yearly
                          </Button>
                        </div>
                        {admin.subscriptionStatus === "free" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleExtendTrial(admin.id)}
                            className="text-xs w-full"
                          >
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
        </CardContent>
      </Card>

      {/* Subscription Pricing Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Subscription Pricing Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-blue-800 mb-2">Monthly Plan</h3>
              <div className="text-2xl font-bold text-blue-900 mb-1">₹1,000</div>
              <div className="text-sm text-blue-600">per PG per month</div>
              <div className="text-xs text-blue-500 mt-2">Most flexible option</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-purple-800 mb-2">6-Month Plan</h3>
              <div className="text-2xl font-bold text-purple-900 mb-1">₹5,500</div>
              <div className="text-sm text-purple-600">per PG (save ₹500)</div>
              <div className="text-xs text-purple-500 mt-2">8% discount</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-green-800 mb-2">Yearly Plan</h3>
              <div className="text-2xl font-bold text-green-900 mb-1">₹10,000</div>
              <div className="text-sm text-green-600">per PG (save ₹2,000)</div>
              <div className="text-xs text-green-500 mt-2">17% discount</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-800">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Free Trial Period</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              New PG admins get 2-3 months of free premium access before subscription enforcement begins.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdmin;
