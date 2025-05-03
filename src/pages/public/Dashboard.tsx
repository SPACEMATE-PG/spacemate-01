
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hostel, rooms } from "@/data/mockData";
import { Room } from "@/types";
import { Search, MapPin, Star, Bed, ArrowRight } from "lucide-react";

const PublicDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const availableRooms = rooms.filter(room => room.available);
  const filteredRooms = searchQuery
    ? availableRooms.filter(room => 
        room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.roomNumber.includes(searchQuery)
      )
    : availableRooms;

  const navigateToRoom = (roomId: string) => {
    navigate(`/public/rooms/${roomId}`);
  };

  return (
    <div className="space-y-6 pb-16 animate-slide-up">
      {/* Hero Section */}
      <div className="relative -mx-4 mb-8">
        <div className="h-64 bg-gradient-to-r from-hostel-primary to-hostel-secondary rounded-b-3xl flex items-end overflow-hidden">
          <img 
            src={hostel.images[0]} 
            alt="Hostel" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
          />
          <div className="relative z-10 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
            <div className="flex items-center text-sm mb-4">
              <MapPin size={14} className="mr-1" />
              <span>{hostel.address}, {hostel.city}</span>
              <div className="ml-3 flex items-center">
                <Star size={14} className="fill-white mr-1" />
                <span>{hostel.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mx-4 -mt-6 relative z-20">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for rooms..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Available Rooms */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
        
        {filteredRooms.length > 0 ? (
          <div className="space-y-4">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} onClick={() => navigateToRoom(room.id)} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500 mb-4">No rooms matching your search criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Hostel Amenities */}
      <div>
        <h2 className="text-xl font-bold mb-4">Hostel Amenities</h2>
        <div className="grid grid-cols-2 gap-3">
          {hostel.amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="bg-white p-3 rounded-lg shadow-sm border flex items-center"
            >
              <div className="w-8 h-8 rounded-full bg-hostel-muted flex items-center justify-center mr-3">
                <Bed size={16} className="text-hostel-primary" />
              </div>
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <Card className="bg-hostel-muted border-none mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Looking for a comfortable stay?</h3>
          <p className="text-gray-600 mb-4">Book your room now and enjoy all our premium amenities.</p>
          <Button 
            className="w-full bg-hostel-primary hover:bg-hostel-secondary"
            onClick={() => navigate('/public/rooms')}
          >
            Browse All Rooms <ArrowRight size={16} className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Room Card Component
const RoomCard = ({ room, onClick }: { room: Room; onClick: () => void }) => (
  <Card className="overflow-hidden card-hover">
    <div className="flex h-32 cursor-pointer" onClick={onClick}>
      <div className="w-32 h-full">
        <img 
          src={room.images[0]} 
          alt={`Room ${room.roomNumber}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="flex-1 p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{room.type}</h3>
            <p className="text-sm text-gray-500">Room {room.roomNumber}</p>
          </div>
          <p className="font-bold text-hostel-primary">₹{room.price}<span className="text-xs font-normal text-gray-500">/month</span></p>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {room.amenities.slice(0, 2).map((amenity, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              +{room.amenities.length - 2} more
            </span>
          )}
        </div>
        
        <Button 
          size="sm" 
          variant="link" 
          className="h-auto p-0 mt-2 text-hostel-primary"
        >
          View Details
        </Button>
      </CardContent>
    </div>
  </Card>
);

export default PublicDashboard;
