
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  DollarSign, 
  Building2, 
  Users, 
  TrendingUp, 
  Settings, 
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Crown
} from "lucide-react";

interface PGAdmin {
  id: string;
  name: string;
  email: string;
  pgCount: number;
  subscriptionStatus: "active" | "expired" | "trial" | "pending";
  subscriptionPlan: "monthly" | "sixMonths" | "yearly" | null;
  monthlyRevenue: number;
  joinDate: string;
  trialEndDate?: string;
}

// Mock data for PG Admins - In real app, this would come from your database
const mockPGAdmins: PGAdmin[] = [
  {
    id: "admin-1",
    name: "Rajesh Kumar",
    email: "rajesh@pgowner.com",
    pgCount: 3,
    subscriptionStatus: "active",
    subscriptionPlan: "yearly",
    monthlyRevenue: 3000,
    joinDate: "2024-01-15",
  },
  {
    id: "admin-2", 
    name: "Priya Sharma",
    email: "priya@hostelowner.com",
    pgCount: 2,
    subscriptionStatus: "trial",
    subscriptionPlan: null,
    monthlyRevenue: 0,
    joinDate: "2024-11-01",
    trialEndDate: "2025-01-01",
  },
  {
    id: "admin-3",
    name: "Amit Patel", 
    email: "amit@pgbusiness.com",
    pgCount: 5,
    subscriptionStatus: "active",
    subscriptionPlan: "monthly",
    monthlyRevenue: 5000,
    joinDate: "2024-03-10",
  },
  {
    id: "admin-4",
    name: "Sneha Reddy",
    email: "sneha@accommodations.com", 
    pgCount: 1,
    subscriptionStatus: "expired",
    subscriptionPlan: null,
    monthlyRevenue: 0,
    joinDate: "2024-05-20",
  },
];

const SuperAdminDashboard = () => {
  const [admins] = useState<PGAdmin[]>(mockPGAdmins);
  const { toast } = useToast();

  // Calculate analytics
  const totalPGs = admins.reduce((sum, admin) => sum + admin.pgCount, 0);
  const activeSubscriptions = admins.filter(admin => admin.subscriptionStatus === "active").length;
  const totalMonthlyRevenue = admins.reduce((sum, admin) => sum + admin.monthlyRevenue, 0);
  const trialUsers = admins.filter(admin => admin.subscriptionStatus === "trial").length;

  const handleSetSubscription = (adminId: string, plan: "monthly" | "sixMonths" | "yearly") => {
    toast({
      title: "Subscription Updated",
      description: `Subscription plan set to ${plan} for admin`,
    });
  };

  const handleSendReminder = (adminId: string) => {
    toast({
      title: "Reminder Sent",
      description: "Payment reminder sent to admin",
    });
  };

  const getSubscriptionBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "trial":
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Super Admin Dashboard</h1>
            <p className="text-gray-600">Monetization & PG Operations Overview</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium">
          Revenue Control Center
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Monthly Revenue</span>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">₹{totalMonthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500">From {activeSubscriptions} active subscriptions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Total PGs</span>
              <Building2 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{totalPGs}</div>
            <p className="text-xs text-gray-500">Across all admins</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Active Admins</span>
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-gray-500">Paying customers</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Trial Users</span>
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{trialUsers}</div>
            <p className="text-xs text-gray-500">Potential conversions</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pricing Plans */}
        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-hostel-primary" />
              Subscription Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Monthly</span>
                  <span className="text-lg font-bold">₹1,000/PG</span>
                </div>
                <p className="text-xs text-gray-600">Per PG per month</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">6 Months</span>
                  <span className="text-lg font-bold">₹5,500/PG</span>
                </div>
                <p className="text-xs text-blue-600">Save ₹500 per PG (8% off)</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Yearly</span>
                  <span className="text-lg font-bold">₹10,000/PG</span>
                </div>
                <p className="text-xs text-green-600">Save ₹2,000 per PG (17% off)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Settings className="h-4 w-4 mr-2 text-hostel-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-hostel-accent text-hostel-primary hover:bg-hostel-accent/80"
                onClick={() => toast({ title: "Feature", description: "Bulk notifications feature coming soon" })}
              >
                <Users className="h-4 w-4 mr-2" />
                Send Bulk Notifications
              </Button>
              
              <Button 
                className="w-full justify-start bg-hostel-accent text-hostel-primary hover:bg-hostel-accent/80"
                onClick={() => toast({ title: "Feature", description: "Reports generation feature coming soon" })}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Revenue Report
              </Button>
              
              <Button 
                className="w-full justify-start bg-hostel-accent text-hostel-primary hover:bg-hostel-accent/80"
                onClick={() => toast({ title: "Feature", description: "Plan management feature coming soon" })}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Pricing Plans
              </Button>
              
              <Button 
                className="w-full justify-start bg-hostel-accent text-hostel-primary hover:bg-hostel-accent/80"
                onClick={() => toast({ title: "Feature", description: "Trial extension feature coming soon" })}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Extend Trial Periods
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Summary */}
        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-hostel-primary" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-medium">₹{totalMonthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Projected Annual</span>
                <span className="font-medium">₹{(totalMonthlyRevenue * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Revenue/PG</span>
                <span className="font-medium">₹{totalPGs > 0 ? Math.round(totalMonthlyRevenue / totalPGs) : 0}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-green-600 font-medium">
                    {admins.length > 0 ? Math.round((activeSubscriptions / admins.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PG Admins Management */}
      <Card>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold">PG Admins & Monetization</CardTitle>
          <p className="text-sm text-gray-600">Monitor PG counts and manage subscriptions for revenue optimization</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-800">{admin.name}</h3>
                      {getSubscriptionBadge(admin.subscriptionStatus)}
                      <Badge variant="outline" className="text-xs">
                        {admin.pgCount} PG{admin.pgCount !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{admin.email}</span>
                      <span>Joined: {new Date(admin.joinDate).toLocaleDateString()}</span>
                      <span className="font-medium text-green-600">₹{admin.monthlyRevenue}/month</span>
                      {admin.trialEndDate && (
                        <span className="text-orange-600">Trial ends: {new Date(admin.trialEndDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {admin.subscriptionStatus === "active" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {admin.subscriptionStatus === "expired" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetSubscription(admin.id, "monthly")}
                        className="text-xs px-2 py-1"
                      >
                        Monthly
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetSubscription(admin.id, "sixMonths")}
                        className="text-xs px-2 py-1"
                      >
                        6M
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetSubscription(admin.id, "yearly")}
                        className="text-xs px-2 py-1"
                      >
                        Yearly
                      </Button>
                    </div>
                    
                    {(admin.subscriptionStatus === "expired" || admin.subscriptionStatus === "trial") && (
                      <Button
                        size="sm"
                        onClick={() => handleSendReminder(admin.id)}
                        className="text-xs bg-orange-500 hover:bg-orange-600"
                      >
                        Remind
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
