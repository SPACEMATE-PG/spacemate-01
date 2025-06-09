
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "@/types";
import { Home, List, Calendar, Bell, User, LogOut, Info, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarContentProps {
  isAuthenticated: boolean;
  currentUser: any;
  userRole: UserRole;
  onNavigate: (path: string) => void;
  onLogin: () => void;
}

const SidebarContent = ({ 
  isAuthenticated, 
  currentUser, 
  userRole, 
  onNavigate,
  onLogin 
}: SidebarContentProps) => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      {
        label: "Home",
        icon: Home,
        path: `/${userRole === UserRole.PUBLIC ? "public" : userRole}`,
      },
      {
        label: "Rooms",
        icon: List,
        path: `/${userRole === UserRole.PUBLIC ? "public" : userRole}/rooms`,
      },
    ];

    // Only add these items for authenticated users
    if (userRole !== UserRole.PUBLIC) {
      baseItems.push(
        {
          label: "Meals",
          icon: Calendar,
          path: `/${userRole}/meals`,
        },
        {
          label: "Notifications",
          icon: Bell,
          path: `/${userRole}/notifications`,
        },
        {
          label: "Profile",
          icon: User,
          path: `/${userRole}/profile`,
        }
      );
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    onNavigate("/role-selection");
  };

  return (
    <div className="h-full flex flex-col">
      {/* User Profile Section */}
      {isAuthenticated && currentUser ? (
        <div className="flex flex-col items-center py-6 border-b">
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src={currentUser.profileImage} />
            <AvatarFallback className="bg-hostel-primary text-white text-xl">
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg">{currentUser.name}</h2>
          <p className="text-gray-500 text-sm">{currentUser.email}</p>
          {userRole === UserRole.PG_GUEST && (
            <p className="text-sm bg-hostel-accent text-hostel-primary px-3 py-1 rounded-full mt-2">
              Room {currentUser.roomNumber}
            </p>
          )}
        </div>
      ) : (
        <div className="flex justify-between items-center py-4 border-b">
          <h2 className="font-semibold text-lg">Welcome, Guest</h2>
          <Button 
            variant="outline"
            className="text-hostel-primary" 
            onClick={onLogin}
          >
            Sign In
          </Button>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-base py-6",
                  isActive(item.path)
                    ? "bg-hostel-primary text-white"
                    : "text-gray-600 hover:bg-hostel-accent hover:text-hostel-primary"
                )}
                onClick={() => onNavigate(item.path)}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </Button>
            </li>
          ))}
          
          {isAuthenticated && (
            <li>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-base py-6 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </Button>
            </li>
          )}
        </ul>
      </nav>

      {/* App Info Section */}
      <div className="pt-2 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-500 hover:text-hostel-primary"
        >
          <Info size={16} className="mr-2" />
          About Space Mate
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-500 hover:text-hostel-primary"
        >
          <Settings size={16} className="mr-2" />
          App Settings
        </Button>
        <div className="text-xs text-gray-400 mt-4 text-center pb-safe">
          Space Mate v1.0.0
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
