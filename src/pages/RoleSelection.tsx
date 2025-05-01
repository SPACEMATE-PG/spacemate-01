
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { User, Home, Users } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    
    if (role === UserRole.PUBLIC) {
      navigate("/public");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-hostel-primary rounded-full mb-4 mx-auto flex items-center justify-center shadow-md">
            <img src="/placeholder.svg" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-hostel-primary mb-2">Welcome to Space Mate</h1>
          <p className="text-gray-600">Select how you want to continue</p>
        </div>

        <div className="space-y-4 mt-8">
          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-hostel-primary group"
            onClick={() => handleRoleSelect(UserRole.ADMIN)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="group-hover:text-hostel-primary transition-colors">Admin</CardTitle>
                <User className="text-gray-500 group-hover:text-hostel-primary transition-colors" />
              </div>
              <CardDescription>Manage hostel, rooms, and guests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Login with your admin credentials to access the dashboard.
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-hostel-primary group"
            onClick={() => handleRoleSelect(UserRole.PG_GUEST)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="group-hover:text-hostel-primary transition-colors">PG Guest</CardTitle>
                <Home className="text-gray-500 group-hover:text-hostel-primary transition-colors" />
              </div>
              <CardDescription>Access your resident account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Login with your resident credentials to view your account.
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-hostel-primary group"
            onClick={() => handleRoleSelect(UserRole.PUBLIC)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="group-hover:text-hostel-primary transition-colors">Continue as Guest</CardTitle>
                <Users className="text-gray-500 group-hover:text-hostel-primary transition-colors" />
              </div>
              <CardDescription>Browse hostels and rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Explore available hostels and rooms without logging in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
