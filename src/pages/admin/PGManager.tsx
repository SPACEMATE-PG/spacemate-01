import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Users, 
  Building2, 
  IndianRupee, 
  Eye,
  MoreVertical,
  Menu,
  X,
  Home,
  Bell,
  LogOut,
  Building,
  ClipboardList,
  ArrowUpRight,
  Plus,
  Shield,
  MessageSquare,
  Settings,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  ChevronRight,
  TrendingUp,
  BellRing,
  CalendarRange,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Utensils,
  Wrench
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration
const mockData = {
  pgDetails: {
    name: "SpaceMate PG",
    totalRooms: 24,
    availableRooms: 4,
    totalBeds: 48,
    availableBeds: 8,
    isAvailable: true,
    facilities: ["WiFi", "AC", "Food", "Laundry", "Water Purifier"],
    totalResidents: 20,
    monthlyRevenue: 150000,
    pendingRequests: 10,
    urgentRequests: 3
  },
  joiningRequests: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      roomType: "Double Sharing",
      moveInDate: "2024-03-01",
      status: "pending",
      avatar: "https://via.placeholder.com/50",
      preferredRoom: "Room 101",
      requestDate: "2024-02-28"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      roomType: "Single Sharing",
      moveInDate: "2024-03-05",
      status: "approved",
      avatar: "https://via.placeholder.com/50",
      preferredRoom: "Room 102",
      requestDate: "2024-02-25"
    }
  ],
  serviceRequests: [
    {
      id: "1",
      type: "Maintenance",
      description: "AC not working",
      status: "pending",
      roomNumber: "101",
      priority: "high",
      requestedBy: "Alex Johnson",
      requestTime: "2 hours ago"
    },
    {
      id: "2",
      type: "Cleaning",
      description: "Room cleaning required",
      status: "in-progress",
      roomNumber: "102",
      priority: "medium",
      requestedBy: "Sarah Williams",
      requestTime: "5 hours ago"
    },
    {
      id: "3",
      type: "Plumbing",
      description: "Water leakage in bathroom",
      status: "pending",
      roomNumber: "105",
      priority: "high",
      requestedBy: "Robert Brown",
      requestTime: "1 day ago"
    }
  ],
  recentPayments: [
    {
      id: "p1",
      resident: "Michael Peterson",
      amount: 12000,
      date: "2024-03-15",
      status: "completed",
      type: "Monthly Rent"
    },
    {
      id: "p2",
      resident: "Emily Wilson",
      amount: 8000,
      date: "2024-03-14",
      status: "completed",
      type: "Monthly Rent"
    },
    {
      id: "p3",
      resident: "David Miller",
      amount: 10000,
      date: "2024-03-12",
      status: "pending",
      type: "Monthly Rent"
    }
  ],
  foodFeedback: {
    today: {
      rating: 4.2,
      totalResponses: 35,
      breakdown: [
        { rating: 5, count: 15 },
        { rating: 4, count: 12 },
        { rating: 3, count: 5 },
        { rating: 2, count: 2 },
        { rating: 1, count: 1 }
      ],
      comments: [
        { text: "Breakfast was great!", user: "John D." },
        { text: "Lunch could be better, too spicy", user: "Sara W." },
        { text: "Dinner was excellent today", user: "Mike P." }
      ]
    }
  },
  upcomingEvents: [
    {
      id: "e1",
      title: "Monthly PG Meeting",
      date: "2024-03-25",
      time: "18:00"
    },
    {
      id: "e2",
      title: "Rooms Inspection",
      date: "2024-03-28",
      time: "10:00"
    },
    {
      id: "e3",
      title: "New Resident Orientation",
      date: "2024-04-01",
      time: "11:00"
    }
  ],
  recentActivities: [
    {
      id: "a1",
      type: "check-in",
      description: "New resident, John Doe, checked in.",
      time: "2 hours ago"
    },
    {
      id: "a2",
      type: "payment",
      description: "Payment received from Michael Peterson for March rent.",
      time: "1 day ago"
    },
    {
      id: "a3",
      type: "maintenance",
      description: "AC unit in Room 101 reported as non-functional.",
      time: "2 days ago"
    }
  ]
};

const PGManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPGAvailable, setIsPGAvailable] = useState(mockData.pgDetails.isAvailable);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);

  // Load dashboard data
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Calculate occupancy percentage
  const occupancyPercent = Math.round(
    ((mockData.pgDetails.totalBeds - mockData.pgDetails.availableBeds) / mockData.pgDetails.totalBeds) * 100
  );

  // Core navigation items based on PG Admin responsibilities
  const navigationItems = [
    {
      tab: "overview",
      label: "Dashboard",
      icon: Home,
      path: "/pg-admin"
    },
    {
      tab: "guests",
      label: "Guests",
      icon: Users,
      path: "/pg-admin/guests"
    },
    {
      tab: "rooms",
      label: "Rooms",
      icon: Building,
      path: "/pg-admin/rooms"
    },
    {
      tab: "requests",
      label: "Requests",
      icon: ClipboardList,
      path: "/pg-admin/requests"
    },
    {
      tab: "financial",
      label: "Financial",
      icon: IndianRupee,
      path: "/pg-admin/financial"
    },
    {
      tab: "notifications",
      label: "Notifications",
      icon: Bell,
      path: "/pg-admin/notifications"
    }
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/role-selection");
  };

  const handleNavigation = (path: string) => {
    const tab = path.split("/").pop() || "overview";
    setActiveTab(tab);
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handlePGAvailability = (checked: boolean) => {
    setIsPGAvailable(checked);
    toast({
      title: checked ? "PG is now available" : "PG is now marked as unavailable",
      description: checked ? "New bookings can be accepted" : "No new bookings will be accepted",
    });
  };

  const handleRequestAction = (id: string, action: string) => {
        toast({
      title: action === "approve" ? "Request Approved" : "Request Rejected",
      description: `Request #${id} has been ${action === "approve" ? "approved" : "rejected"}.`,
    });
  };

  // Navigation functions with correct routes
  const goToGuests = () => navigate("/pg-admin/residents");
  const goToJoiningRequests = () => navigate("/pg-admin/residents/requests");
  const goToRooms = () => navigate("/pg-admin/rooms");
  const goToServiceRequests = () => navigate("/pg-admin/requests");
  const goToPayments = () => navigate("/pg-admin/payments");
  const goToReports = () => navigate("/pg-admin/reports");
  const goToNotifications = () => navigate("/pg-admin/notifications");
  const goToFoodManagement = () => navigate("/pg-admin/food");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PG Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentUser?.name}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">PG Status:</span>
            <Switch
              checked={isPGAvailable}
              onCheckedChange={handlePGAvailability}
            />
            <span className={cn(
              "text-sm",
              isPGAvailable ? "text-green-600" : "text-gray-500"
            )}>
              {isPGAvailable ? "Available" : "Not Available"}
            </span>
          </div>
          <Button onClick={() => navigate("/pg-admin/residents/requests")} size="sm">
            <Plus className="h-4 w-4 mr-1" /> New Request
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Residents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockData.pgDetails.totalResidents}</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {mockData.pgDetails.availableBeds} beds available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{occupancyPercent}%</div>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${occupancyPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹{mockData.pgDetails.monthlyRevenue.toLocaleString()}</div>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-green-600 mt-2">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockData.pgDetails.pendingRequests}</div>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-amber-600 mt-2">
              {mockData.pgDetails.urgentRequests} urgent requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Service Requests</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/pg-admin/requests")}>
                View All
              </Button>
            </div>
            <CardDescription>Recent maintenance and service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockData.serviceRequests.map(request => (
                  <div key={request.id} className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "mt-1 h-2 w-2 rounded-full",
                        request.priority === "high" ? "bg-red-500" :
                        request.priority === "medium" ? "bg-amber-500" :
                        "bg-green-500"
                      )} />
                      <div>
                        <p className="font-medium">{request.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Room {request.roomNumber} • {request.requestTime}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(
                      request.status === "pending" ? "bg-amber-100 text-amber-800" :
                      request.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    )}>
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Joining Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Joining Requests</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/pg-admin/residents/requests")}>
                View All
              </Button>
            </div>
            <CardDescription>Recent accommodation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockData.joiningRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.preferredRoom} • {request.requestDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleRequestAction(request.id, "approve")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRequestAction(request.id, "reject")}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Feedback */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Food Feedback</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/pg-admin/food")}>
                Manage
              </Button>
            </div>
            <CardDescription>Today's meal ratings and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">{mockData.foodFeedback.today.rating}</div>
              <div className="text-sm text-muted-foreground">
                Average rating from {mockData.foodFeedback.today.totalResponses} responses
              </div>
            </div>
            <div className="space-y-2">
              {mockData.foodFeedback.today.breakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-sm font-medium w-3">{item.rating}</div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / mockData.foodFeedback.today.totalResponses) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground w-8">{item.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled activities and maintenance</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[250px]">
              <div className="space-y-4">
                {mockData.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex flex-col items-center justify-center bg-purple-100 text-purple-600 rounded-lg p-2 w-12">
                      <span className="text-sm font-semibold">{event.date.split(' ')[0]}</span>
                      <span className="text-xs">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[250px]">
              <div className="space-y-4">
                {mockData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={cn(
                      "p-2 rounded-full",
                      activity.type === "check-in" ? "bg-green-100 text-green-600" :
                      activity.type === "check-out" ? "bg-red-100 text-red-600" :
                      activity.type === "payment" ? "bg-blue-100 text-blue-600" :
                      "bg-gray-100 text-gray-600"
                    )}>
                      {activity.type === "check-in" && <Users className="h-4 w-4" />}
                      {activity.type === "check-out" && <LogOut className="h-4 w-4" />}
                      {activity.type === "payment" && <IndianRupee className="h-4 w-4" />}
                      {activity.type === "maintenance" && <Wrench className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PGManager;
