
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Meal } from "@/types";
import { format } from "date-fns";

interface MealFormProps {
  initialData?: Partial<Meal>;
  onSubmit: (data: Partial<Meal>) => void;
  onCancel: () => void;
}

const MealForm = ({ initialData, onSubmit, onCancel }: MealFormProps) => {
  const [mealData, setMealData] = useState<Partial<Meal>>(
    initialData || {
      date: format(new Date(), "yyyy-MM-dd"),
      mealType: "breakfast",
      menu: "",
      isActive: true
    }
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMealData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setMealData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setMealData(prev => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mealData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={mealData.date}
          onChange={handleTextChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mealType">Meal Type</Label>
        <Select
          value={mealData.mealType}
          onValueChange={(value) => handleSelectChange("mealType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="menu">Menu Details</Label>
        <textarea
          id="menu"
          name="menu"
          className="w-full border rounded-md p-2 min-h-[100px]"
          value={mealData.menu}
          onChange={handleTextChange}
          placeholder="Enter detailed menu items..."
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={mealData.isActive}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-hostel-primary hover:bg-hostel-secondary">
          {initialData ? "Update Meal" : "Add Meal"}
        </Button>
      </div>
    </form>
  );
};

export default MealForm;
