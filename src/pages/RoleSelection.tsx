
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Shield, User } from "lucide-react";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-hostel-light to-hostel-accent p-5">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-hostel-primary to-hostel-secondary rounded-2xl mb-6 mx-auto flex items-center justify-center shadow-md">
            <img src="/placeholder.svg" alt="Logo" className="w-14 h-14" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Space Mate</h1>
          <p className="text-gray-600 mb-8">Your one-stop solution for PG accommodation</p>
        </div>

        <div className="space-y-4">
          <div 
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center"
            onClick={() => handleRoleSelect(UserRole.ADMIN)}
          >
            <div className="w-12 h-12 rounded-full bg-hostel-accent flex items-center justify-center mr-4">
              <Shield className="text-hostel-primary w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-800">Admin</h2>
              <p className="text-sm text-gray-600">Manage your hostel properties and guests</p>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center"
            onClick={() => handleRoleSelect(UserRole.PG_GUEST)}
          >
            <div className="w-12 h-12 rounded-full bg-hostel-accent flex items-center justify-center mr-4">
              <User className="text-hostel-primary w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-800">PG Guest</h2>
              <p className="text-sm text-gray-600">Access your resident details and services</p>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center"
            onClick={() => handleRoleSelect(UserRole.PUBLIC)}
          >
            <div className="w-12 h-12 rounded-full bg-hostel-accent flex items-center justify-center mr-4">
              <Home className="text-hostel-primary w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-800">Continue as Guest</h2>
              <p className="text-sm text-gray-600">Explore available hostels and room options</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          Find your perfect accommodation with Space Mate
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
