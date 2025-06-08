
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Building2, 
  Bed, 
  Users, 
  Settings, 
  MessageSquare, 
  Utensils, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
  Bell,
  UserPlus,
  Wrench,
  Clock,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Send,
  Eye,
  X,
  Check,
  AlertTriangle,
  Wifi,
  Droplets,
  Zap
} from "lucide-react";

const PGManager = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [pgAvailability, setPgAvailability] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(12);
  const [serviceRequests, setServiceRequests] = useState(8);
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newMenuItems, setNewMenuItems] = useState({ breakfast: "", lunch: "", dinner: "" });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      if (Math.random() > 0.8) {
        setUnreadMessages(prev => prev + 1);
        toast({
          title: "New Message",
          description: "You have a new message from a resident",
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const handleAvailabilityToggle = () => {
    setPgAvailability(!pgAvailability);
    toast({
      title: "PG Availability Updated",
      description: `PG is now marked as ${!pgAvailability ? 'Available' : 'Fully Booked'}`,
    });
  };

  const handleServiceRequest = (id: string, action: 'acknowledge' | 'complete' | 'reject') => {
    setServiceRequests(prev => prev - 1);
    toast({
      title: `Service Request ${action.charAt(0).toUpperCase() + action.slice(1)}d`,
      description: `Request #${id} has been ${action}d successfully`,
    });
  };

  const handleJoiningRequest = (id: string, action: 'accept' | 'reject') => {
    setPendingRequests(prev => prev - 1);
    toast({
      title: `Joining Request ${action.charAt(0).toUpperCase() + action.slice(1)}ed`,
      description: `Request from applicant has been ${action}ed`,
    });
  };

  const handleSendReply = (queryId: string) => {
    if (!replyText.trim()) return;
    
    setUnreadMessages(prev => prev - 1);
    setReplyingTo(null);
    setReplyText("");
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully",
    });
  };

  const handleUpdateMenu = () => {
    toast({
      title: "Menu Updated",
      description: "Weekly menu has been updated successfully",
    });
    setNewMenuItems({ breakfast: "", lunch: "", dinner: "" });
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  // Tab configuration with icons and notifications
  const tabConfig = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: BarChart3, 
      description: 'Dashboard analytics',
      notificationCount: 0 
    },
    { 
      id: 'assets', 
      label: 'Assets', 
      icon: Settings, 
      description: 'Manage facilities',
      notificationCount: 0 
    },
    { 
      id: 'requests', 
      label: 'Requests', 
      icon: UserPlus, 
      description: 'Joining applications',
      notificationCount: pendingRequests 
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: Wrench, 
      description: 'Maintenance issues',
      notificationCount: serviceRequests 
    },
    { 
      id: 'meals', 
      label: 'Meals', 
      icon: Utensils, 
      description: 'Food management',
      notificationCount: 0 
    },
    { 
      id: 'communication', 
      label: 'Messages', 
      icon: MessageSquare, 
      description: 'Resident queries',
      notificationCount: unreadMessages 
    }
  ];

  const joiningRequests = [
    { id: '1', name: 'Rahul Kumar', profession: 'Software Engineer', roomType: 'Single room', appliedTime: '2 hours ago', profileViews: 15 },
    { id: '2', name: 'Priya Sharma', profession: 'Marketing Manager', roomType: 'Shared room', appliedTime: '4 hours ago', profileViews: 8 },
    { id: '3', name: 'Amit Singh', profession: 'Data Analyst', roomType: 'Single room', appliedTime: '6 hours ago', profileViews: 12 },
    { id: '4', name: 'Sneha Patel', profession: 'UI/UX Designer', roomType: 'Shared room', appliedTime: '1 day ago', profileViews: 20 }
  ];

  const serviceRequestsData = [
    { id: '1', asset: 'Washing Machine #2', issue: 'Not starting properly', requests: 8, priority: 'High', icon: Wrench, status: 'pending' },
    { id: '2', asset: 'Water Purifier #3', issue: 'Low water pressure', requests: 5, priority: 'Medium', icon: Droplets, status: 'pending' },
    { id: '3', asset: 'Wi-Fi Router #1', issue: 'Connectivity issues', requests: 12, priority: 'High', icon: Wifi, status: 'pending' },
    { id: '4', asset: 'Air Conditioner #5', issue: 'Not cooling effectively', requests: 3, priority: 'Low', icon: Zap, status: 'pending' }
  ];

  const communicationData = [
    { id: '1', user: 'Priya Sharma', message: 'Wi-Fi password not working in room 204', time: '2 hours ago', type: 'individual' },
    { id: '2', user: 'Amit Kumar', message: 'When will the washing machine be fixed?', time: '4 hours ago', type: 'individual' },
    { id: '3', user: 'General Query', message: 'Water supply timing clarification needed', time: '1 day ago', type: 'general' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-primary" />
              PG Manager Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Real-time PG management and operations control</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">PG Status:</span>
              <Switch
                checked={pgAvailability}
                onCheckedChange={handleAvailabilityToggle}
                className="data-[state=checked]:bg-green-500"
              />
              <Badge 
                className={pgAvailability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
              >
                {pgAvailability ? "Available" : "Fully Booked"}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: now
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Rooms</p>
                  <p className="text-xl sm:text-2xl font-bold">24</p>
                  <p className="text-xs text-green-600">+2 this month</p>
                </div>
                <Bed className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Occupancy</p>
                  <p className="text-xl sm:text-2xl font-bold">87%</p>
                  <p className="text-xs text-green-600">+5% from last month</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow cursor-pointer" onClick={() => toggleCardExpansion('pending')}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Pending Requests</p>
                  <p className="text-xl sm:text-2xl font-bold">{pendingRequests}</p>
                  <p className="text-xs text-amber-600">Requires attention</p>
                </div>
                <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow cursor-pointer" onClick={() => toggleCardExpansion('service')}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Service Requests</p>
                  <p className="text-xl sm:text-2xl font-bold">{serviceRequests}</p>
                  <p className="text-xs text-red-600">3 high priority</p>
                </div>
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Tab Navigation */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50">
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-gray-700">Management Sections</h3>
              </div>
            </div>
            
            {/* Enhanced Tab Navigation */}
            <div className="p-2">
              <TabsList className="w-full h-auto bg-transparent p-0 gap-1">
                {tabConfig.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id}
                      value={tab.id} 
                      className="flex-1 min-w-0 h-auto p-3 flex flex-col items-center gap-2 text-center transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-gray-100 rounded-lg border border-transparent data-[state=active]:border-primary data-[state=active]:shadow-sm"
                    >
                      <div className="flex items-center justify-center relative">
                        <IconComponent className="h-5 w-5" />
                        {tab.notificationCount > 0 && (
                          <Badge 
                            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-white"
                          >
                            {tab.notificationCount > 99 ? '99+' : tab.notificationCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs font-medium leading-none">{tab.label}</span>
                        {!isMobile && (
                          <span className="text-xs text-gray-500 leading-none">{tab.description}</span>
                        )}
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <BarChart3 className="h-5 w-5 mr-2 text-hostel-primary" />
                    Live Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Revenue This Month</span>
                      <span className="font-bold text-green-600 text-lg">₹2,45,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">New Joinings</span>
                      <span className="font-bold text-blue-600">8 this month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">Average Stay Duration</span>
                      <span className="font-bold text-purple-600">8.5 months</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">Overall Satisfaction</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-bold text-yellow-600">4.3/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Bell className="h-5 w-5 mr-2 text-hostel-primary" />
                    Live Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <div className="flex items-start space-x-3 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New joining request from Rahul</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Wi-Fi service request completed</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Food feedback: 4.2/5 rating</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Asset Management Tab */}
          <TabsContent value="assets" className="space-y-4 sm:space-y-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-hostel-primary" />
                    Real-time Asset Management
                  </div>
                  <Button size="sm" className="bg-hostel-primary hover:bg-hostel-secondary">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Asset
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
                    <h3 className="font-semibold flex items-center mb-3">
                      <Bed className="h-4 w-4 mr-2 text-blue-600" />
                      Rooms & Beds
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Rooms:</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Beds:</span>
                        <span className="font-medium">48</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available Beds:</span>
                        <span className="font-medium text-green-600">6</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3 w-full">
                      <Edit className="h-3 w-3 mr-1" />
                      Manage Rooms
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-green-100">
                    <h3 className="font-semibold flex items-center mb-3">
                      <Wrench className="h-4 w-4 mr-2 text-green-600" />
                      Facilities Status
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Washing Machines:</span>
                        <div className="flex items-center">
                          <span className="font-medium">3/4</span>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Water Purifiers:</span>
                        <div className="flex items-center">
                          <span className="font-medium">5/6</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Wi-Fi Points:</span>
                        <div className="flex items-center">
                          <span className="font-medium">11/12</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3 w-full">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
                    <h3 className="font-semibold flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                      Maintenance Queue
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheduled:</span>
                        <span className="font-medium text-blue-600">3 items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">In Progress:</span>
                        <span className="font-medium text-yellow-600">2 items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed Today:</span>
                        <span className="font-medium text-green-600">5 items</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3 w-full">
                      <Calendar className="h-3 w-3 mr-1" />
                      View Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Requests Tab */}
          <TabsContent value="requests" className="space-y-4 sm:space-y-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2 text-hostel-primary" />
                    Joining Requests
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-700">{pendingRequests} Pending</Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      Auto-refresh: 30s
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search applicants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
                <div className="space-y-4">
                  {joiningRequests.map((request) => (
                    <div key={request.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{request.name}</h4>
                          <Badge variant="outline" className="text-xs">{request.profileViews} views</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{request.profession} • Preferred: {request.roomType}</p>
                        <p className="text-xs text-gray-500">Applied {request.appliedTime}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                          <Eye className="h-3 w-3 mr-1" />
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700"
                          onClick={() => handleJoiningRequest(request.id, 'accept')}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="flex-1 sm:flex-initial"
                          onClick={() => handleJoiningRequest(request.id, 'reject')}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Requests Tab */}
          <TabsContent value="services" className="space-y-4 sm:space-y-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center">
                    <Wrench className="h-5 w-5 mr-2 text-hostel-primary" />
                    Service Requests
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-700">{serviceRequests} Pending</Badge>
                    <Badge className="bg-yellow-100 text-yellow-700">3 High Priority</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceRequestsData.map((request) => (
                    <div key={request.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3 flex-1 mb-3 sm:mb-0">
                        <request.icon className="h-5 w-5 text-gray-600 mt-1" />
                        <div>
                          <h4 className="font-medium">{request.asset}</h4>
                          <p className="text-sm text-gray-600">{request.issue}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">{request.requests} user requests</p>
                            <Badge className={
                              request.priority === 'High' ? 'bg-red-100 text-red-700' :
                              request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }>
                              {request.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          size="sm"
                          className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleServiceRequest(request.id, 'acknowledge')}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                        <Button 
                          size="sm"
                          className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700"
                          onClick={() => handleServiceRequest(request.id, 'complete')}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meal Management Tab */}
          <TabsContent value="meals" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Calendar className="h-5 w-5 mr-2 text-hostel-primary" />
                    Live Menu Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded bg-gradient-to-r from-orange-50 to-yellow-50">
                      <h4 className="font-medium text-orange-800 mb-2">Today's Menu</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Breakfast:</span> Poha, Tea</p>
                        <p><span className="font-medium">Lunch:</span> Dal, Rice, Sabji, Roti</p>
                        <p><span className="font-medium">Dinner:</span> Rajma, Rice, Roti</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium">Update Menu Items</h5>
                      <div className="space-y-2">
                        <Input
                          placeholder="Breakfast items..."
                          value={newMenuItems.breakfast}
                          onChange={(e) => setNewMenuItems(prev => ({...prev, breakfast: e.target.value}))}
                        />
                        <Input
                          placeholder="Lunch items..."
                          value={newMenuItems.lunch}
                          onChange={(e) => setNewMenuItems(prev => ({...prev, lunch: e.target.value}))}
                        />
                        <Input
                          placeholder="Dinner items..."
                          value={newMenuItems.dinner}
                          onChange={(e) => setNewMenuItems(prev => ({...prev, dinner: e.target.value}))}
                        />
                      </div>
                    </div>
                    
                    <Button onClick={handleUpdateMenu} className="w-full bg-hostel-primary hover:bg-hostel-secondary">
                      <Calendar className="h-4 w-4 mr-2" />
                      Update Weekly Menu
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Star className="h-5 w-5 mr-2 text-hostel-primary" />
                    Real-time Food Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Breakfast Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-bold text-green-600">4.2/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Lunch Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-bold text-green-600">4.5/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium">Dinner Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-bold text-yellow-600">4.1/5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-sm mb-2 text-blue-800">Recent Live Feedback</h5>
                      <div className="space-y-1 text-xs">
                        <p className="text-blue-700">"Food quality has improved!" - 2 mins ago</p>
                        <p className="text-blue-700">"Please add more variety in breakfast" - 5 mins ago</p>
                        <p className="text-blue-700">"Lunch was excellent today!" - 10 mins ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-4 sm:space-y-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-hostel-primary" />
                    Live Communication Hub
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 animate-pulse">{unreadMessages} Unread</Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Live
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communicationData.map((query) => (
                    <div key={query.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium flex items-center flex-wrap gap-2">
                            {query.user}
                            <Badge 
                              className={query.type === 'individual' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}
                            >
                              {query.type === 'individual' ? 'Private' : 'Public'}
                            </Badge>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{query.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{query.time}</p>
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto">
                          {replyingTo === query.id ? (
                            <div className="flex flex-col gap-2 w-full sm:w-64">
                              <Textarea
                                placeholder="Type your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-[60px] text-sm"
                              />
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSendReply(query.id)}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <Send className="h-3 w-3 mr-1" />
                                  Send
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => setReplyingTo(query.id)}
                              className="bg-hostel-primary hover:bg-hostel-secondary"
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Reply
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h5 className="font-medium text-sm mb-2">Quick Actions</h5>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Bell className="h-3 w-3 mr-1" />
                      Send Announcement
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      Broadcast Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Emergency Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PGManager;
