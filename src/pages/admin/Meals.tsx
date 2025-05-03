
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meals, mealResponses } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays, startOfWeek, parse, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Meal } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import MealForm from "@/components/admin/MealForm";
import { cn } from "@/lib/utils";

const AdminMeals = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [localMeals, setLocalMeals] = useState<Meal[]>(meals);
  const [isCreateMealOpen, setIsCreateMealOpen] = useState(false);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const { toast } = useToast();
  
  // Generate a week of dates starting from the current date
  const weekDates = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfWeek(new Date()), i)
  );
  
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const selectedDayMeals = localMeals.filter(meal => meal.date === formattedSelectedDate);

  const handleCreateMealPlan = () => {
    setIsCreateMealOpen(true);
  };

  const handleAddMeal = () => {
    setEditingMeal(null);
    setIsAddMealOpen(true);
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setIsAddMealOpen(true);
  };

  const handleViewResponses = (mealId: string) => {
    const responses = mealResponses.filter(response => response.mealId === mealId);
    
    toast({
      title: "Meal Responses",
      description: `${responses.length} guests have responded to this meal.`,
    });
  };

  const handleMealSubmit = (data: Partial<Meal>) => {
    if (editingMeal) {
      // Update existing meal
      setLocalMeals(prev => 
        prev.map(meal => 
          meal.id === editingMeal.id 
            ? { ...meal, ...data } 
            : meal
        )
      );
      
      toast({
        title: "Meal Updated",
        description: `${data.mealType} meal for ${data.date} has been updated.`,
      });
    } else {
      // Add new meal
      const newMeal = {
        id: `meal-${Date.now()}`,
        date: data.date || format(new Date(), "yyyy-MM-dd"),
        mealType: data.mealType as "breakfast" | "lunch" | "dinner",
        menu: data.menu || "",
        isActive: data.isActive || true
      };
      
      setLocalMeals(prev => [...prev, newMeal]);
      
      toast({
        title: "Meal Added",
        description: `${newMeal.mealType} meal for ${newMeal.date} has been added.`,
      });
    }
    
    setIsAddMealOpen(false);
  };

  const handleCreateMealPlanSubmit = (data: Partial<Meal>) => {
    // In a real app, this would create a meal plan for a week or month
    toast({
      title: "Meal Plan Created",
      description: "New meal plan has been created successfully.",
    });
    
    setIsCreateMealOpen(false);
  };

  // Helper function to find a meal for a specific date and type
  const findMeal = (date: Date, type: "breakfast" | "lunch" | "dinner") => {
    const dateStr = format(date, "yyyy-MM-dd");
    return localMeals.find(m => m.date === dateStr && m.mealType === type);
  };

  // Helper function to add a quick meal from the week view
  const handleQuickAddMeal = (date: Date, type: "breakfast" | "lunch" | "dinner") => {
    setSelectedDate(date);
    setEditingMeal(null);
    setIsAddMealOpen(true);
    
    // Pre-fill the form with the date and meal type
    const initialData = {
      date: format(date, "yyyy-MM-dd"),
      mealType: type,
    };
    
    setEditingMeal(initialData as any);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meal Management</h1>
        <Button 
          className="bg-hostel-primary hover:bg-hostel-secondary"
          onClick={handleCreateMealPlan}
        >
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "EEEE, MMMM do, yyyy")}
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
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Meals for {format(selectedDate, "EEEE, MMMM do")}
              </h2>
              <Button 
                onClick={handleAddMeal}
                className="bg-hostel-primary hover:bg-hostel-secondary flex items-center gap-1"
              >
                <Plus size={16} />
                Add Meal
              </Button>
            </div>
            
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditMeal(meal)}
                        >
                          Edit Menu
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleViewResponses(meal.id)}
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
                  <Button 
                    className="mt-4 bg-hostel-primary hover:bg-hostel-secondary"
                    onClick={handleAddMeal}
                  >
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
                    className={cn(
                      "text-center border rounded-md p-2 cursor-pointer hover:border-hostel-primary",
                      isSameDay(date, selectedDate) ? "border-hostel-primary bg-hostel-muted" : ""
                    )}
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
                    const breakfast = findMeal(date, "breakfast");
                    
                    return (
                      <div key={idx} className="border rounded-md p-2 text-sm h-24 overflow-hidden">
                        {breakfast ? (
                          <>
                            <div className={cn(
                              "text-xs mb-1 p-1 rounded text-white text-center",
                              breakfast.isActive ? "bg-green-500" : "bg-gray-400"
                            )}>
                              {breakfast.isActive ? "Active" : "Inactive"}
                            </div>
                            <div className="text-xs text-gray-500 truncate mb-1">{breakfast.menu}</div>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-hostel-primary"
                              onClick={() => handleEditMeal(breakfast)}
                            >
                              Edit
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-hostel-primary"
                            onClick={() => handleQuickAddMeal(date, "breakfast")}
                          >
                            + Add
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <h3 className="font-medium">Lunch</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, idx) => {
                    const lunch = findMeal(date, "lunch");
                    
                    return (
                      <div key={idx} className="border rounded-md p-2 text-sm h-24 overflow-hidden">
                        {lunch ? (
                          <>
                            <div className={cn(
                              "text-xs mb-1 p-1 rounded text-white text-center",
                              lunch.isActive ? "bg-green-500" : "bg-gray-400"
                            )}>
                              {lunch.isActive ? "Active" : "Inactive"}
                            </div>
                            <div className="text-xs text-gray-500 truncate mb-1">{lunch.menu}</div>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-hostel-primary"
                              onClick={() => handleEditMeal(lunch)}
                            >
                              Edit
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-hostel-primary"
                            onClick={() => handleQuickAddMeal(date, "lunch")}
                          >
                            + Add
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <h3 className="font-medium">Dinner</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, idx) => {
                    const dinner = findMeal(date, "dinner");
                    
                    return (
                      <div key={idx} className="border rounded-md p-2 text-sm h-24 overflow-hidden">
                        {dinner ? (
                          <>
                            <div className={cn(
                              "text-xs mb-1 p-1 rounded text-white text-center",
                              dinner.isActive ? "bg-green-500" : "bg-gray-400"
                            )}>
                              {dinner.isActive ? "Active" : "Inactive"}
                            </div>
                            <div className="text-xs text-gray-500 truncate mb-1">{dinner.menu}</div>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-hostel-primary"
                              onClick={() => handleEditMeal(dinner)}
                            >
                              Edit
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-hostel-primary"
                            onClick={() => handleQuickAddMeal(date, "dinner")}
                          >
                            + Add
                          </Button>
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

      {/* Dialog for creating a meal plan */}
      <Dialog open={isCreateMealOpen} onOpenChange={setIsCreateMealOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Meal Plan</DialogTitle>
          </DialogHeader>
          <MealForm
            onSubmit={handleCreateMealPlanSubmit}
            onCancel={() => setIsCreateMealOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog for adding or editing a single meal */}
      <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingMeal ? "Edit Meal" : "Add Meal"}</DialogTitle>
          </DialogHeader>
          <MealForm
            initialData={editingMeal || { date: formattedSelectedDate }}
            onSubmit={handleMealSubmit}
            onCancel={() => setIsAddMealOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMeals;
