
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Home, 
  Users, 
  Calendar, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Info,
  List,
  Shield,
  Building
} from "lucide-react";

export function AdminSidebar() {
  const { currentUser, logout, adminSubRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/role-selection");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Define navigation items based on admin sub-role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: adminSubRole === AdminSubRole.SUPER_ADMIN ? "/admin/super-admin" : "/admin/pg-manager",
        icon: Home,
      },
      {
        title: "Rooms",
        url: "/admin/rooms",
        icon: List,
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
      {
        title: "Profile",
        url: "/admin/profile",
        icon: User,
      },
    ];

    // Add Super Admin specific items
    if (adminSubRole === AdminSubRole.SUPER_ADMIN) {
      baseItems.splice(1, 0, {
        title: "PG Management",
        url: "/admin/super-admin",
        icon: Building,
      });
      
      baseItems.splice(2, 0, {
        title: "Admin Users",
        url: "/admin/super-admin",
        icon: Shield,
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg">
            SM
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-hostel-primary to-hostel-secondary bg-clip-text text-transparent">
              Space Mate
            </h1>
            <p className="text-xs text-gray-500">
              {adminSubRole === AdminSubRole.SUPER_ADMIN ? "Super Admin" : "PG Manager"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* User Profile Section */}
            {currentUser && (
              <div className="flex flex-col items-center py-4 border-b border-gray-200 mx-4 mb-4">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={currentUser.profileImage} />
                  <AvatarFallback className="bg-hostel-primary text-white text-lg">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-sm text-center">{currentUser.name}</h2>
                <p className="text-gray-500 text-xs text-center">{currentUser.email}</p>
                {adminSubRole && (
                  <p className="text-xs bg-hostel-accent text-hostel-primary px-2 py-1 rounded-full mt-1">
                    {adminSubRole === AdminSubRole.SUPER_ADMIN 
                      ? "Super Admin" 
                      : adminSubRole === AdminSubRole.PG_MANAGER 
                        ? "PG Manager" 
                        : "Warden"
                    }
                  </p>
                )}
              </div>
            )}

            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    className="w-full justify-start text-sm py-3 hover:bg-hostel-accent hover:text-hostel-primary"
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className="w-full justify-start text-sm py-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-500 hover:text-hostel-primary text-sm"
            onClick={() => navigate("/about")}
          >
            <Info size={16} className="mr-2" />
            About Space Mate
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-500 hover:text-hostel-primary text-sm"
          >
            <Settings size={16} className="mr-2" />
            App Settings
          </Button>
          <div className="text-xs text-gray-400 text-center pt-2">
            Space Mate v1.0.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
