import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  Wrench,
  Users,
  Bell,
  Home,
  Menu,
  LogOut,
  Info,
  Settings,
  Building2,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WardenLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { tab: "overview", label: "Dashboard", icon: Home, path: "/warden" },
  { tab: "assets", label: "Assets", icon: Building2, path: "/warden/assets" },
  { tab: "requests", label: "Requests", icon: ClipboardList, path: "/warden/requests" },
  { tab: "maintenance", label: "Maintenance", icon: Wrench, path: "/warden/maintenance" },
  { tab: "notifications", label: "Notifications", icon: Bell, path: "/warden/notifications" }
];

const WardenLayout = ({ children }: WardenLayoutProps) => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Determine active tab from path
  const activeTab = navigationItems.find(item => location.pathname === item.path)?.tab || "overview";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold text-gray-900">Warden Dashboard</h1>
          <div className="flex items-center gap-4">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  {/* User Profile Section */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser?.profileImage} />
                        <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-gray-900">{currentUser?.name}</h2>
                        <p className="text-sm text-gray-500">Warden</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
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
                  <div className="p-4 border-t">
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
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser?.profileImage} />
              <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24 animate-fade-in">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 pb-safe">
          <div className="grid grid-cols-5 h-16">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1",
                    isActive ? "text-hostel-primary" : "text-gray-500"
                  )}
                >
                  <Icon size={20} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WardenLayout; 