import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Users,
  Building,
  IndianRupee,
  Bell,
  Home,
  ClipboardList,
  Menu,
  LogOut,
  ToggleLeft,
  ToggleRight,
  Info,
  Settings
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PGAdminLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { tab: "overview", label: "Dashboard", icon: Home, path: "/pg-admin" },
  { tab: "guests", label: "Guests", icon: Users, path: "/pg-admin/guests" },
  { tab: "rooms", label: "Rooms", icon: Building, path: "/pg-admin/rooms" },
  { tab: "requests", label: "Requests", icon: ClipboardList, path: "/pg-admin/requests" },
  { tab: "financial", label: "Financial", icon: IndianRupee, path: "/pg-admin/financial" },
  { tab: "notifications", label: "Notifications", icon: Bell, path: "/pg-admin/notifications" }
];

const PGAdminLayout = ({ children }: PGAdminLayoutProps) => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPGAvailable, setIsPGAvailable] = useState(true);

  // Determine active tab from path (always up-to-date)
  const activeTab = navigationItems.find(item => location.pathname.startsWith(item.path))?.tab || "overview";

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/role-selection");
    setIsDrawerOpen(false);
  };

  const handlePGAvailability = (checked: boolean) => {
    setIsPGAvailable(checked);
    toast({
      title: checked ? "PG is now available" : "PG is now fully booked",
      description: checked ? "New bookings can be accepted" : "No new bookings will be accepted",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b sticky top-0 z-30 shadow-sm bg-white">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg">
              SM
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-hostel-primary to-hostel-secondary bg-clip-text text-transparent">
              Space Mate
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* PG Availability Toggle */}
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm font-medium">PG Status:</span>
              <div className="flex items-center gap-2">
                {isPGAvailable ? (
                  <ToggleRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-red-500" />
                )}
                <Switch
                  checked={isPGAvailable}
                  onCheckedChange={handlePGAvailability}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
            {/* Desktop Profile */}
            {!isMobile && currentUser && (
              <div className="flex items-center gap-3 mr-2">
                <div className="text-right">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">PG Admin</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-hostel-primary text-white flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            )}
            {/* Mobile Menu Button */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-safe flex flex-col">
                <div className="h-full flex flex-col flex-1">
                  {/* User Profile Section */}
                  {currentUser && (
                    <div className="flex flex-col items-center py-6 border-b">
                      <div className="h-20 w-20 rounded-full bg-hostel-primary text-white flex items-center justify-center text-2xl mb-2">
                        {currentUser.name.charAt(0)}
                      </div>
                      <h2 className="font-semibold text-lg">{currentUser.name}</h2>
                      <p className="text-gray-500 text-sm">{currentUser.email}</p>
                      <p className="text-sm bg-hostel-accent text-hostel-primary px-3 py-1 rounded-full mt-2">
                        PG Admin
                      </p>
                    </div>
                  )}
                  {/* Navigation Links */}
                  <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.path === "/pg-admin"
                          ? location.pathname === "/pg-admin"
                          : location.pathname.startsWith(item.path);
                        return (
                          <li key={item.tab}>
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              className={cn(
                                "w-full justify-start text-base py-6 flex items-center gap-3 rounded-lg transition-colors",
                                isActive
                                  ? "bg-hostel-primary text-white shadow-md"
                                  : "text-gray-700 hover:bg-hostel-accent hover:text-hostel-primary"
                              )}
                              onClick={() => handleNavigation(item.path)}
                            >
                              <Icon size={20} className="mr-2" />
                              {item.label}
                            </Button>
                          </li>
                        );
                      })}
                      <li>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-base py-6 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-3"
                          onClick={handleLogout}
                        >
                          <LogOut size={20} className="mr-2" />
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </nav>
                  {/* App Info Section */}
                  <div className="pt-2 border-t mt-auto">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-500 hover:text-hostel-primary flex items-center gap-2"
                    >
                      <Info size={18} className="mr-2" />
                      About Space Mate
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-500 hover:text-hostel-primary flex items-center gap-2"
                    >
                      <Settings size={18} className="mr-2" />
                      App Settings
                    </Button>
                    <div className="text-xs text-gray-400 mt-4 text-center pb-safe">
                      Space Mate v1.0.0
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24 animate-fade-in">
        {children}
      </main>
      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden bg-white shadow-lg border-t fixed bottom-0 left-0 right-0 pb-safe z-30">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            // Home tab: exact match, others: startsWith
            const isActive = item.path === "/pg-admin"
              ? location.pathname === "/pg-admin"
              : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.tab}
                className={cn(
                  "flex flex-col items-center py-3 px-3 flex-1 transition-colors",
                  isActive
                    ? "text-hostel-primary"
                    : "text-gray-500 hover:text-hostel-secondary"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default PGAdminLayout; 