
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rooms } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const BookingForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const room = rooms.find(r => r.id === id);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    duration: "1",
    startDate: "",
    idProof: "",
    occupation: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    console.log("Booking data:", { ...formData, roomId: id });
    
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been sent to the admin for approval.",
    });
    
    // Navigate to payment
    navigate(`/public/payment/${id}`);
  };
  
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
      
      <Card>
        <CardHeader>
          <CardTitle>Book Room {room.roomNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <h2 className="font-medium">{room.type}</h2>
              <p className="text-gray-500">Room {room.roomNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Monthly Rent</p>
              <p className="font-bold text-lg">₹{room.price}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idProof">ID Proof (Aadhar/PAN)</Label>
                <Input 
                  id="idProof" 
                  name="idProof" 
                  value={formData.idProof} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input 
                  id="occupation" 
                  name="occupation" 
                  value={formData.occupation} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Stay Duration (months)</Label>
                <Select 
                  value={formData.duration} 
                  onValueChange={(value) => handleSelectChange("duration", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Room Rent (1 month)</span>
                <span>₹{room.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Security Deposit</span>
                <span>₹{room.price}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span>₹{room.price * 2}</span>
              </div>
              
              <Button 
                type="submit"
                className="w-full mt-4 bg-hostel-primary hover:bg-hostel-secondary"
              >
                Proceed to Payment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
