import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building2, Plus, Search, Settings, Wrench, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data - replace with actual API data
const mockRooms = [
  {
    id: "101",
    type: "Double Sharing",
    capacity: 2,
    occupied: 1,
    status: "available",
    price: 8000,
    amenities: ["AC", "Attached Bathroom", "Wifi"],
    maintenance: {
      lastCheck: "2024-02-15",
      nextCheck: "2024-03-15",
      issues: []
    }
  },
  {
    id: "102",
    type: "Single Sharing",
    capacity: 1,
    occupied: 1,
    status: "occupied",
    price: 12000,
    amenities: ["AC", "Attached Bathroom", "Wifi", "TV"],
    maintenance: {
      lastCheck: "2024-02-10",
      nextCheck: "2024-03-10",
      issues: ["AC service required"]
    }
  },
  // Add more mock rooms as needed
];

const RoomManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rooms");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);

  const handleBack = () => {
    navigate("/pg-admin");
  };

  const handleAddRoom = () => {
    setShowAddRoom(true);
  };

  const handleRoomAction = (roomId: string, action: string) => {
    // TODO: Implement room actions
    console.log(`Room ${roomId} - Action: ${action}`);
  };

  const filteredRooms = mockRooms.filter(room =>
    room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="types">Room Types</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              onClick={handleAddRoom}
              className="bg-hostel-primary hover:bg-hostel-secondary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Room {room.id}</CardTitle>
                    <Badge
                      variant={room.status === "available" ? "default" : "secondary"}
                      className={room.status === "available" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                    >
                      {room.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">{room.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="font-medium">{room.occupied}/{room.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium">₹{room.price}/month</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-sm text-gray-500 mb-1">Amenities:</div>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRoomAction(room.id, "edit")}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRoomAction(room.id, "maintenance")}
                      >
                        <Wrench className="h-4 w-4 mr-1" />
                        Maintenance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Room {room.id}</h3>
                      <p className="text-sm text-gray-500">
                        Last Check: {room.maintenance.lastCheck}
                      </p>
                      <p className="text-sm text-gray-500">
                        Next Check: {room.maintenance.nextCheck}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {room.maintenance.issues.length > 0 && (
                        <Badge variant="destructive">
                          {room.maintenance.issues.length} Issues
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRoomAction(room.id, "schedule")}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Room Types</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRoomAction("new", "type")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Type
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Single Sharing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Base Price:</span>
                        <span>₹12,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capacity:</span>
                        <span>1 person</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Available:</span>
                        <span>2 rooms</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Double Sharing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Base Price:</span>
                        <span>₹8,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capacity:</span>
                        <span>2 persons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Available:</span>
                        <span>4 rooms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Room Dialog */}
      <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Number</label>
                <Input placeholder="Enter room number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Sharing</SelectItem>
                    <SelectItem value="double">Double Sharing</SelectItem>
                    <SelectItem value="triple">Triple Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price per Month</label>
              <Input type="number" placeholder="Enter price" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">AC</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Attached Bathroom</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Wifi</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">TV</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddRoom(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-hostel-primary hover:bg-hostel-secondary"
                onClick={() => setShowAddRoom(false)}
              >
                Add Room
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomManagement; 