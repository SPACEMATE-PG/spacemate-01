
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserRole } from "@/types";
import SidebarContent from "./SidebarContent";

interface HeaderSectionProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const HeaderSection = ({ isDrawerOpen, setIsDrawerOpen }: HeaderSectionProps) => {
  const { isAuthenticated, currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
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
          {/* Desktop Profile */}
          {!isMobile && isAuthenticated && currentUser && (
            <div className="flex items-center gap-3 mr-2">
              <div className="text-right">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-500">
                  {userRole === UserRole.ADMIN ? "Admin" : "Guest"}
                </p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.profileImage} />
                <AvatarFallback className="bg-hostel-primary text-white">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
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
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-safe">
              <SidebarContent 
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                userRole={userRole}
                onNavigate={(path) => {
                  navigate(path);
                  setIsDrawerOpen(false);
                }}
                onLogin={() => navigate("/role-selection")}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
