
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rooms } from "@/data/mockData";
import { Users, Home, CheckCircle, AlertCircle, Bell, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculate hostel statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.occupied === room.capacity).length;
  const availableRooms = rooms.filter(room => room.available).length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  // Handle quick actions
  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: "Notification has been sent to all residents",
    });
  };

  const handleUpdateMenu = () => {
    navigate('/admin/meals');
  };

  const handleAddRoom = () => {
    navigate('/admin/rooms');
  };

  const handleViewReports = () => {
    toast({
      title: "Reports Feature",
      description: "Reports functionality will be available soon",
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Admin</h1>
        <div className="bg-hostel-accent text-hostel-primary px-3 py-1 rounded-full text-sm font-medium">
          Today's Overview
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-hostel-primary">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Total Rooms</span>
              <Home className="h-5 w-5 text-hostel-primary" />
            </div>
            <div className="text-2xl font-bold">{totalRooms}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Available</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{availableRooms}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Occupied</span>
              <Users className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">{occupiedRooms}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Occupancy</span>
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Bell className="h-4 w-4 mr-2 text-hostel-primary" />
                Recent Activities
              </CardTitle>
              <div className="text-xs text-hostel-primary cursor-pointer">View All</div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">New booking request</h3>
                    <p className="text-xs text-gray-500">Room 304 requested by John Doe</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">10 min ago</span>
              </li>
              
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Home className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Payment received from Room 101</h3>
                    <p className="text-xs text-gray-500">₹12,000 monthly rent</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </li>
              
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Meal plan updated</h3>
                    <p className="text-xs text-gray-500">Weekly menu changes applied</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <button 
                className="p-3 bg-hostel-accent text-hostel-primary rounded-lg hover:bg-hostel-accent/80 transition-colors flex items-center justify-center"
                onClick={handleSendNotification}
              >
                <Bell className="h-4 w-4 mr-2" />
                <span>Send Notification</span>
              </button>
              <button 
                className="p-3 bg-hostel-accent text-hostel-primary rounded-lg hover:bg-hostel-accent/80 transition-colors flex items-center justify-center"
                onClick={handleUpdateMenu}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>Update Menu</span>
              </button>
              <button 
                className="p-3 bg-hostel-accent text-hostel-primary rounded-lg hover:bg-hostel-accent/80 transition-colors flex items-center justify-center"
                onClick={handleAddRoom}
              >
                <Home className="h-4 w-4 mr-2" />
                <span>Add Room</span>
              </button>
              <button 
                className="p-3 bg-hostel-accent text-hostel-primary rounded-lg hover:bg-hostel-accent/80 transition-colors flex items-center justify-center"
                onClick={handleViewReports}
              >
                <Users className="h-4 w-4 mr-2" />
                <span>View Reports</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
