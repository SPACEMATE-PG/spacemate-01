
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate(`/${userRole}`);
      } else {
        navigate("/role-selection");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, userRole]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hostel-primary text-white">
      <div className="animate-scale-in">
        <div className="w-24 h-24 bg-white rounded-full mb-6 flex items-center justify-center">
          <img src="/placeholder.svg" alt="Logo" className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Space Mate</h1>
        <p className="text-hostel-accent">Your Home Away From Home</p>
      </div>
    </div>
  );
};

export default SplashScreen;
