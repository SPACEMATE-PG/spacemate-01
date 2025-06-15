import { AdminStats } from "@/hooks/usePGAdmins";
import SuperAdminMetrics from "./SuperAdminMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Globe
} from "lucide-react";

interface SuperAdminOverviewProps {
  stats: AdminStats;
  isLoading?: boolean;
  onTabChange: (tab: string) => void;
}

const SuperAdminOverview = ({ stats, isLoading, onTabChange }: SuperAdminOverviewProps) => {
  return (
    <div className="space-y-10 p-4 lg:p-8 rounded-lg animate-fade-in-up">
      {/* Welcome & Overview Section (Re-imagined) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-pattern opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between z-10 relative">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-1">
                Welcome Back, Super Admin!
              </h2>
              <p className="text-indigo-100 text-lg opacity-90">
                Here's a quick look at your platform's performance.
              </p>
            </div>
            <Button 
              variant="secondary" 
              className="bg-white text-indigo-700 hover:bg-indigo-100 transition-colors"
              onClick={() => onTabChange("analytics")}
            >
              View Full Analytics <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Quick Stats */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{isLoading ? '...' : stats.totalPGs}</p>
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
                  <p className="text-3xl font-bold text-white">{isLoading ? '...' : `₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`}</p>
                  <p className="text-emerald-100 text-sm font-medium">Monthly Revenue</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200 bg-green-500/20 rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+{isLoading ? '...' : stats.growthRate}%</span>
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
                  <p className="text-3xl font-bold text-white">{isLoading ? '...' : stats.activeSubscriptions}</p>
                  <p className="text-purple-100 text-sm font-medium">Active Subscriptions</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200 bg-green-500/20 rounded-full px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{isLoading ? '...' : stats.conversionRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions & System Health */}
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
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-bold text-sm">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-lg font-bold flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              Alerts & Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-orange-50/50 rounded-lg">
              <span className="text-orange-700 font-medium">New Issues</span>
              <span className="text-orange-600 font-bold text-sm">2</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50/50 rounded-lg">
              <span className="text-orange-700 font-medium">Pending Actions</span>
              <span className="text-orange-600 font-bold text-sm">5</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-between text-orange-700 hover:text-orange-900 hover:bg-orange-100 p-4 h-auto group/btn"
              onClick={() => onTabChange("activity")}
            >
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5" />
                <span className="font-medium">View Activity Log</span>
              </div>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-rose-800 text-lg font-bold flex items-center gap-2">
              <div className="p-2 bg-rose-500 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              Subscription Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-rose-50/50 rounded-lg">
              <span className="text-rose-700 font-medium">Expired This Month</span>
              <span className="text-rose-600 font-bold text-sm">{stats.expiredSubscriptions}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-rose-50/50 rounded-lg">
              <span className="text-rose-700 font-medium">Cancellations</span>
              <span className="text-rose-600 font-bold text-sm">{stats.cancellations}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-between text-rose-700 hover:text-rose-900 hover:bg-rose-100 p-4 h-auto group/btn"
              onClick={() => onTabChange("subscriptions")}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Manage Subscriptions</span>
              </div>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
