
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meals, mealResponses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { format, addDays, startOfToday, isToday } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const GuestMeals = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [userResponses, setUserResponses] = useState(mealResponses.filter(response => response.userId === currentUser?.id));
  
  // Generate next 7 days for meal planning
  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));
  
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const selectedDayMeals = meals.filter(meal => meal.date === formattedSelectedDate && meal.isActive);
  
  const getMealResponse = (mealId: string) => {
    const response = userResponses.find(resp => resp.mealId === mealId);
    return response?.response || "pending";
  };
  
  const handleMealResponse = (mealId: string, response: "yes" | "no") => {
    // Update local state first for immediate feedback
    setUserResponses(prev => {
      const existingResponse = prev.find(resp => resp.mealId === mealId);
      
      if (existingResponse) {
        // Update existing response
        return prev.map(resp => 
          resp.mealId === mealId ? { ...resp, response } : resp
        );
      } else {
        // Create new response
        return [...prev, {
          id: `response-${Date.now()}`,
          userId: currentUser?.id || '',
          mealId,
          response,
          timestamp: new Date().toISOString()
        }];
      }
    });
    
    toast({
      title: response === "yes" ? "You'll be joining for the meal" : "You'll be skipping this meal",
      description: "Your response has been recorded",
    });
  };

  const getMealTimeDisplay = (mealType: string) => {
    switch(mealType) {
      case "breakfast": return "7:00 AM - 9:00 AM";
      case "lunch": return "12:00 PM - 2:00 PM";
      case "dinner": return "7:00 PM - 9:00 PM";
      default: return "";
    }
  };

  const getMealIcon = (mealType: string) => {
    switch(mealType) {
      case "breakfast": return "🍳";
      case "lunch": return "🍱";
      case "dinner": return "🍽️";
      default: return "🍽️";
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meal Planner</h1>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Card className="w-full md:w-auto">
          <CardContent className="p-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
              {nextDays.map((date, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex-shrink-0 w-16 text-center p-2 border rounded-md cursor-pointer transition-all",
                    format(date, "yyyy-MM-dd") === formattedSelectedDate 
                      ? "border-hostel-primary bg-hostel-muted" 
                      : "hover:border-gray-400",
                    isToday(date) && "ring-2 ring-hostel-primary ring-offset-2"
                  )}
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, "EEEE, MMMM do")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">
          Meals for {format(selectedDate, "EEEE, MMMM do")}
        </h2>
        
        {selectedDayMeals.length > 0 ? (
          <div className="space-y-4">
            {selectedDayMeals.map(meal => (
              <Card key={meal.id} className={cn(
                "overflow-hidden transition-all duration-300",
                getMealResponse(meal.id) === "yes" ? "border-l-4 border-l-green-500" :
                getMealResponse(meal.id) === "no" ? "border-l-4 border-l-red-500" : ""
              )}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getMealIcon(meal.mealType)}</span>
                      <CardTitle className="capitalize">{meal.mealType}</CardTitle>
                    </div>
                    {getMealResponse(meal.id) !== "pending" && (
                      <Badge variant={getMealResponse(meal.id) === "yes" ? "default" : "destructive"}>
                        {getMealResponse(meal.id) === "yes" ? "Attending" : "Skipping"}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{getMealTimeDisplay(meal.mealType)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 p-3 rounded-md mb-4">
                    <h3 className="font-medium text-sm text-slate-700 mb-2">Today's Menu</h3>
                    <p className="whitespace-pre-line text-sm">{meal.menu}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Please confirm your attendance</p>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant={getMealResponse(meal.id) === "yes" ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "transition-all",
                          getMealResponse(meal.id) === "yes" ? "bg-green-600 hover:bg-green-700" : ""
                        )}
                        onClick={() => handleMealResponse(meal.id, "yes")}
                      >
                        <Check className="h-4 w-4 mr-1" /> I'll eat
                      </Button>
                      <Button
                        variant={getMealResponse(meal.id) === "no" ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "transition-all",
                          getMealResponse(meal.id) === "no" ? "bg-red-600 hover:bg-red-700" : ""
                        )}
                        onClick={() => handleMealResponse(meal.id, "no")}
                      >
                        <X className="h-4 w-4 mr-1" /> Skip
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
              <span className="text-4xl">🍽️</span>
              <p className="text-gray-500 mt-2">No meals planned for this day.</p>
              <p className="text-sm text-gray-400 mt-1">Check back later or select another date.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GuestMeals;
