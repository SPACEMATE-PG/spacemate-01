
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const PublicRooms = () => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    availability: "all",
    priceMin: "",
    priceMax: "",
    capacity: "all",
  });
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };
  
  // Apply filters
  const filteredRooms = rooms.filter(room => {
    // Availability filter
    if (filters.availability === "available" && !room.available) return false;
    if (filters.availability === "occupied" && room.available) return false;
    
    // Price range filter
    const minPrice = filters.priceMin ? parseInt(filters.priceMin) : 0;
    const maxPrice = filters.priceMax ? parseInt(filters.priceMax) : Infinity;
    if (room.price < minPrice || room.price > maxPrice) return false;
    
    // Capacity filter
    if (filters.capacity !== "all" && room.capacity !== parseInt(filters.capacity)) return false;
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Available Rooms</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select 
                value={filters.availability}
                onValueChange={(value) => handleFilterChange("availability", value)}
              >
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="available">Available Only</SelectItem>
                  <SelectItem value="occupied">Occupied Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Select 
                value={filters.capacity}
                onValueChange={(value) => handleFilterChange("capacity", value)}
              >
                <SelectTrigger id="capacity">
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Capacity</SelectItem>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 Persons</SelectItem>
                  <SelectItem value="3">3 Persons</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priceMin">Min Price (₹)</Label>
              <Input 
                id="priceMin" 
                type="number"
                placeholder="Min price"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange("priceMin", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priceMax">Max Price (₹)</Label>
              <Input 
                id="priceMax" 
                type="number"
                placeholder="Max price"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange("priceMax", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRooms.map(room => (
          <Card 
            key={room.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/public/rooms/${room.id}`)}
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={room.images[0]} 
                alt={room.type} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium">{room.type}</h2>
                  <p className="text-sm text-gray-500">Room {room.roomNumber}</p>
                </div>
                <Badge variant={room.available ? "default" : "outline"}>
                  {room.available ? "Available" : "Occupied"}
                </Badge>
              </div>
              
              <div className="mt-2">
                <p className="text-sm">
                  <span className="text-gray-500">Capacity:</span> {room.capacity} person{room.capacity > 1 ? 's' : ''}
                </p>
                <p className="font-bold mt-2">₹{room.price}/month</p>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
                {room.amenities.length > 3 && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    +{room.amenities.length - 3} more
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No rooms matching your filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({
                availability: "all",
                priceMin: "",
                priceMax: "",
                capacity: "all",
              })}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Add Badge component since it might be missing from the generated imports
const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "outline" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  
  const variantClasses = {
    default: "bg-green-100 text-green-800",
    outline: "bg-transparent border border-gray-300 text-gray-700",
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default PublicRooms;
