import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Menu, LayoutDashboard, Users, User, Settings, Info, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SuperAdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Mock super admin data - replace with actual user data
  const superAdmin = {
    name: "Super Admin",
    email: "superadmin@spacemate.com",
    avatar: "" // Add avatar URL if available
  };
  const navigationItems = [{
    label: "Home",
    icon: Home,
    route: "/super-admin",
    description: "Dashboard overview"
  }, {
    label: "Rooms",
    icon: LayoutDashboard,
    route: "/super-admin",
    description: "Room management"
  }, {
    label: "Meals",
    icon: Users,
    route: "/super-admin",
    description: "Meal services"
  }, {
    label: "Notifications",
    icon: User,
    route: "/super-admin",
    description: "System notifications"
  }, {
    label: "Profile",
    icon: User,
    route: "/super-admin",
    description: "Account settings"
  }];
  const bottomNavigationItems = [{
    label: "About Space Mate",
    icon: Info,
    route: "/about",
    description: "Learn more about SpaceMate"
  }, {
    label: "App Settings",
    icon: Settings,
    route: "/super-admin/settings",
    description: "Application configuration"
  }];
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
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100 rounded-full text-right">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-3 border-3 border-white/30">
                <AvatarImage src={superAdmin.avatar} alt={superAdmin.name} />
                <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                  {superAdmin.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{superAdmin.name}</h3>
              <p className="text-purple-100 text-sm">{superAdmin.email}</p>
              <div className="mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                Room 101
              </div>
            </div>
          </div>

          {/* Main Navigation Section */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-4 space-y-1">
              {navigationItems.map((item, index) => <button key={index} onClick={() => handleNavigation(item.route)} className="w-full flex items-center gap-4 p-3 rounded-lg text-left hover:bg-purple-50 transition-colors group">
                  <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                    <item.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.label}</p>
                  </div>
                </button>)}
            </div>

            <Separator className="mx-4 my-2" />

            {/* Bottom Navigation */}
            <div className="p-4 space-y-1">
              {bottomNavigationItems.map((item, index) => <button key={index} onClick={() => handleNavigation(item.route)} className="w-full flex items-center gap-4 p-3 rounded-lg text-left hover:bg-gray-50 transition-colors group">
                  <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700">{item.label}</p>
                  </div>
                </button>)}
            </div>

            <Separator className="mx-4 my-2" />

            {/* Logout Section */}
            <div className="p-4">
              <button onClick={handleLogout} className="w-full flex items-center gap-4 p-3 rounded-lg text-left hover:bg-red-50 transition-colors group">
                <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                  <LogOut className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-red-600">Logout</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};
export default SuperAdminSidebar;