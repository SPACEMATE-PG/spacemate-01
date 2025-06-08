
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import { AdminStats } from "@/hooks/usePGAdmins";

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
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card className="border-slate-200">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
                <BarChart3 className="h-5 w-5 mr-3 text-indigo-600" />
                Analytics Dashboard
              </CardTitle>
              <p className="text-slate-600 text-sm mt-1">Comprehensive business insights and trends</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last 6 Months
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button 
                size="sm" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
                onClick={() => handleExportData('analytics')}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Revenue Trend
              </div>
              <Badge className="bg-green-100 text-green-700">+{stats.growthRate}% Growth</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8fafc', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-purple-600" />
              Subscription Plans Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionTierData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {subscriptionTierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Activity Chart */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Weekly User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8fafc', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="logins" fill="#3b82f6" name="Logins" />
                <Bar dataKey="registrations" fill="#8b5cf6" name="New Registrations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Growth */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Subscription Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8fafc', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
