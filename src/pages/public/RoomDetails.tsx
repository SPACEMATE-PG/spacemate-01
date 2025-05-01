
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { rooms } from "@/data/mockData";
import { useState } from "react";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const room = rooms.find(r => r.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  
  if (!room) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Room not found</h1>
        <Button onClick={() => navigate("/public/rooms")}>
          Back to Rooms
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-2"
      >
        ← Back
      </Button>
      
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{room.type} - Room {room.roomNumber}</h1>
        
        {/* Room Images */}
        <div className="space-y-2">
          <div className="relative rounded-lg overflow-hidden h-64">
            <img 
              src={room.images[activeImage]} 
              alt={room.type} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {room.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {room.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                    index === activeImage ? "border-hostel-primary" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${room.type} image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Room Details</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Room Type:</span>
                  <span>{room.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Room Number:</span>
                  <span>{room.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Capacity:</span>
                  <span>{room.capacity} {room.capacity > 1 ? 'Persons' : 'Person'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available:</span>
                  <span className={room.available ? "text-green-500" : "text-red-500"}>
                    {room.available ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-bold">₹{room.price}/month</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-hostel-primary mr-2"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              
              {room.available && (
                <Button 
                  className="w-full mt-6 bg-hostel-primary hover:bg-hostel-secondary"
                  onClick={() => navigate(`/public/booking/${room.id}`)}
                >
                  Book Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
