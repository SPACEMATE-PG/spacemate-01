
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { hostel } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const AdminProfile = () => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  
  const handleLogoUpload = () => {
    toast({
      title: "Logo Updated",
      description: "Hostel logo has been successfully updated.",
    });
  };
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your profile settings have been updated.",
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
              {currentUser?.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-lg">{currentUser?.name}</h2>
              <p className="text-gray-500">{currentUser?.email}</p>
              <p className="mt-1 text-sm">Administrator</p>
            </div>
          </div>
          
          <form onSubmit={handleSaveSettings} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={currentUser?.name} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={currentUser?.email} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input id="password" type="password" placeholder="New password" />
            </div>
            
            <Button type="submit" className="bg-hostel-primary hover:bg-hostel-secondary">
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
                  src={hostel.logo} 
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
              <Input id="hostelName" defaultValue={hostel.name} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelAddress">Address</Label>
              <Input id="hostelAddress" defaultValue={hostel.address} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelCity">City</Label>
              <Input id="hostelCity" defaultValue={hostel.city} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelDescription">Description</Label>
              <textarea 
                id="hostelDescription"
                className="w-full border rounded-md p-2 min-h-[100px]"
                defaultValue={hostel.description}
              />
            </div>
            
            <Button type="button" className="bg-hostel-primary hover:bg-hostel-secondary">
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
