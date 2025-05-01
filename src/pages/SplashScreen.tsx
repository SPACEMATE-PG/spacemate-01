
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    // Increased timeout for better visibility of splash screen on mobile
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate(`/${userRole}`);
      } else {
        navigate("/role-selection");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, userRole]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-hostel-primary via-hostel-secondary to-hostel-tertiary text-white">
      <div className="animate-scale-in text-center">
        <div className="w-28 h-28 bg-white rounded-full mb-8 mx-auto flex items-center justify-center shadow-lg shadow-hostel-accent/30">
          <img src="/placeholder.svg" alt="Logo" className="w-20 h-20" />
        </div>
        <h1 className="text-4xl font-bold mb-3 tracking-wider">Space Mate</h1>
        <p className="text-hostel-accent text-lg">Your Home Away From Home</p>
        <div className="mt-10">
          <div className="w-16 h-1.5 bg-white/40 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
