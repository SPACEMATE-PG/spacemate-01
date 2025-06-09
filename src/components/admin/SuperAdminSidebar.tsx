
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Menu, 
  LayoutDashboard, 
  Users, 
  User, 
  Settings, 
  Info, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuperAdminSidebarProps {
  className?: string;
}

const SuperAdminSidebar = ({ className }: SuperAdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Mock super admin data - replace with actual user data
  const superAdmin = {
    name: "Super Admin",
    email: "superadmin@spacemate.com",
    avatar: "" // Add avatar URL if available
  };

  const navigationItems = [
    {
      label: "Dashboard / Super Admin Panel",
      icon: LayoutDashboard,
      route: "/super-admin",
      description: "Main dashboard overview"
    },
    {
      label: "Bulk Admin Operations",
      icon: Users,
      route: "/super-admin/bulk-admin",
      description: "Manage multiple PG admins"
    },
    {
      label: "Profile",
      icon: User,
      route: "/super-admin/profile",
      description: "Account settings"
    },
    {
      label: "App Settings",
      icon: Settings,
      route: "/super-admin/settings",
      description: "Application configuration"
    },
    {
      label: "About SpaceMate",
      icon: Info,
      route: "/about",
      description: "Learn more about SpaceMate"
    }
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`p-2 hover:bg-slate-100 ${className}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src={superAdmin.avatar} alt={superAdmin.name} />
                <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
                  {superAdmin.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{superAdmin.name}</h3>
                <p className="text-indigo-100 text-sm truncate">{superAdmin.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.route)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-slate-100 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-slate-100 group-hover:bg-indigo-100 transition-colors">
                    <item.icon className="h-4 w-4 text-slate-600 group-hover:text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{item.label}</p>
                    <p className="text-xs text-slate-500 truncate">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <Separator className="mx-4" />

            {/* Logout Section */}
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-red-50 transition-colors group"
              >
                <div className="p-2 rounded-md bg-red-100 group-hover:bg-red-200 transition-colors">
                  <LogOut className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-red-600">Logout</p>
                  <p className="text-xs text-red-400">Sign out securely</p>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              SpaceMate Super Admin Panel
            </p>
            <p className="text-xs text-slate-400 text-center mt-1">
              v1.0.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SuperAdminSidebar;
