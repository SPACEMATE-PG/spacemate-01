
import { AdminStats } from "@/hooks/usePGAdmins";
import SuperAdminMetrics from "./SuperAdminMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, CreditCard, Activity, AlertTriangle, CheckCircle } from "lucide-react";

interface SuperAdminOverviewProps {
  stats: AdminStats;
  isLoading?: boolean;
  onTabChange: (tab: string) => void;
}

const SuperAdminOverview = ({ stats, isLoading, onTabChange }: SuperAdminOverviewProps) => {
  return (
    <div className="space-y-6">
      <SuperAdminMetrics stats={stats} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
              className="w-full justify-start text-blue-700 hover:text-blue-900 hover:bg-blue-200 p-2 h-auto"
              onClick={() => onTabChange("subscriptions")}
            >
              <FileText className="h-3 w-3 mr-2" />
              View Recent Subscriptions
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-blue-700 hover:text-blue-900 hover:bg-blue-200 p-2 h-auto"
              onClick={() => onTabChange("revenue")}
            >
              <FileText className="h-3 w-3 mr-2" />
              Generate Revenue Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-blue-700 hover:text-blue-900 hover:bg-blue-200 p-2 h-auto"
              onClick={() => onTabChange("admins")}
            >
              <Users className="h-3 w-3 mr-2" />
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
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-green-600 font-medium text-sm">Online</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700 text-sm">Database</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
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
          <CardContent className="space-y-2">
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
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>No critical alerts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>2 pending reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>System backup complete</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
