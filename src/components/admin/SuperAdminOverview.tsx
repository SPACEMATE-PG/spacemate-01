
import { AdminStats } from "@/hooks/usePGAdmins";
import SuperAdminMetrics from "./SuperAdminMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SuperAdminOverviewProps {
  stats: AdminStats;
  isLoading?: boolean;
}

const SuperAdminOverview = ({ stats, isLoading }: SuperAdminOverviewProps) => {
  return (
    <div className="space-y-8">
      <SuperAdminMetrics stats={stats} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-blue-700 hover:text-blue-900 py-1">
                View Recent Subscriptions
              </button>
              <button className="w-full text-left text-sm text-blue-700 hover:text-blue-900 py-1">
                Generate Revenue Report
              </button>
              <button className="w-full text-left text-sm text-blue-700 hover:text-blue-900 py-1">
                Manage Admin Accounts
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-700">API Status</span>
                <span className="text-green-600 font-medium">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Database</span>
                <span className="text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Uptime</span>
                <span className="text-green-600 font-medium">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-purple-700">
              <p>5 new subscriptions today</p>
              <p>3 admin logins in last hour</p>
              <p>12 support tickets resolved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-sm font-medium">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-orange-700">
              <p>No critical alerts</p>
              <p>2 pending reviews</p>
              <p>System backup complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
