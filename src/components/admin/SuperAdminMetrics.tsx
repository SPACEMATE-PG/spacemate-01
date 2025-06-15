
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  DollarSign, 
  Crown, 
  BarChart3,
  TrendingUp,
  CheckCircle,
  Award,
  ArrowUpRight,
  ArrowDownRight
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
          <Card key={i} className="animate-pulse border-0 shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
            <CardContent className="p-6">
              <div className="h-24 bg-gray-300 rounded-lg animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Properties",
      value: stats.totalPGs,
      subtitle: `${stats.activePGs} Active`,
      icon: Building2,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      change: "+12%",
      isPositive: true
    },
    {
      title: "Monthly Revenue",
      value: `₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`,
      subtitle: `+${stats.growthRate}% vs last month`,
      icon: DollarSign,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      change: `+${stats.growthRate}%`,
      isPositive: true
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions,
      subtitle: `${stats.conversionRate}% conversion rate`,
      icon: Crown,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      change: "+8%",
      isPositive: true
    },
    {
      title: "Customer Satisfaction",
      value: `${stats.customerSatisfaction}%`,
      subtitle: "Excellent rating",
      icon: Award,
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      change: "+2%",
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card 
          key={metric.title} 
          className={`bg-gradient-to-br ${metric.bgGradient} ${metric.borderColor} border-2 hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:scale-105 animate-fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${metric.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="h-6 w-6 text-white drop-shadow-sm" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                metric.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-3xl font-bold text-${metric.color}-900 group-hover:scale-105 transition-transform duration-300`}>
                {metric.value}
              </div>
              <div className={`text-${metric.color}-600 text-sm font-medium opacity-90`}>
                {metric.title}
              </div>
              <div className={`flex items-center gap-2 text-sm text-${metric.color}-600`}>
                <CheckCircle className="h-4 w-4" />
                <span>{metric.subtitle}</span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full transition-all duration-1000 ease-out`}
                style={{ 
                  width: metric.title === "Customer Satisfaction" ? `${stats.customerSatisfaction}%` : '75%',
                  animationDelay: `${index * 200}ms`
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuperAdminMetrics;
