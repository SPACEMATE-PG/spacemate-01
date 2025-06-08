import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
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
  TrendingUp
} from "lucide-react";

const PGManager = () => {
  const { toast } = useToast();
  const [pgAvailability, setPgAvailability] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(12);
  const [serviceRequests, setServiceRequests] = useState(8);
  const [unreadMessages, setUnreadMessages] = useState(5);

  const handleAvailabilityToggle = () => {
    setPgAvailability(!pgAvailability);
    toast({
      title: "PG Availability Updated",
      description: `PG is now marked as ${!pgAvailability ? 'Available' : 'Fully Booked'}`,
    });
  };

  const handleServiceRequest = (id: string) => {
    setServiceRequests(prev => prev - 1);
    toast({
      title: "Service Request Acknowledged",
      description: "Request status updated to acknowledged",
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Building2 className="h-8 w-8 mr-3 text-hostel-primary" />
            PG Manager Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive PG management and operations control</p>
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Rooms</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Bed className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Occupancy</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold">{pendingRequests}</p>
              </div>
              <UserPlus className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Service Requests</p>
                <p className="text-2xl font-bold">{serviceRequests}</p>
              </div>
              <Wrench className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="communication">Messages</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-hostel-primary" />
                  PG Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue This Month</span>
                    <span className="font-semibold text-green-600">₹2,45,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Joinings</span>
                    <span className="font-semibold">8 this month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Stay Duration</span>
                    <span className="font-semibold">8.5 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Satisfaction</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">4.3/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-hostel-primary" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New joining request from Rahul</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Wi-Fi service request completed</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
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
        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-hostel-primary" />
                Asset Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold flex items-center mb-2">
                    <Bed className="h-4 w-4 mr-2" />
                    Rooms & Beds
                  </h3>
                  <p className="text-sm text-gray-600">Total Rooms: 24</p>
                  <p className="text-sm text-gray-600">Total Beds: 48</p>
                  <p className="text-sm text-gray-600">Available Beds: 6</p>
                  <Button size="sm" className="mt-2">Update Details</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold flex items-center mb-2">
                    <Wrench className="h-4 w-4 mr-2" />
                    Facilities
                  </h3>
                  <p className="text-sm text-gray-600">Washing Machines: 4</p>
                  <p className="text-sm text-gray-600">Water Purifiers: 6</p>
                  <p className="text-sm text-gray-600">Wi-Fi Points: 12</p>
                  <Button size="sm" className="mt-2">Manage Assets</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold flex items-center mb-2">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Maintenance
                  </h3>
                  <p className="text-sm text-gray-600">Scheduled: 3 items</p>
                  <p className="text-sm text-gray-600">Pending: 2 items</p>
                  <p className="text-sm text-gray-600">Completed: 15 items</p>
                  <Button size="sm" className="mt-2">View Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-hostel-primary" />
                  Joining Requests
                </div>
                <Badge className="bg-amber-100 text-amber-700">{pendingRequests} Pending</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((request) => (
                  <div key={request} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Rahul Kumar</h4>
                      <p className="text-sm text-gray-600">Software Engineer • Preferred: Single room</p>
                      <p className="text-xs text-gray-500">Applied 2 hours ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Requests Tab */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-hostel-primary" />
                  Service Requests
                </div>
                <Badge className="bg-red-100 text-red-700">{serviceRequests} Pending</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: '1', asset: 'Washing Machine #2', issue: 'Not starting properly', requests: 8, priority: 'High' },
                  { id: '2', asset: 'Water Purifier #3', issue: 'Low water pressure', requests: 5, priority: 'Medium' },
                  { id: '3', asset: 'Wi-Fi Router #1', issue: 'Connectivity issues', requests: 12, priority: 'High' },
                  { id: '4', asset: 'Air Conditioner #5', issue: 'Not cooling effectively', requests: 3, priority: 'Low' }
                ].map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{request.asset}</h4>
                      <p className="text-sm text-gray-600">{request.issue}</p>
                      <p className="text-xs text-gray-500">{request.requests} user requests • Priority: {request.priority}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        request.priority === 'High' ? 'bg-red-100 text-red-700' :
                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }>
                        {request.priority}
                      </Badge>
                      <Button 
                        onClick={() => handleServiceRequest(request.id)}
                      >
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Management Tab */}
        <TabsContent value="meals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-hostel-primary" />
                  Meal Planning & Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded">
                    <h4 className="font-medium">Today's Menu</h4>
                    <p className="text-sm text-gray-600">Breakfast: Poha, Tea</p>
                    <p className="text-sm text-gray-600">Lunch: Dal, Rice, Sabji, Roti</p>
                    <p className="text-sm text-gray-600">Dinner: Rajma, Rice, Roti</p>
                  </div>
                  <Button className="w-full">Update Weekly Menu</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-hostel-primary" />
                  Food Feedback Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Breakfast Rating</span>
                    <span className="font-medium">4.2/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lunch Rating</span>
                    <span className="font-medium">4.5/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Dinner Rating</span>
                    <span className="font-medium">4.1/5</span>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2">Recent Feedback</h5>
                    <p className="text-xs text-gray-600">"Food quality has improved!"</p>
                    <p className="text-xs text-gray-600">"Please add more variety in breakfast"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-hostel-primary" />
                  User Queries & Communication
                </div>
                <Badge className="bg-blue-100 text-blue-700">{unreadMessages} Unread</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Priya Sharma', message: 'Wi-Fi password not working in room 204', time: '2 hours ago', type: 'individual' },
                  { user: 'Amit Kumar', message: 'When will the washing machine be fixed?', time: '4 hours ago', type: 'individual' },
                  { user: 'General Query', message: 'Water supply timing clarification needed', time: '1 day ago', type: 'general' }
                ].map((query, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium flex items-center">
                        {query.user}
                        <Badge 
                          className={query.type === 'individual' ? 'ml-2 bg-blue-100 text-blue-700' : 'ml-2 bg-green-100 text-green-700'}
                        >
                          {query.type === 'individual' ? 'Private' : 'Public'}
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-600">{query.message}</p>
                      <p className="text-xs text-gray-500">{query.time}</p>
                    </div>
                    <Button>Reply</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PGManager;
