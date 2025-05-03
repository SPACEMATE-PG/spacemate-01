
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const AdminRooms = () => {
  const [filter, setFilter] = useState<"all" | "available" | "occupied">("all");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    type: "single",
    capacity: "1",
    price: "",
  });
  const { toast } = useToast();
  
  const filteredRooms = rooms.filter(room => {
    if (filter === "available") return room.available;
    if (filter === "occupied") return !room.available;
    return true;
  });

  const handleAddRoom = () => {
    setIsAddRoomOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!newRoom.roomNumber || !newRoom.price) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Add room logic would go here in a real app with backend
    toast({
      title: "Room Added",
      description: `Room ${newRoom.roomNumber} has been added successfully`,
    });

    // Reset form and close dialog
    setNewRoom({
      roomNumber: "",
      type: "single",
      capacity: "1",
      price: "",
    });
    setIsAddRoomOpen(false);
  };

  const handleViewRoomDetails = (roomId: string) => {
    toast({
      title: "Room Details",
      description: `Viewing details for room ID: ${roomId}`,
    });
  };

  const handleEditRoom = (roomId: string) => {
    toast({
      title: "Edit Room",
      description: `Editing room ID: ${roomId}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Rooms</h1>
        <Button 
          className="bg-hostel-primary hover:bg-hostel-secondary"
          onClick={handleAddRoom}
        >
          Add New Room
        </Button>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-hostel-primary hover:bg-hostel-secondary" : ""}
        >
          All Rooms
        </Button>
        <Button
          variant={filter === "available" ? "default" : "outline"}
          onClick={() => setFilter("available")}
          className={filter === "available" ? "bg-hostel-primary hover:bg-hostel-secondary" : ""}
        >
          Available
        </Button>
        <Button
          variant={filter === "occupied" ? "default" : "outline"}
          onClick={() => setFilter("occupied")}
          className={filter === "occupied" ? "bg-hostel-primary hover:bg-hostel-secondary" : ""}
        >
          Occupied
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Room List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRooms.map(room => (
              <div key={room.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-medium">Room {room.roomNumber}</h2>
                    <p className="text-sm text-gray-500">{room.type}</p>
                  </div>
                  <Badge variant={room.available ? "outline" : "secondary"}>
                    {room.available ? "Available" : "Occupied"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Capacity: </span>
                    <span>{room.capacity} person{room.capacity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Occupied: </span>
                    <span>{room.occupied} person{room.occupied > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Price: </span>
                    <span>₹{room.price}/month</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewRoomDetails(room.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditRoom(room.id)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Room Dialog */}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomNumber" className="text-right">
                Room No
              </Label>
              <Input
                id="roomNumber"
                name="roomNumber"
                value={newRoom.roomNumber}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={newRoom.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="triple">Triple</SelectItem>
                  <SelectItem value="quad">Quad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Select
                value={newRoom.capacity}
                onValueChange={(value) => handleSelectChange("capacity", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4">4 People</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                name="price"
                value={newRoom.price}
                onChange={handleInputChange}
                type="number"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRooms;
