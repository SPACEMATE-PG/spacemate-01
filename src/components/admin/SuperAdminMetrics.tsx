
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  DollarSign, 
  Crown, 
  BarChart3,
  TrendingUp,
  CheckCircle,
  Award
} from "lucide-react";
import { AdminStats } from "@/hooks/usePGAdmins";

interface SuperAdminMetricsProps {
  stats: AdminStats;
  isLoading?: boolean;
}

const SuperAdminMetrics = ({ stats, isLoading }: SuperAdminMetricsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">{stats.totalPGs}</div>
              <div className="text-blue-600 text-sm font-medium">Total Properties</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{stats.activePGs} Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-900">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</div>
              <div className="text-emerald-600 text-sm font-medium">Monthly Revenue</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-emerald-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">+{stats.growthRate}% vs last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-900">{stats.activeSubscriptions}</div>
              <div className="text-purple-600 text-sm font-medium">Active Subscriptions</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-purple-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="font-medium">{stats.conversionRate}% conversion rate</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-900">{stats.customerSatisfaction}%</div>
              <div className="text-amber-600 text-sm font-medium">Customer Satisfaction</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-amber-600">
              <Award className="h-4 w-4 mr-1" />
              <span className="font-medium">Excellent rating</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminMetrics;
