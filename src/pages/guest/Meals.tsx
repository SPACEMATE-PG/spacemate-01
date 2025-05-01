
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meals, mealResponses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { format, addDays, startOfToday } from "date-fns";

const GuestMeals = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Generate next 7 days for meal planning
  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));
  
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const selectedDayMeals = meals.filter(meal => meal.date === formattedSelectedDate);
  
  // Get user's meal responses
  const userResponses = mealResponses.filter(response => response.userId === currentUser?.id);
  
  const getMealResponse = (mealId: string) => {
    const response = userResponses.find(resp => resp.mealId === mealId);
    return response?.response || "pending";
  };
  
  const handleMealResponse = (mealId: string, response: "yes" | "no") => {
    console.log(`Meal ID: ${mealId}, Response: ${response}`);
    // In a real app, this would update the backend
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meal Planner</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {nextDays.map((date, idx) => (
              <div 
                key={idx} 
                className={`flex-shrink-0 w-16 text-center p-2 border rounded-md cursor-pointer ${
                  format(date, "yyyy-MM-dd") === formattedSelectedDate 
                    ? "border-hostel-primary bg-hostel-muted" 
                    : "hover:border-gray-400"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="font-medium">{format(date, "EEE")}</div>
                <div className="text-lg">{format(date, "d")}</div>
                <div className="text-xs text-gray-500">{format(date, "MMM")}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-xl font-bold mb-4">
          Meals for {format(selectedDate, "EEEE, MMMM do")}
        </h2>
        
        {selectedDayMeals.length > 0 ? (
          <div className="space-y-4">
            {selectedDayMeals.map(meal => (
              <Card key={meal.id}>
                <CardHeader>
                  <CardTitle className="capitalize">{meal.mealType}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{meal.menu}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {meal.mealType === "breakfast" ? "7:00 AM - 9:00 AM" : 
                       meal.mealType === "lunch" ? "12:00 PM - 2:00 PM" : 
                       "7:00 PM - 9:00 PM"}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant={getMealResponse(meal.id) === "yes" ? "default" : "outline"}
                        size="sm"
                        className={getMealResponse(meal.id) === "yes" ? "bg-green-600 hover:bg-green-700" : ""}
                        onClick={() => handleMealResponse(meal.id, "yes")}
                      >
                        I'll eat
                      </Button>
                      <Button
                        variant={getMealResponse(meal.id) === "no" ? "default" : "outline"}
                        size="sm"
                        className={getMealResponse(meal.id) === "no" ? "bg-red-600 hover:bg-red-700" : ""}
                        onClick={() => handleMealResponse(meal.id, "no")}
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No meals planned for this day.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GuestMeals;
