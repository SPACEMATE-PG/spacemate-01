
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Menu, LogOut, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SuperAdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Super Admin Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex-shrink-0">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Super Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
            
            {/* Mobile Menu Button */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-safe">
                <div className="h-full flex flex-col">
                  {/* Super Admin Profile Section */}
                  <div className="flex flex-col items-center py-6 border-b">
                    <Avatar className="h-20 w-20 mb-2">
                      <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-semibold text-lg">Super Admin</h2>
                    <p className="text-gray-500 text-sm">superadmin@spacemate.com</p>
                    <p className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full mt-2">
                      System Administrator
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                      <li>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-base py-6 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => handleNavigation('/super-admin')}
                        >
                          <Shield size={18} className="mr-3" />
                          Dashboard
                        </Button>
                      </li>
                      
                      <li>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-base py-6 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={handleLogout}
                        >
                          <LogOut size={18} className="mr-3" />
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </nav>

                  {/* App Info Section */}
                  <div className="pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-500 hover:text-indigo-600"
                    >
                      <Info size={16} className="mr-2" />
                      About Space Mate
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-500 hover:text-indigo-600"
                    >
                      <Settings size={16} className="mr-2" />
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
      <main className="flex-1 container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
