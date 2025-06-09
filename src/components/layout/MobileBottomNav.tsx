
import { useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "@/types";
import { Home, List, Calendar, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  userRole: UserRole;
}

const MobileBottomNav = ({ userRole }: MobileBottomNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <nav className="bg-white shadow-lg border-t fixed bottom-0 left-0 right-0 pb-safe z-30">
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
  );
};

export default MobileBottomNav;
