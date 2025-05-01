
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Home, User, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const Layout = () => {
  const { userRole, isAuthenticated, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        label: "Home",
        icon: Home,
        path: `/${userRole === UserRole.PUBLIC ? "public" : userRole}`,
      },
      {
        label: "Rooms",
        icon: Home,
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

  // Determine navigation path based on role if at root
  useEffect(() => {
    if (location.pathname === "/") {
      if (isAuthenticated) {
        navigate(`/${userRole}`);
      } else {
        navigate("/public");
      }
    }
  }, [isAuthenticated, userRole, location.pathname, navigate]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-hostel-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Space Mate</h1>
          {isAuthenticated && currentUser && (
            <div className="flex items-center space-x-2">
              <span className="text-sm">{currentUser.name}</span>
              <div className="w-8 h-8 rounded-full bg-hostel-accent text-hostel-primary flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-4 px-4 animate-fade-in">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-lg border-t fixed bottom-0 left-0 right-0">
        <div className="flex justify-around">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "flex flex-col items-center py-3 px-3 flex-1 transition-colors",
                isActive(item.path)
                  ? "text-hostel-primary"
                  : "text-gray-500 hover:text-hostel-secondary"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
