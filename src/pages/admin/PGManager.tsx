import { useState } from "react";
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
  Utensils,
  Settings,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  XCircle,
  FileText
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
      requestedBy: 15 // number of users requesting
    },
    {
      id: "2",
      type: "Cleaning",
      description: "Room cleaning required",
      status: "in-progress",
      roomNumber: "102",
      priority: "medium",
      requestedBy: 8
    }
  ],
  messages: [
    {
      id: "1",
      from: "Guest",
      message: "When will the WiFi be fixed?",
      timestamp: "2024-03-01 10:30",
      status: "unread"
    }
  ],
  foodFeedback: {
    today: {
      rating: 4.2,
      totalResponses: 45,
      comments: [
        "Lunch was great!",
        "Dinner could be better"
      ]
    }
  }
};

const PGManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPGAvailable, setIsPGAvailable] = useState(mockData.pgDetails.isAvailable);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const isMobileView = useIsMobile();

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
      title: checked ? "PG is now available" : "PG is now fully booked",
      description: checked ? "New bookings can be accepted" : "No new bookings will be accepted",
    });
  };

  const handleRequestAction = (type: string, id: string, action: string) => {
    switch (action) {
      case "view":
        navigate(`/pg-admin/${type === "joining" ? "residents/requests" : "requests"}`);
        break;
      case "approve":
        toast({
          title: "Request Approved",
          description: `${type === "joining" ? "Joining" : "Service"} request has been approved`,
        });
        break;
      case "reject":
        toast({
          title: "Request Rejected",
          description: `${type === "joining" ? "Joining" : "Service"} request has been rejected`,
        });
        break;
      default:
        break;
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b sticky top-0 z-30 shadow-sm bg-white">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg">
              SM
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-hostel-primary to-hostel-secondary bg-clip-text text-transparent">
              Space Mate
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* PG Availability Toggle */}
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm font-medium">PG Status:</span>
              <div className="flex items-center gap-2">
                {isPGAvailable ? (
                  <ToggleRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-red-500" />
                )}
                <Switch
                  checked={isPGAvailable}
                  onCheckedChange={handlePGAvailability}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>

            {/* Desktop Profile */}
            {!isMobileView && currentUser && (
              <div className="flex items-center gap-3 mr-2">
                <div className="text-right">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">PG Admin</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-hostel-primary text-white flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-safe">
                <div className="h-full flex flex-col">
                  {/* User Profile Section */}
                  {currentUser && (
                    <div className="flex flex-col items-center py-6 border-b">
                      <div className="h-20 w-20 rounded-full bg-hostel-primary text-white flex items-center justify-center text-2xl mb-2">
                        {currentUser.name.charAt(0)}
                      </div>
                      <h2 className="font-semibold text-lg">{currentUser.name}</h2>
                      <p className="text-gray-500 text-sm">{currentUser.email}</p>
                      <p className="text-sm bg-hostel-accent text-hostel-primary px-3 py-1 rounded-full mt-2">
                        PG Admin
                      </p>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                      {navigationItems.map((item) => (
                        <li key={item.tab}>
                          <Button
                            variant={activeTab === item.tab ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start text-base py-6",
                              activeTab === item.tab
                                ? "bg-hostel-primary text-white"
                                : "text-gray-600 hover:bg-hostel-accent hover:text-hostel-primary"
                            )}
                            onClick={() => handleNavigation(item.path)}
                          >
                            <item.icon size={18} className="mr-3" />
                            {item.label}
                          </Button>
                        </li>
                      ))}
                      <li>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-base py-6 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={handleLogout}
                        >
                          <LogOut size={18} className="mr-3" />
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name?.split(" ")[0]}!</h2>
              <p className="text-white/80">Manage your PG and handle guest requests efficiently.</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell size={20} />
            </Button>
          </div>
        </div>

        {/* PG Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{mockData.pgDetails.totalRooms}</h3>
                  <p className="text-xs text-gray-500 mt-1">{mockData.pgDetails.availableRooms} rooms available</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Beds</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{mockData.pgDetails.totalBeds}</h3>
                  <p className="text-xs text-gray-500 mt-1">{mockData.pgDetails.availableBeds} beds available</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Food Rating</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{mockData.foodFeedback.today.rating}/5</h3>
                  <p className="text-xs text-gray-500 mt-1">{mockData.foodFeedback.today.totalResponses} responses</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links / Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {/* Guests Card */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/pg-admin/residents")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Guests</CardTitle>
              <Users className="h-6 w-6 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage all resident profiles</p>
            </CardContent>
          </Card>

          {/* Rooms Card */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/pg-admin/rooms")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Rooms</CardTitle>
              <Building className="h-6 w-6 text-green-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and assign rooms</p>
            </CardContent>
          </Card>

          {/* Requests Card */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/pg-admin/requests")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Requests</CardTitle>
              <ClipboardList className="h-6 w-6 text-orange-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Handle service & joining requests</p>
            </CardContent>
          </Card>

          {/* Financial Card */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/pg-admin/payments")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Financial</CardTitle>
              <IndianRupee className="h-6 w-6 text-purple-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage payments & expenses</p>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/pg-admin/notifications")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
              <Bell className="h-6 w-6 text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View alerts & announcements</p>
            </CardContent>
          </Card>

          {/* Reports Card (New) */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/pg-admin/reports")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Reports</CardTitle>
              <FileText className="h-6 w-6 text-red-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Generate financial & occupancy reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Joining Requests</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/pg-admin/residents/requests")}
              >
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {mockData.joiningRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending joining requests.</p>
              ) : (
                <div className="space-y-4">
                  {mockData.joiningRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div>
                        <h3 className="font-medium">{request.name}</h3>
                        <p className="text-sm text-gray-500">{request.roomType} - Move-in: {request.moveInDate}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRequestAction("joining", request.id, "view")}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRequestAction("joining", request.id, "approve")}>
                            <CheckCircle className="h-4 w-4 mr-2" /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRequestAction("joining", request.id, "reject")}>
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Service Requests</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/pg-admin/requests")}
              >
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {mockData.serviceRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending service requests.</p>
              ) : (
                <div className="space-y-4">
                  {mockData.serviceRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div>
                        <h3 className="font-medium">{request.description}</h3>
                        <p className="text-sm text-gray-500">Room: {request.roomNumber} - Priority: {request.priority}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRequestAction("service", request.id, "view")}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRequestAction("service", request.id, "approve")}>
                            <CheckCircle className="h-4 w-4 mr-2" /> Mark Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity / Announcements Section (Optional, can be expanded) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Messages</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/pg-admin/notifications")}>
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {mockData.messages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent messages.</p>
            ) : (
              <div className="space-y-3">
                {mockData.messages.map((message) => (
                  <div key={message.id} className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="font-medium">{message.from}</p>
                      <p className="text-sm text-gray-700">{message.message}</p>
                      <p className="text-xs text-gray-500">{message.timestamp}</p>
                    </div>
                    {message.status === "unread" && <Badge className="bg-blue-100 text-blue-800">New</Badge>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PGManager;
