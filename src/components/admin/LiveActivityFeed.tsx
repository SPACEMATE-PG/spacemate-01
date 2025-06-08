
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
  Clock,
  AlertCircle,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

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
  const [filter, setFilter] = useState<string>("all");
  const [isLive, setIsLive] = useState(true);
  const isMobile = useIsMobile();
  const { toast } = useToast();

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
    let interval: NodeJS.Timeout;
    
    if (isLive) {
      interval = setInterval(() => {
        const types = ["login", "payment", "registration", "subscription", "property"];
        const severities = ["low", "medium", "high"];
        const users = ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Patel", "Ravi Kumar"];
        
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: types[Math.floor(Math.random() * types.length)] as any,
          title: "Live Activity Update",
          description: `Real-time activity from ${users[Math.floor(Math.random() * users.length)]}`,
          timestamp: new Date().toISOString(),
          user: users[Math.floor(Math.random() * users.length)],
          severity: severities[Math.floor(Math.random() * severities.length)] as any,
          amount: Math.random() > 0.5 ? Math.floor(Math.random() * 10000) + 500 : undefined,
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep max 20 items
        
        // Show toast for high priority activities
        if (newActivity.severity === "high") {
          toast({
            title: "High Priority Activity",
            description: newActivity.description,
          });
        }
      }, 15000); // Update every 15 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive, toast]);

  const refreshActivities = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActivities([...mockActivities]);
      setIsLoading(false);
      toast({
        title: "Activities Refreshed",
        description: "Latest activity data loaded",
      });
    }, 1000);
  };

  const toggleLiveUpdates = () => {
    setIsLive(!isLive);
    toast({
      title: isLive ? "Live Updates Paused" : "Live Updates Resumed",
      description: isLive ? "Activity feed will no longer update automatically" : "Activity feed will update in real-time",
    });
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

  const filteredActivities = activities.filter(activity => {
    if (filter === "all") return true;
    return activity.type === filter;
  });

  return (
    <Card className="border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-100 rounded-t-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-slate-900 flex items-center`}>
              <Zap className="h-5 w-5 mr-3 text-yellow-600" />
              Live Activity Feed
              <Badge className={`ml-3 ${isLive ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
                {isLive ? 'Live' : 'Paused'}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-slate-50 text-xs">
                {filteredActivities.length} Items
              </Badge>
            </div>
          </div>
          
          {/* Mobile-optimized controls */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-white"
              >
                <option value="all">All Activities</option>
                <option value="payment">Payments</option>
                <option value="registration">Registrations</option>
                <option value="login">Logins</option>
                <option value="subscription">Subscriptions</option>
                <option value="property">Properties</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLiveUpdates}
                className={`flex items-center gap-1 ${isLive ? 'text-green-700 border-green-300' : 'text-gray-700 border-gray-300'}`}
              >
                <Activity className={`h-4 w-4 ${isLive ? 'animate-pulse' : ''}`} />
                {!isMobile && (isLive ? 'Pause' : 'Resume')}
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshActivities}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Activities
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`${isMobile ? 'max-h-80' : 'max-h-96'} overflow-y-auto`}>
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No activities found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`p-4 hover:bg-slate-50 transition-colors ${
                    index === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  {isMobile ? (
                    // Mobile Layout
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-semibold text-slate-900 truncate">
                              {activity.title}
                            </h4>
                            <div className="flex items-center gap-1 ml-2">
                              <Badge className={`text-xs ${getSeverityColor(activity.severity)}`}>
                                {activity.severity}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-2 line-clamp-2">{activity.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(activity.timestamp)}
                            </div>
                            {activity.amount && (
                              <span className="flex items-center gap-1 text-green-600 font-medium">
                                <TrendingUp className="h-3 w-3" />
                                ₹{activity.amount.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {activity.user && (
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                              <Users className="h-3 w-3" />
                              {activity.user}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Desktop Layout
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
                  )}
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
