
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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Bell, 
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
    <Sidebar 
      side="right" 
      className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-l border-slate-700/50 shadow-2xl"
    >
      <SidebarHeader className="p-6 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            SM
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Space Mate
            </h1>
            <p className="text-sm text-slate-300">
              {adminSubRole === AdminSubRole.SUPER_ADMIN ? "Super Admin Portal" : "PG Manager Portal"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 bg-slate-900/50">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* User Profile Section */}
            {currentUser && (
              <div className="flex items-center space-x-3 p-4 bg-slate-800/70 rounded-xl mb-6 border border-slate-700/50">
                <Avatar className="h-12 w-12 ring-2 ring-blue-500/30">
                  <AvatarImage src={currentUser.profileImage} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{currentUser.name}</h3>
                  <p className="text-sm text-slate-300 truncate">{currentUser.email}</p>
                  {adminSubRole && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 mt-1">
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
                    className={`w-full justify-between text-sm py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      isActive(item.url)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent hover:border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className="mr-3" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {isActive(item.url) && (
                      <ChevronRight size={16} className="text-white/80" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-700/50 bg-slate-800/50">
        <div className="space-y-2">
          {/* Only show profile settings for PG Manager */}
          {adminSubRole === AdminSubRole.PG_MANAGER && (
            <SidebarMenuButton 
              onClick={() => navigate("/admin/profile")}
              className="w-full justify-start text-slate-300 hover:bg-slate-800/70 hover:text-white text-sm py-3 px-4 rounded-xl transition-all duration-300 border border-transparent hover:border-slate-700/50"
            >
              <Settings size={18} className="mr-3" />
              <span className="font-medium">Profile Settings</span>
            </SidebarMenuButton>
          )}
          
          <SidebarMenuButton 
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300 text-sm py-3 px-4 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30"
          >
            <LogOut size={18} className="mr-3" />
            <span className="font-medium">Sign Out</span>
          </SidebarMenuButton>
          
          <div className="text-xs text-slate-400 text-center pt-3 border-t border-slate-700/30 mt-4">
            <div className="flex items-center justify-center space-x-1">
              <span>Space Mate</span>
              <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] font-medium">v1.0.0</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
