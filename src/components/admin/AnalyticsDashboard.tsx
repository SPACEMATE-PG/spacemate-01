
import { AdminStats } from "@/hooks/usePGAdmins";
import AnalyticsHeader from "./AnalyticsHeader";
import RevenueChart from "./RevenueChart";
import SubscriptionChart from "./SubscriptionChart";
import ActivityChart from "./ActivityChart";
import GrowthChart from "./GrowthChart";

interface AnalyticsDashboardProps {
  stats: AdminStats;
  isLoading?: boolean;
}

const AnalyticsDashboard = ({ stats, isLoading }: AnalyticsDashboardProps) => {
  // Mock data for charts - in production this would come from the API
  const revenueData = [
    { month: "Jan", revenue: 45000, subscriptions: 12 },
    { month: "Feb", revenue: 52000, subscriptions: 15 },
    { month: "Mar", revenue: 48000, subscriptions: 14 },
    { month: "Apr", revenue: 61000, subscriptions: 18 },
    { month: "May", revenue: 55000, subscriptions: 16 },
    { month: "Jun", revenue: stats.monthlyRevenue, subscriptions: stats.activeSubscriptions },
  ];

  const subscriptionTierData = [
    { name: "Monthly", value: 45, color: "#3B82F6" },
    { name: "6-Month", value: 30, color: "#8B5CF6" },
    { name: "Yearly", value: 25, color: "#10B981" },
  ];

  const activityData = [
    { day: "Mon", logins: 23, registrations: 5 },
    { day: "Tue", logins: 31, registrations: 8 },
    { day: "Wed", logins: 28, registrations: 6 },
    { day: "Thu", logins: 35, registrations: 12 },
    { day: "Fri", logins: 29, registrations: 7 },
    { day: "Sat", logins: 18, registrations: 3 },
    { day: "Sun", logins: 15, registrations: 2 },
  ];

  const handleExportData = (type: string) => {
    console.log(`Exporting ${type} data...`);
    // Implementation for data export would go here
  };

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
    <div className="space-y-6">
      <AnalyticsHeader onExportData={handleExportData} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} growthRate={stats.growthRate} />
        <SubscriptionChart data={subscriptionTierData} />
        <ActivityChart data={activityData} />
        <GrowthChart data={revenueData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
