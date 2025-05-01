
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { hostel, rooms } from "@/data/mockData";

const PublicDashboard = () => {
  const navigate = useNavigate();
  
  // Filter available rooms
  const availableRooms = rooms.filter(room => room.available);
  
  return (
    <div className="space-y-6">
      <div className="relative rounded-lg overflow-hidden h-48">
        <img 
          src={hostel.images[0]} 
          alt={hostel.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h1 className="text-2xl font-bold text-white">{hostel.name}</h1>
          <p className="text-white/80">{hostel.city}</p>
          <div className="flex items-center mt-1">
            <div className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-sm font-medium">
              {hostel.rating} ★
            </div>
            <span className="text-white/80 text-sm ml-2">
              {hostel.reviews.length} Reviews
            </span>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>About {hostel.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{hostel.description}</p>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Amenities:</h3>
            <div className="grid grid-cols-2 gap-2">
              {hostel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-hostel-primary mr-2"></div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Rooms</CardTitle>
          <CardDescription>
            {availableRooms.length} rooms available for booking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableRooms.slice(0, 3).map(room => (
              <div key={room.id} className="border rounded-md p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{room.type}</h3>
                  <p className="text-sm text-gray-500">Room {room.roomNumber}</p>
                  <p className="text-sm text-gray-500">{room.capacity} Bed{room.capacity > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{room.price}/month</p>
                  <Button 
                    size="sm" 
                    onClick={() => navigate(`/public/rooms/${room.id}`)}
                    className="mt-2 bg-hostel-primary hover:bg-hostel-secondary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            
            {availableRooms.length > 3 && (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/public/rooms')}
              >
                View All {availableRooms.length} Available Rooms
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>
            What our guests say about us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hostel.reviews.map(review => (
              <div key={review.id} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between">
                  <h3 className="font-medium">{review.userName}</h3>
                  <div className="text-yellow-500">{review.rating} ★</div>
                </div>
                <p className="text-gray-500 text-sm">{review.date}</p>
                <p className="mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicDashboard;
