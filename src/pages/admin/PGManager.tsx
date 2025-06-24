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
  Utensils
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

// Mock data for demonstration
const mockData = {
  pgDetails: {
    name: "SpaceMate PG",
    totalRooms: 24,
    availableRooms: 4,
    totalBeds: 48,
    availableBeds: 8,
    isAvailable: true,
    facilities: ["WiFi", "AC", "Food", "Laundry", "Water Purifier"]
  },
  joiningRequests: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      roomType: "Double Sharing",
      moveInDate: "2024-03-01",
      status: "pending"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      roomType: "Single Sharing",
      moveInDate: "2024-03-05",
      status: "approved"
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
  ]
};

const PGManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPGAvailable, setIsPGAvailable] = useState(mockData.pgDetails.isAvailable);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const isMobileView = useIsMobile();
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
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">PG Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentUser?.name}
          </p>
            </div>
        <div className="flex items-center gap-4">
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
          <Button onClick={goToJoiningRequests} size="sm">
            <Plus className="h-4 w-4 mr-1" /> New Request
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={goToGuests}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Residents</span>
                <span className="text-2xl font-bold">
                  {mockData.pgDetails.totalBeds - mockData.pgDetails.availableBeds}
                </span>
                <span className="text-sm text-muted-foreground">
                  of {mockData.pgDetails.totalBeds} beds
                </span>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress 
              value={occupancyPercent} 
              className={cn(
                "mt-4",
                occupancyPercent > 90 ? "[&>div]:bg-red-500" :
                occupancyPercent > 75 ? "[&>div]:bg-orange-500" :
                "[&>div]:bg-green-500"
              )}
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Occupancy {occupancyPercent}%</span>
              <span>{mockData.pgDetails.availableBeds} beds available</span>
                </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={goToRooms}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Rooms</span>
                <span className="text-2xl font-bold">
                  {mockData.pgDetails.totalRooms - mockData.pgDetails.availableRooms}
                </span>
                <span className="text-sm text-muted-foreground">
                  of {mockData.pgDetails.totalRooms} total
                </span>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600" />
          </div>
        </div>
            <Progress 
              value={((mockData.pgDetails.totalRooms - mockData.pgDetails.availableRooms) / mockData.pgDetails.totalRooms) * 100} 
              className="mt-4 [&>div]:bg-purple-500"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Occupied Rooms</span>
              <span>{mockData.pgDetails.availableRooms} available</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={goToServiceRequests}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Active Requests</span>
                <span className="text-2xl font-bold">{mockData.serviceRequests.length}</span>
                <span className="text-sm text-muted-foreground">
                  {mockData.serviceRequests.filter(r => r.priority === "high").length} high priority
                </span>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-amber-600" />
          </div>
        </div>
            <div className="mt-4 space-y-2">
              {mockData.serviceRequests.slice(0, 2).map(request => (
                <div key={request.id} className="flex items-center justify-between text-sm">
                  <span className="truncate flex-1">{request.description}</span>
                  <Badge variant="outline" className={cn(
                    request.priority === "high" ? "bg-red-100 text-red-800" :
                    request.priority === "medium" ? "bg-amber-100 text-amber-800" :
                    "bg-green-100 text-green-800"
                  )}>
                    {request.priority}
                  </Badge>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={goToPayments}>
          <CardContent className="pt-4">
              <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Recent Payments</span>
                <span className="text-2xl font-bold">
                  ₹{mockData.recentPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Last 7 days
                </span>
                </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
                </div>
            <div className="mt-4 space-y-2">
              {mockData.recentPayments.slice(0, 2).map(payment => (
                <div key={payment.id} className="flex items-center justify-between text-sm">
                  <span className="truncate flex-1">{payment.resident}</span>
                  <Badge variant={payment.status === "completed" ? "outline" : "secondary"}>
                    ₹{payment.amount.toLocaleString()}
                  </Badge>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Service Requests</CardTitle>
              <Button variant="outline" size="sm" onClick={goToServiceRequests}>
                View All
              </Button>
            </div>
            <CardDescription>Recent maintenance and service requests</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
              {mockData.serviceRequests.map(request => (
                <div key={request.id} className="flex items-start justify-between">
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
            </CardContent>
          </Card>

        {/* Joining Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Joining Requests</CardTitle>
              <Button variant="outline" size="sm" onClick={goToJoiningRequests}>
                View All
              </Button>
            </div>
            <CardDescription>Recent accommodation requests</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
              {mockData.joiningRequests.map(request => (
                <div key={request.id} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {request.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                      <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.roomType} • Move in: {new Date(request.moveInDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={request.status === "pending" ? "secondary" : "outline"}>
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
            </CardContent>
          </Card>
        </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Feedback */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Food Feedback</CardTitle>
              <Button variant="outline" size="sm" onClick={goToFoodManagement}>
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
                  <Progress value={(item.count / mockData.foodFeedback.today.totalResponses) * 100} />
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
            <CardDescription>Scheduled activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={goToGuests}
              >
                <Users className="h-6 w-6" />
                <span>Add Resident</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={goToServiceRequests}
              >
                <ClipboardList className="h-6 w-6" />
                <span>New Request</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={goToFoodManagement}
              >
                <Utensils className="h-6 w-6" />
                <span>Manage Food</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={goToPayments}
              >
                <IndianRupee className="h-6 w-6" />
                <span>Record Payment</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={goToReports}
              >
                <FileText className="h-6 w-6" />
                <span>Generate Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PGManager;
