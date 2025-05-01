
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { payments, meals } from "@/data/mockData";
import { format } from "date-fns";

const GuestDashboard = () => {
  const { currentUser } = useAuth();
  
  // Filter today's meals
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const todayMeals = meals.filter(meal => meal.date === todayStr);
  
  // Get user's payment history
  const userPayments = payments.filter(payment => payment.userId === currentUser?.id);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Room Number:</span>
              <span className="font-medium">{currentUser?.roomNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Join Date:</span>
              <span className="font-medium">{currentUser?.joinDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">End Date:</span>
              <span className="font-medium">{currentUser?.endDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Today's Menu</CardTitle>
          <CardDescription>
            {format(today, "EEEE, MMMM do")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todayMeals.length > 0 ? (
            <div className="space-y-4">
              {todayMeals.map(meal => (
                <div key={meal.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <h3 className="capitalize font-medium">{meal.mealType}</h3>
                    <Button variant="outline" size="sm">
                      {meal.mealType === "breakfast" ? "7-9 AM" : 
                       meal.mealType === "lunch" ? "12-2 PM" : "7-9 PM"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{meal.menu}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No meals scheduled for today.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {userPayments.length > 0 ? (
            <div className="space-y-2">
              {userPayments.map(payment => (
                <div key={payment.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{payment.amount}</p>
                    <p className={`text-xs ${payment.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
                      {payment.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent payments.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestDashboard;
