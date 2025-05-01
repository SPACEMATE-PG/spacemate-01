
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { payments, meals, notifications } from "@/data/mockData";
import { format, isToday } from "date-fns";
import { CalendarRange, Clock, Utensils, CreditCard, Bell, ArrowUpRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

const GuestDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  
  // Filter today's meals
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const todayMeals = meals.filter(meal => meal.date === todayStr);
  
  // Get user's payment history
  const userPayments = payments.filter(payment => payment.userId === currentUser?.id);
  const pendingPayment = userPayments.find(payment => payment.status === "pending");
  
  // Get user's unread notifications
  const userNotifications = notifications.filter(
    notif => notif.userId === currentUser?.id && !notif.read
  );
  
  // Get next meal
  const getNextMeal = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 9) return todayMeals.find(meal => meal.mealType === "breakfast");
    if (currentHour < 14) return todayMeals.find(meal => meal.mealType === "lunch");
    return todayMeals.find(meal => meal.mealType === "dinner");
  };
  
  const nextMeal = getNextMeal();
  
  // Calculate days left in subscription
  const calculateDaysLeft = () => {
    if (!currentUser?.endDate) return 0;
    const endDate = new Date(currentUser.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const daysLeft = calculateDaysLeft();
  const totalDays = 30; // Assuming monthly subscription
  const progress = Math.max(0, Math.min(100, ((totalDays - daysLeft) / totalDays) * 100));
  
  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgressValue(progress);
    }, 300);
    
    // Hide welcome message after 5 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
    };
  }, [progress]);
  
  const getMealTime = (mealType: string) => {
    switch (mealType) {
      case "breakfast": return "7:00 AM - 9:00 AM";
      case "lunch": return "12:00 PM - 2:00 PM";
      case "dinner": return "7:00 PM - 9:00 PM";
      default: return "";
    }
  };
  
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "payment":
        if (pendingPayment) {
          toast({
            title: "Payment Initiated",
            description: "Redirecting to payment gateway...",
          });
        }
        break;
      case "attendance":
        toast({
          title: "Attendance Marked",
          description: "Your attendance has been recorded for today.",
        });
        break;
      case "laundry":
        toast({
          title: "Laundry Service Requested",
          description: "Your request has been sent to the admin.",
        });
        break;
    }
  };
  
  return (
    <div className="space-y-6">
      {showWelcomeMessage && (
        <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white p-4 rounded-lg shadow-md animate-fade-in flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Welcome back, {currentUser?.name?.split(" ")[0]}!</h2>
            <p className="text-sm opacity-90">We hope you have a great day ahead.</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setShowWelcomeMessage(false)}
          >
            <Bell size={18} />
          </Button>
        </div>
      )}
      
      <div className="grid gap-4 mb-6">
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white p-5 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-sm opacity-90">Your Room</h3>
                  <p className="text-2xl font-bold">{currentUser?.roomNumber}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Home size={24} />
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Subscription period</span>
                <span className="text-sm font-medium">{daysLeft} days left</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-sm">
                  <p className="text-gray-500">From</p>
                  <p className="font-medium">{currentUser?.joinDate}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">To</p>
                  <p className="font-medium">{currentUser?.endDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {nextMeal && (
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  <Utensils size={16} className="mr-2 text-hostel-primary" />
                  Next Meal
                </CardTitle>
                <CardDescription>
                  {format(today, "EEEE, MMMM do")}
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs flex gap-1 h-8"
                onClick={() => navigate("/guest/meals")}
              >
                View All <ArrowUpRight size={12} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-hostel-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="capitalize font-medium text-lg">{nextMeal.mealType}</h3>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock size={12} className="mr-1" />
                    {getMealTime(nextMeal.mealType)}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => {
                    toast({
                      title: `${nextMeal.mealType} Confirmed`,
                      description: "Your attendance has been recorded",
                    });
                  }}
                >
                  I'll Attend
                </Button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm">{nextMeal.menu}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {pendingPayment && (
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  <CreditCard size={16} className="mr-2 text-amber-500" />
                  Payment Due
                </CardTitle>
                <CardDescription>
                  Due on {pendingPayment.date}
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{pendingPayment.amount}</p>
                <p className="text-xs text-amber-500">PENDING</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">{pendingPayment.description}</p>
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600"
              onClick={() => handleQuickAction("payment")}
            >
              Pay Now
            </Button>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          <button 
            className="flex flex-col items-center bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleQuickAction("attendance")}
          >
            <div className="bg-hostel-muted w-10 h-10 rounded-full flex items-center justify-center mb-1">
              <CalendarRange size={18} className="text-hostel-primary" />
            </div>
            <span className="text-xs text-center">Attendance</span>
          </button>
          <button 
            className="flex flex-col items-center bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleQuickAction("laundry")}
          >
            <div className="bg-hostel-muted w-10 h-10 rounded-full flex items-center justify-center mb-1">
              <Clock size={18} className="text-hostel-primary" />
            </div>
            <span className="text-xs text-center">Laundry</span>
          </button>
          <button 
            className="flex flex-col items-center bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            onClick={() => navigate("/guest/rooms")}
          >
            <div className="bg-hostel-muted w-10 h-10 rounded-full flex items-center justify-center mb-1">
              <Home size={18} className="text-hostel-primary" />
            </div>
            <span className="text-xs text-center">My Room</span>
          </button>
          <button 
            className="flex flex-col items-center bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            onClick={() => navigate("/guest/notifications")}
          >
            <div className="bg-hostel-muted w-10 h-10 rounded-full flex items-center justify-center mb-1 relative">
              <Bell size={18} className="text-hostel-primary" />
              {userNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {userNotifications.length}
                </span>
              )}
            </div>
            <span className="text-xs text-center">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
