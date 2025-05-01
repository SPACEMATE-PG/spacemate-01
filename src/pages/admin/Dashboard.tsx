
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rooms } from "@/data/mockData";

const AdminDashboard = () => {
  // Calculate hostel statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.occupied === room.capacity).length;
  const availableRooms = rooms.filter(room => room.available).length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Available Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableRooms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Occupied Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedRooms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>New booking request</span>
              <span className="text-gray-500">10 minutes ago</span>
            </li>
            <li className="flex justify-between">
              <span>Payment received from Room 101</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span>Meal plan updated</span>
              <span className="text-gray-500">1 day ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 bg-hostel-muted text-hostel-primary rounded hover:bg-hostel-accent">
              Send Notification
            </button>
            <button className="p-2 bg-hostel-muted text-hostel-primary rounded hover:bg-hostel-accent">
              Update Menu
            </button>
            <button className="p-2 bg-hostel-muted text-hostel-primary rounded hover:bg-hostel-accent">
              Add Room
            </button>
            <button className="p-2 bg-hostel-muted text-hostel-primary rounded hover:bg-hostel-accent">
              View Reports
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
