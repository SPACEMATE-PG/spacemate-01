
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meals, mealResponses } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays, startOfWeek } from "date-fns";

const AdminMeals = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Generate a week of dates starting from the current date
  const weekDates = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfWeek(new Date()), i)
  );
  
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const selectedDayMeals = meals.filter(meal => meal.date === formattedSelectedDate);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meal Management</h1>
        <Button className="bg-hostel-primary hover:bg-hostel-secondary">
          Create Meal Plan
        </Button>
      </div>
      
      <Tabs defaultValue="day" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="day">Day View</TabsTrigger>
          <TabsTrigger value="week">Week View</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <input 
                type="date" 
                className="border rounded p-2 w-full"
                value={formattedSelectedDate}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">
              Meals for {format(selectedDate, "EEEE, MMMM do")}
            </h2>
            
            {selectedDayMeals.length > 0 ? (
              <div className="space-y-4">
                {selectedDayMeals.map(meal => (
                  <Card key={meal.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        <span className="capitalize">{meal.mealType}</span>
                        <Badge variant={meal.isActive ? "default" : "outline"}>
                          {meal.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{meal.menu}</p>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Edit Menu</Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                        >
                          View Responses
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No meals planned for this day.</p>
                  <Button className="mt-4 bg-hostel-primary hover:bg-hostel-secondary">
                    Add Meal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Week Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date, idx) => (
                  <div 
                    key={idx} 
                    className={`text-center border rounded-md p-2 cursor-pointer hover:border-hostel-primary ${
                      format(date, "yyyy-MM-dd") === formattedSelectedDate ? "border-hostel-primary bg-hostel-muted" : ""
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="font-medium">{format(date, "EEE")}</div>
                    <div>{format(date, "d")}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Breakfast</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, idx) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const breakfast = meals.find(m => m.date === dateStr && m.mealType === "breakfast");
                    
                    return (
                      <div key={idx} className="border rounded-md p-2 text-sm h-20 overflow-hidden">
                        {breakfast ? (
                          <>
                            <div className="text-xs text-gray-500 truncate">{breakfast.menu}</div>
                            <Button variant="link" className="p-0 h-auto text-hostel-primary">Edit</Button>
                          </>
                        ) : (
                          <Button variant="link" className="p-0 h-auto text-hostel-primary">+ Add</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <h3 className="font-medium">Lunch</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, idx) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const lunch = meals.find(m => m.date === dateStr && m.mealType === "lunch");
                    
                    return (
                      <div key={idx} className="border rounded-md p-2 text-sm h-20 overflow-hidden">
                        {lunch ? (
                          <>
                            <div className="text-xs text-gray-500 truncate">{lunch.menu}</div>
                            <Button variant="link" className="p-0 h-auto text-hostel-primary">Edit</Button>
                          </>
                        ) : (
                          <Button variant="link" className="p-0 h-auto text-hostel-primary">+ Add</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <h3 className="font-medium">Dinner</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, idx) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const dinner = meals.find(m => m.date === dateStr && m.mealType === "dinner");
                    
                    return (
                      <div key={idx} className="border rounded-md p-2 text-sm h-20 overflow-hidden">
                        {dinner ? (
                          <>
                            <div className="text-xs text-gray-500 truncate">{dinner.menu}</div>
                            <Button variant="link" className="p-0 h-auto text-hostel-primary">Edit</Button>
                          </>
                        ) : (
                          <Button variant="link" className="p-0 h-auto text-hostel-primary">+ Add</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add Badge component since it might be missing from the generated imports
const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "secondary" | "outline" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  
  const variantClasses = {
    default: "bg-hostel-primary text-white",
    secondary: "bg-hostel-secondary text-white",
    outline: "bg-transparent border border-gray-300 text-gray-700",
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default AdminMeals;
