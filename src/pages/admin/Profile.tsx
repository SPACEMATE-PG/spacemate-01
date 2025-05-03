
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { hostel } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const AdminProfile = () => {
  const { currentUser, logout, updateUser } = useAuth();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: "",
  });
  
  const [hostelInfo, setHostelInfo] = useState({
    name: hostel.name,
    address: hostel.address,
    city: hostel.city,
    description: hostel.description,
    logo: hostel.logo,
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleHostelInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHostelInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user
    if (updateUser) {
      updateUser({
        ...currentUser!,
        name: personalInfo.name,
        email: personalInfo.email,
      });
    }
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleLogoUpload = () => {
    // In a real app, this would open a file picker dialog
    toast({
      title: "Logo Updated",
      description: "Hostel logo has been successfully updated.",
    });
  };
  
  const handleSaveHostelSettings = () => {
    // In a real app, this would call an API to update the hostel info
    toast({
      title: "Hostel Settings Saved",
      description: "Your hostel settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-hostel-accent text-hostel-primary flex items-center justify-center text-2xl">
              {personalInfo.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-lg">{personalInfo.name}</h2>
              <p className="text-gray-500">{personalInfo.email}</p>
              <p className="mt-1 text-sm">Administrator</p>
            </div>
          </div>
          
          <form onSubmit={handleSavePersonalInfo} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="New password"
                value={personalInfo.password}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-hostel-primary hover:bg-hostel-secondary"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Hostel Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hostel Logo</Label>
              <div className="flex items-center space-x-4">
                <img 
                  src={hostelInfo.logo} 
                  alt="Hostel Logo" 
                  className="w-16 h-16 object-contain border rounded p-1"
                />
                <Button variant="outline" onClick={handleLogoUpload}>
                  Change Logo
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelName">Hostel Name</Label>
              <Input 
                id="hostelName" 
                name="name"
                value={hostelInfo.name} 
                onChange={handleHostelInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelAddress">Address</Label>
              <Input 
                id="hostelAddress" 
                name="address"
                value={hostelInfo.address}
                onChange={handleHostelInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelCity">City</Label>
              <Input 
                id="hostelCity" 
                name="city"
                value={hostelInfo.city}
                onChange={handleHostelInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelDescription">Description</Label>
              <textarea 
                id="hostelDescription"
                name="description"
                className="w-full border rounded-md p-2 min-h-[100px]"
                value={hostelInfo.description}
                onChange={handleHostelInfoChange}
              />
            </div>
            
            <Button 
              type="button" 
              className="bg-hostel-primary hover:bg-hostel-secondary"
              onClick={handleSaveHostelSettings}
            >
              Save Hostel Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Button
        variant="outline"
        className="w-full border-red-300 text-red-500 hover:bg-red-50"
        onClick={logout}
      >
        Log Out
      </Button>
    </div>
  );
};

export default AdminProfile;
