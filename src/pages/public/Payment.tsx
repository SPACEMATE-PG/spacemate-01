
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rooms } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const room = rooms.find(r => r.id === id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  
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
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed. The admin will contact you shortly.",
      });
      
      navigate("/public");
    }, 2000);
  };
  
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
          <CardTitle>Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <h2 className="font-medium">{room.type}</h2>
              <p className="text-gray-500">Room {room.roomNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-bold text-lg">₹{room.price * 2}</p>
            </div>
          </div>
          
          <div className="mb-6 space-y-4">
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className={paymentMethod === "card" ? "bg-hostel-primary hover:bg-hostel-secondary" : ""}
              >
                Credit/Debit Card
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "upi" ? "default" : "outline"}
                onClick={() => setPaymentMethod("upi")}
                className={paymentMethod === "upi" ? "bg-hostel-primary hover:bg-hostel-secondary" : ""}
              >
                UPI
              </Button>
            </div>
          </div>
          
          {paymentMethod === "card" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" required placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" required placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" required placeholder="123" />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full mt-4 bg-hostel-primary hover:bg-hostel-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay ₹" + (room.price * 2)}
              </Button>
            </form>
          )}
          
          {paymentMethod === "upi" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" required placeholder="name@upi" />
              </div>
              
              <Button 
                type="submit"
                className="w-full mt-4 bg-hostel-primary hover:bg-hostel-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay ₹" + (room.price * 2)}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
