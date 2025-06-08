
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSubRole } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Building2,
  Shield,
  Home,
  ChevronRight
} from "lucide-react";

export function AdminSidebar() {
  const { currentUser, logout, adminSubRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/role-selection");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Define navigation items based on admin sub-role
  const getNavItems = () => {
    if (adminSubRole === AdminSubRole.SUPER_ADMIN) {
      return [
        {
          title: "Dashboard",
          url: "/admin/super-admin",
          icon: LayoutDashboard,
        },
        {
          title: "PG Management",
          url: "/admin/pg-management",
          icon: Building2,
        },
        {
          title: "Admin Users",
          url: "/admin/admin-users",
          icon: Shield,
        },
        {
          title: "Analytics",
          url: "/admin/analytics",
          icon: Users,
        },
        {
          title: "Notifications",
          url: "/admin/notifications", 
          icon: Bell,
        },
      ];
    } else {
      return [
        {
          title: "Dashboard",
          url: "/admin/pg-manager",
          icon: LayoutDashboard,
        },
        {
          title: "Rooms",
          url: "/admin/rooms",
          icon: Home,
        },
        {
          title: "Guests",
          url: "/admin/guests",
          icon: Users,
        },
        {
          title: "Meals",
          url: "/admin/meals",
          icon: Calendar,
        },
        {
          title: "Notifications",
          url: "/admin/notifications", 
          icon: Bell,
        },
      ];
    }
  };

  const navItems = getNavItems();

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
            SM
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Space Mate
            </h1>
            <p className="text-sm text-gray-500">
              {adminSubRole === AdminSubRole.SUPER_ADMIN ? "Super Admin Portal" : "PG Manager Portal"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* User Profile Section */}
            {currentUser && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentUser.profileImage} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{currentUser.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
                  {adminSubRole && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      {adminSubRole === AdminSubRole.SUPER_ADMIN 
                        ? "Super Admin" 
                        : "PG Manager"
                      }
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <SidebarMenu className="space-y-2">
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    className={`w-full justify-between text-sm py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive(item.url)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon size={18} className="mr-3" />
                      {item.title}
                    </div>
                    {isActive(item.url) && (
                      <ChevronRight size={16} />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <div className="space-y-2">
          <SidebarMenuButton 
            onClick={() => navigate("/admin/profile")}
            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm py-3 px-4 rounded-lg transition-colors"
          >
            <User size={16} className="mr-3" />
            Profile Settings
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            onClick={() => navigate("/admin/settings")}
            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm py-3 px-4 rounded-lg transition-colors"
          >
            <Settings size={16} className="mr-3" />
            App Settings
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 text-sm py-3 px-4 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-3" />
            Sign Out
          </SidebarMenuButton>
          
          <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100 mt-4">
            Space Mate v1.0.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
