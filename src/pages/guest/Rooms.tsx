
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { rooms } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const GuestRooms = () => {
  const { currentUser } = useAuth();
  
  // Find the user's room
  const userRoom = rooms.find(room => room.roomNumber === currentUser?.roomNumber);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Room</h1>
      
      {userRoom ? (
        <Card>
          <CardHeader>
            <CardTitle>Room {userRoom.roomNumber}</CardTitle>
            <CardDescription>{userRoom.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden h-48 mb-4">
              <img 
                src={userRoom.images[0]} 
                alt={userRoom.type} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Room Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Room Type: </span>
                    <span>{userRoom.type}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Capacity: </span>
                    <span>{userRoom.capacity} person{userRoom.capacity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Rent: </span>
                    <span>₹{userRoom.price}/month</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">Amenities</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {userRoom.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-hostel-primary mr-2"></div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Room information not available.</p>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Room Service</CardTitle>
          <CardDescription>Request services for your room</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border rounded-md text-center hover:bg-gray-50">
              <span className="block text-lg mb-1">🧹</span>
              <span className="text-sm">Cleaning</span>
            </button>
            <button className="p-4 border rounded-md text-center hover:bg-gray-50">
              <span className="block text-lg mb-1">🔧</span>
              <span className="text-sm">Maintenance</span>
            </button>
            <button className="p-4 border rounded-md text-center hover:bg-gray-50">
              <span className="block text-lg mb-1">🩺</span>
              <span className="text-sm">Medical Help</span>
            </button>
            <button className="p-4 border rounded-md text-center hover:bg-gray-50">
              <span className="block text-lg mb-1">📦</span>
              <span className="text-sm">Package</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestRooms;
