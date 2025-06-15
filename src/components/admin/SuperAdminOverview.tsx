
import { AdminStats } from "@/hooks/usePGAdmins";
import SuperAdminMetrics from "./SuperAdminMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, CreditCard, Activity, AlertTriangle, CheckCircle, TrendingUp, Building2, DollarSign } from "lucide-react";

interface SuperAdminOverviewProps {
  stats: AdminStats;
  isLoading?: boolean;
  onTabChange: (tab: string) => void;
}

const SuperAdminOverview = ({ stats, isLoading, onTabChange }: SuperAdminOverviewProps) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
        <p className="text-slate-600">Complete system overview and quick access to key functions</p>
      </div>

      <SuperAdminMetrics stats={stats} isLoading={isLoading} />
      
      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalPGs}</p>
                  <p className="text-blue-600 text-sm font-medium">Total Properties</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-600 text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-600 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-green-600 text-sm font-medium">Monthly Revenue</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-600 text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{stats.growthRate}% growth
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900">{stats.activeSubscriptions}</p>
                  <p className="text-purple-600 text-sm font-medium">Active Subscriptions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-600 text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {stats.conversionRate}% conversion
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-sm font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-blue-700 hover:text-blue-900 hover:bg-blue-200 p-3 h-auto"
              onClick={() => onTabChange("subscriptions")}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Recent Subscriptions
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-blue-700 hover:text-blue-900 hover:bg-blue-200 p-3 h-auto"
              onClick={() => onTabChange("revenue")}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Generate Revenue Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-blue-700 hover:text-blue-900 hover:bg-blue-200 p-3 h-auto"
              onClick={() => onTabChange("admins")}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Admin Accounts
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-sm font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-700 text-sm">API Status</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium text-sm">Online</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700 text-sm">Database</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium text-sm">Healthy</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700 text-sm">Uptime</span>
              <span className="text-green-600 font-medium text-sm">99.9%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-sm font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>5 new subscriptions today</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>3 admin logins in last hour</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>12 support tickets resolved</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-purple-700 hover:text-purple-900 hover:bg-purple-200 p-2 h-auto mt-2"
              onClick={() => onTabChange("activity")}
            >
              <Activity className="h-3 w-3 mr-2" />
              View Live Activity
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No critical alerts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>2 pending reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>System backup complete</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-orange-700 hover:text-orange-900 hover:bg-orange-200 p-2 h-auto mt-2"
              onClick={() => onTabChange("bulk-ops")}
            >
              <AlertTriangle className="h-3 w-3 mr-2" />
              Bulk Operations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
