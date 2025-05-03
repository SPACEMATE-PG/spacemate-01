
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { rooms } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Bed, Wrench, Package, Stethoscope } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const GuestRooms = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  
  // Find the user's room
  const userRoom = rooms.find(room => room.roomNumber === currentUser?.roomNumber);
  
  const handleServiceRequest = (serviceType: string) => {
    setActiveService(serviceType);
    setIsServiceOpen(true);
  };

  const submitServiceRequest = () => {
    toast({
      title: "Service Requested",
      description: `Your ${activeService} request has been submitted successfully.`,
    });
    setIsServiceOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Room</h1>
      
      {userRoom ? (
        <Card className="animate-fade-in">
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
            <Button 
              variant="outline" 
              className="p-6 flex flex-col items-center justify-center hover-scale" 
              onClick={() => handleServiceRequest('cleaning')}
            >
              <Bed className="h-6 w-6 mb-2 text-hostel-primary" />
              <span className="text-sm">Cleaning</span>
            </Button>
            <Button 
              variant="outline" 
              className="p-6 flex flex-col items-center justify-center hover-scale" 
              onClick={() => handleServiceRequest('maintenance')}
            >
              <Wrench className="h-6 w-6 mb-2 text-hostel-primary" />
              <span className="text-sm">Maintenance</span>
            </Button>
            <Button 
              variant="outline" 
              className="p-6 flex flex-col items-center justify-center hover-scale" 
              onClick={() => handleServiceRequest('medical help')}
            >
              <Stethoscope className="h-6 w-6 mb-2 text-hostel-primary" />
              <span className="text-sm">Medical Help</span>
            </Button>
            <Button 
              variant="outline" 
              className="p-6 flex flex-col items-center justify-center hover-scale" 
              onClick={() => handleServiceRequest('package')}
            >
              <Package className="h-6 w-6 mb-2 text-hostel-primary" />
              <span className="text-sm">Package</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Request Dialog */}
      <Dialog open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{activeService} Service Request</DialogTitle>
            <DialogDescription>
              Please provide details for your {activeService} request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea 
                id="description" 
                className="w-full p-2 border rounded-md min-h-[100px]" 
                placeholder={`Describe what ${activeService} service you need...`}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="preferred-time" className="text-sm font-medium">Preferred Time</label>
              <select 
                id="preferred-time" 
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a preferred time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 8PM)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsServiceOpen(false)}>Cancel</Button>
            <Button onClick={submitServiceRequest}>Submit Request</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestRooms;
