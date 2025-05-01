
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const AdminRooms = () => {
  const [filter, setFilter] = useState<"all" | "available" | "occupied">("all");
  
  const filteredRooms = rooms.filter(room => {
    if (filter === "available") return room.available;
    if (filter === "occupied") return !room.available;
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Rooms</h1>
        <Button className="bg-hostel-primary hover:bg-hostel-secondary">
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
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRooms;
