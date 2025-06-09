
import { AdminStats } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RevenueChart from "./RevenueChart";
import GrowthChart from "./GrowthChart";

interface SuperAdminRevenueProps {
  stats: AdminStats;
  isLoading?: boolean;
}

const SuperAdminRevenue = ({ stats, isLoading }: SuperAdminRevenueProps) => {
  const revenueData = [
    { month: "Jan", revenue: 45000, subscriptions: 12 },
    { month: "Feb", revenue: 52000, subscriptions: 15 },
    { month: "Mar", revenue: 48000, subscriptions: 14 },
    { month: "Apr", revenue: 61000, subscriptions: 18 },
    { month: "May", revenue: 55000, subscriptions: 16 },
    { month: "Jun", revenue: stats.monthlyRevenue, subscriptions: stats.activeSubscriptions },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-green-600 text-sm mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-blue-600 text-sm mt-1">Current month</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-sm font-medium">Average Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">${(stats.totalRevenue / 6).toFixed(0)}</div>
            <p className="text-purple-600 text-sm mt-1">Per month</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-sm font-medium">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{stats.growthRate}%</div>
            <p className="text-orange-600 text-sm mt-1">Year over year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} growthRate={stats.growthRate} />
        <GrowthChart data={revenueData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium">Monthly Subscriptions</span>
              <span className="text-green-600 font-semibold">${(stats.monthlyRevenue * 0.7).toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium">Annual Subscriptions</span>
              <span className="text-blue-600 font-semibold">${(stats.monthlyRevenue * 0.25).toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium">Add-on Services</span>
              <span className="text-purple-600 font-semibold">${(stats.monthlyRevenue * 0.05).toFixed(0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminRevenue;
