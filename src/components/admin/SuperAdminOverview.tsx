
import { AdminStats } from "@/hooks/usePGAdmins";
import SuperAdminMetrics from "./SuperAdminMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  CreditCard, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Building2, 
  DollarSign,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Clock
} from "lucide-react";

interface SuperAdminOverviewProps {
  stats: AdminStats;
  isLoading?: boolean;
  onTabChange: (tab: string) => void;
}

const SuperAdminOverview = ({ stats, isLoading, onTabChange }: SuperAdminOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back, Super Admin
            </h2>
            <p className="text-slate-600 text-lg">
              Here's what's happening with your platform today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              Last updated: Just now
            </Badge>
          </div>
        </div>
      </div>

      <SuperAdminMetrics stats={stats} isLoading={isLoading} />
      
      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{stats.totalPGs}</p>
                  <p className="text-blue-100 text-sm font-medium">Total Properties</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200 bg-green-500/20 rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-emerald-100 text-sm font-medium">Monthly Revenue</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200 bg-green-500/20 rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+{stats.growthRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{stats.activeSubscriptions}</p>
                  <p className="text-purple-100 text-sm font-medium">Active Subscriptions</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200 bg-green-500/20 rounded-full px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{stats.conversionRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-lg font-bold flex items-center gap-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-between text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-4 h-auto group/btn"
              onClick={() => onTabChange("subscriptions")}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Recent Subscriptions</span>
              </div>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-between text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-4 h-auto group/btn"
              onClick={() => onTabChange("revenue")}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Revenue Report</span>
              </div>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-between text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-4 h-auto group/btn"
              onClick={() => onTabChange("admins")}
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                <span className="font-medium">Manage Admins</span>
              </div>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-lg font-bold flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-green-700 font-medium">API Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-bold text-sm">Online</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-green-700 font-medium">Database</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-bold text-sm">Healthy</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-green-700 font-medium">Uptime</span>
              <span className="text-green-600 font-bold">99.9%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-lg font-bold flex items-center gap-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              Live Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700 text-sm font-medium">5 new subscriptions today</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700 text-sm font-medium">3 admin logins in last hour</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700 text-sm font-medium">12 support tickets resolved</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-center text-purple-700 hover:text-purple-900 hover:bg-purple-100 p-3 h-auto mt-3 group/btn"
              onClick={() => onTabChange("activity")}
            >
              <Activity className="h-4 w-4 mr-2" />
              <span className="font-medium">View Live Activity</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-lg font-bold flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              Alerts & Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-orange-700 text-sm font-medium">No critical alerts</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-orange-700 text-sm font-medium">2 pending reviews</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-orange-700 text-sm font-medium">System backup complete</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-center text-orange-700 hover:text-orange-900 hover:bg-orange-100 p-3 h-auto mt-3 group/btn"
              onClick={() => onTabChange("bulk-ops")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="font-medium">Bulk Operations</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
