
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HeaderSection from "./HeaderSection";
import MobileBottomNav from "./MobileBottomNav";

const RegularLayout = () => {
  const { userRole, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  // Determine navigation path based on role if at root
  useEffect(() => {
    if (location.pathname === "/") {
      if (isAuthenticated) {
        navigate(`/${userRole}`);
      } else {
        navigate("/public");
      }
    }
  }, [isAuthenticated, userRole, location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderSection 
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6 px-4 pb-24 page-transition">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav userRole={userRole} />
      )}
    </div>
  );
};

export default RegularLayout;
