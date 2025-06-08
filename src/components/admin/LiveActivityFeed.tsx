
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Users,
  DollarSign,
  Building2,
  Bell,
  RefreshCw,
  Zap,
  TrendingUp,
  UserPlus,
  CreditCard,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "login" | "payment" | "registration" | "subscription" | "property";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  amount?: number;
  severity: "low" | "medium" | "high";
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock real-time activity data
  const mockActivities: ActivityItem[] = [
    {
      id: "1",
      type: "payment",
      title: "Payment Received",
      description: "Rajesh Kumar paid ₹1,000 for monthly subscription",
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      user: "Rajesh Kumar",
      amount: 1000,
      severity: "high",
    },
    {
      id: "2",
      type: "registration",
      title: "New Admin Registration",
      description: "New PG admin registered with 2 properties",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: "Sneha Patel",
      severity: "medium",
    },
    {
      id: "3",
      type: "login",
      title: "Admin Login",
      description: "Priya Sharma logged into the system",
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      user: "Priya Sharma",
      severity: "low",
    },
    {
      id: "4",
      type: "subscription",
      title: "Subscription Upgraded",
      description: "Amit Patel upgraded from Monthly to Yearly plan",
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      user: "Amit Patel",
      amount: 10000,
      severity: "high",
    },
    {
      id: "5",
      type: "property",
      title: "New Property Added",
      description: "Sunset Villa PG added with 30 rooms",
      timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      user: "Ravi Kumar",
      severity: "medium",
    },
  ];

  useEffect(() => {
    // Simulate initial load
    setActivities(mockActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ["login", "payment", "registration", "subscription", "property"][Math.floor(Math.random() * 5)] as any,
        title: "Live Activity Update",
        description: "Real-time activity simulation",
        timestamp: new Date().toISOString(),
        severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshActivities = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActivities([...mockActivities]);
      setIsLoading(false);
    }, 1000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "registration":
        return <UserPlus className="h-4 w-4 text-blue-600" />;
      case "login":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "subscription":
        return <CreditCard className="h-4 w-4 text-indigo-600" />;
      case "property":
        return <Building2 className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
            <Zap className="h-5 w-5 mr-3 text-yellow-600" />
            Live Activity Feed
            <Badge className="ml-3 bg-green-100 text-green-700 animate-pulse">Live</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-slate-50">
              {activities.length} Recent
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshActivities}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {activities.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent activity</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`p-4 hover:bg-slate-50 transition-colors ${
                    index === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {activity.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getSeverityColor(activity.severity)}`}>
                            {activity.severity}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {formatTimestamp(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {activity.user && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {activity.user}
                          </span>
                        )}
                        {activity.amount && (
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            <TrendingUp className="h-3 w-3" />
                            ₹{activity.amount.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;
