
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-hostel-primary">Welcome to Space Mate</h1>
          <p className="text-gray-600 mt-2">Select how you want to continue</p>
        </div>

        <div className="space-y-4">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-hostel-primary"
            onClick={() => handleRoleSelect(UserRole.ADMIN)}
          >
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Manage hostel, rooms, and guests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Login with your admin credentials to access the dashboard.
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-hostel-primary"
            onClick={() => handleRoleSelect(UserRole.PG_GUEST)}
          >
            <CardHeader>
              <CardTitle>PG Guest</CardTitle>
              <CardDescription>Access your resident account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Login with your resident credentials to view your account.
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-hostel-primary"
            onClick={() => handleRoleSelect(UserRole.PUBLIC)}
          >
            <CardHeader>
              <CardTitle>Continue as Guest</CardTitle>
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
