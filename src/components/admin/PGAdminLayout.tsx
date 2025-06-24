import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Bell, 
  IndianRupee, 
  Building,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Search,
  User,
  Utensils,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Navigation items with correct route paths matching App.tsx
const navigationItems = [
  { 
    label: "Dashboard", 
    icon: Home, 
    path: "/pg-admin",
    description: "Overview and metrics" 
  },
  { 
    label: "Residents", 
    icon: Users, 
    path: "/pg-admin/residents",
    description: "Manage residents",
    badge: "12" // Example badge
  },
  { 
    label: "Joining Requests", 
    icon: Users, 
    path: "/pg-admin/residents/requests",
    description: "New applications",
    badge: "3" // Example badge
  },
  { 
    label: "Rooms", 
    icon: Building, 
    path: "/pg-admin/rooms",
    description: "Room management"
  },
  { 
    label: "Food", 
    icon: Utensils, 
    path: "/pg-admin/food",
    description: "Meal planning & feedback"
  },
  { 
    label: "Service Requests", 
    icon: ClipboardList, 
    path: "/pg-admin/requests",
    description: "Maintenance requests",
    badge: "5" // Example badge
  },
  { 
    label: "Payments", 
    icon: IndianRupee, 
    path: "/pg-admin/payments",
    description: "Financial transactions"
  },
  { 
    label: "Subscription", 
    icon: CreditCard, 
    path: "/pg-admin/subscription",
    description: "Manage subscription plan" 
  },
  { 
    label: "Reports", 
    icon: FileText, 
    path: "/pg-admin/reports",
    description: "Analytics & reporting"
  },
  { 
    label: "Notifications", 
    icon: Bell, 
    path: "/pg-admin/notifications",
    description: "System alerts",
    badge: "2" // Example badge
  }
];

// Mobile navigation items (limited for better UX)
const mobileNavigationItems = [
  { label: "Dashboard", icon: Home, path: "/pg-admin" },
  { label: "Residents", icon: Users, path: "/pg-admin/residents", badge: "12" },
  { label: "Rooms", icon: Building, path: "/pg-admin/rooms" },
  { label: "Food", icon: Utensils, path: "/pg-admin/food" },
  { label: "Subscription", icon: CreditCard, path: "/pg-admin/subscription" },
  { label: "More", icon: Menu, path: null }
];

const PGAdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if screen is desktop on mount and when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/role-selection");
  };

  // Check if the current path matches or starts with a navigation item path
  const isActive = (path: string) => {
    if (!path) return false;
    if (path === '/pg-admin' && location.pathname === '/pg-admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/pg-admin';
  };

  // Filter navigation items based on search
  const filteredNavItems = searchQuery 
    ? navigationItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : navigationItems;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white w-9 h-9 rounded-md flex items-center justify-center font-bold text-base shadow-sm">
              SM
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Space Mate
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative" 
              onClick={() => navigate('/pg-admin/notifications')}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">2</span>
            </Button>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Drawer Header - No close button here, it's added by SheetContent */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white w-9 h-9 rounded-md flex items-center justify-center font-bold text-base shadow-sm">
                        SM
                      </div>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        Space Mate
                      </h1>
                    </div>
                  </div>
                  
                  {/* User Profile in Drawer */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-indigo-100">
                        <AvatarImage src={currentUser?.profileImage} />
                        <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                          {currentUser?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-gray-900">{currentUser?.name || 'User'}</h2>
                        <p className="text-sm text-gray-500">PG Admin</p>
                      </div>
                    </div>
                  </div>

                  {/* Search in Drawer */}
                  <div className="px-4 py-3 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Navigation Links in Drawer */}
                  <nav className="flex-1 py-4 overflow-y-auto">
                    <ul className="space-y-1 px-2">
                      {filteredNavItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                          <li key={item.path}>
                            <Button
                              variant={active ? "default" : "ghost"}
                              className={cn(
                                "w-full justify-start text-base py-6 flex items-center gap-3 rounded-lg transition-colors",
                                active
                                  ? "bg-indigo-600 text-white shadow-md"
                                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                              )}
                              onClick={() => handleNavigation(item.path)}
                            >
                              <div className={cn(
                                "flex items-center justify-center",
                                active ? "text-white" : "text-indigo-600"
                              )}>
                                <item.icon size={20} />
                              </div>
                              <div className="flex-1 flex flex-col items-start">
                                <span>{item.label}</span>
                                {item.description && (
                                  <span className="text-xs opacity-70">{item.description}</span>
                                )}
                              </div>
                              {item.badge && (
                                <Badge variant={active ? "outline" : "default"} className={cn(
                                  "ml-auto",
                                  active ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-600"
                                )}>
                                  {item.badge}
                                </Badge>
                              )}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Logout in Drawer */}
                  <div className="p-4 border-t mt-auto">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-2 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-3"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 pb-16 md:pb-0">
          <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="grid grid-cols-5 h-16">
            {mobileNavigationItems.map((item) => {
              const active = item.path ? isActive(item.path) : false;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.path) {
                      handleNavigation(item.path);
                    } else {
                      setIsSidebarOpen(true);
                    }
                  }}
                  className="flex flex-col items-center justify-center relative"
                >
                  <div className={cn(
                    "flex items-center justify-center rounded-full w-10 h-10 relative",
                    active ? "bg-indigo-100 text-indigo-600" : "text-gray-500"
                  )}>
                    <item.icon size={20} />
                  </div>
                  {item.badge && (
                    <span className="absolute top-0 right-1/4 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  <span className={cn(
                    "text-xs mt-1",
                    active ? "text-indigo-600 font-medium" : "text-gray-500"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PGAdminLayout; 