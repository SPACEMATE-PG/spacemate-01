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
  ToggleRight
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
        navigate(`/pg-admin/${type}/${id}`);
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="h-5 w-5 mr-2 text-indigo-600" />
                    Recent Joining Requests
                  </CardTitle>
                  <CardDescription>New guest applications</CardDescription>
                  </div>
                  <Button 
                  variant="ghost" 
                    size="sm" 
                  className="text-sm flex items-center gap-1"
                  onClick={() => navigate("/pg-admin/guests/requests")}
                  >
                  View All <ArrowUpRight size={14} />
                  </Button>
              </div>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                {mockData.joiningRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.roomType}</p>
                  </div>
                  <div className="flex items-center gap-2">
                      <Badge variant={request.status === "pending" ? "secondary" : "default"} className="ml-2">
                        {request.status}
                            </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRequestAction("joining", request.id, "view")}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {request.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleRequestAction("joining", request.id, "approve")}>
                                <Shield className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRequestAction("joining", request.id, "reject")}>
                                <X className="mr-2 h-4 w-4" />
                            Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="h-5 w-5 mr-2 text-yellow-600" />
                    Service Requests
                  </CardTitle>
                  <CardDescription>Maintenance and services</CardDescription>
                      </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm flex items-center gap-1"
                  onClick={() => navigate("/pg-admin/requests")}
                >
                  View All <ArrowUpRight size={14} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                {mockData.serviceRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{request.type}</h3>
                      <p className="text-sm text-gray-500">Room {request.roomNumber} • {request.requestedBy} requests</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={request.status === "pending" ? "secondary" : "default"}
                        className={cn(
                          "ml-2",
                          request.priority === "high" && "bg-red-100 text-red-700"
                        )}
                      >
                        {request.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRequestAction("service", request.id, "view")}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {request.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleRequestAction("service", request.id, "approve")}>
                                <Shield className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRequestAction("service", request.id, "reject")}>
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                  </div>
                </CardContent>
              </Card>
                        </div>
                        
        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center space-y-3 hover:bg-hostel-accent hover:text-hostel-primary transition-all duration-200 border-2 border-gray-100 hover:border-hostel-primary/20"
              onClick={() => navigate("/pg-admin/guests/add")}
            >
              <div className="bg-hostel-muted w-12 h-12 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-hostel-primary" />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium block">Add Guest</span>
                <span className="text-xs text-gray-500 mt-1 block">Register new guest</span>
              </div>
                                </Button>
                                <Button 
                                  variant="outline"
              className="h-auto py-6 flex flex-col items-center space-y-3 hover:bg-hostel-accent hover:text-hostel-primary transition-all duration-200 border-2 border-gray-100 hover:border-hostel-primary/20"
              onClick={() => navigate("/pg-admin/pg-management")}
            >
              <div className="bg-hostel-muted w-12 h-12 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-hostel-primary" />
                              </div>
              <div className="text-center">
                <span className="text-sm font-medium block">Manage PG</span>
                <span className="text-xs text-gray-500 mt-1 block">Update PG details & facilities</span>
                </div>
                    </Button>
                  </div>
                </div>
      </main>
    </div>
  );
};

export default PGManager;
