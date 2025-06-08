
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserRole, AdminSubRole } from "@/types";
import { useEffect } from "react";

// Pages
import SplashScreen from "@/pages/SplashScreen";
import RoleSelection from "@/pages/RoleSelection";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import GuestDashboard from "@/pages/guest/Dashboard";
import PublicDashboard from "@/pages/public/Dashboard";
import NotFound from "@/pages/NotFound";
import RequireAuth from "@/components/RequireAuth";
import Layout from "@/components/Layout";

// Admin pages
import AdminRooms from "@/pages/admin/Rooms";
import AdminMeals from "@/pages/admin/Meals";
import AdminNotifications from "@/pages/admin/Notifications";
import AdminProfile from "@/pages/admin/Profile";
import SuperAdmin from "@/pages/admin/SuperAdmin";
import PGManager from "@/pages/admin/PGManager";

// Guest pages
import GuestRooms from "@/pages/guest/Rooms";
import GuestMeals from "@/pages/guest/Meals";
import GuestNotifications from "@/pages/guest/Notifications";
import GuestProfile from "@/pages/guest/Profile";

// Public pages
import PublicRooms from "@/pages/public/Rooms";
import RoomDetails from "@/pages/public/RoomDetails";
import BookingForm from "@/pages/public/BookingForm";
import Payment from "@/pages/public/Payment";

const queryClient = new QueryClient();

// Mobile back button handler
const MobileBackHandler = () => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Prevent default browser behavior
      event.preventDefault();
      
      // Check if we're at the root level
      const currentPath = window.location.pathname;
      console.log("Back button pressed on:", currentPath);
      
      // If we're at root paths, redirect to role selection instead of closing app
      if (currentPath === "/" || currentPath === "/role-selection") {
        window.history.pushState(null, "", "/role-selection");
        return;
      }
      
      // For other paths, allow normal navigation
      window.history.go(-1);
    };

    // Add state to prevent app closure
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

// Super Admin protection component
const RequireSuperAdmin = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, userRole, adminSubRole } = useAuth();
  
  if (!isAuthenticated || userRole !== UserRole.ADMIN || adminSubRole !== AdminSubRole.SUPER_ADMIN) {
    return <Navigate to="/role-selection" replace />;
  }
  
  return children;
};

// PG Manager protection component
const RequirePGManager = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, userRole, adminSubRole } = useAuth();
  
  if (!isAuthenticated || userRole !== UserRole.ADMIN || adminSubRole !== AdminSubRole.PG_MANAGER) {
    return <Navigate to="/role-selection" replace />;
  }
  
  return children;
};

const AppRoutes = () => (
  <BrowserRouter>
    <MobileBackHandler />
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />
      
      {/* Super Admin Route - Separate and Direct Access Only */}
      <Route path="/super-admin" element={
        <RequireSuperAdmin>
          <SuperAdmin />
        </RequireSuperAdmin>
      } />

      {/* PG Manager Route - Separate and Direct Access Only */}
      <Route path="/pg-manager" element={
        <RequirePGManager>
          <PGManager />
        </RequirePGManager>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <RequireAuth allowedRole={UserRole.ADMIN}>
          <Layout />
        </RequireAuth>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="meals" element={<AdminMeals />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Guest Routes */}
      <Route path="/guest" element={
        <RequireAuth allowedRole={UserRole.PG_GUEST}>
          <Layout />
        </RequireAuth>
      }>
        <Route index element={<GuestDashboard />} />
        <Route path="rooms" element={<GuestRooms />} />
        <Route path="meals" element={<GuestMeals />} />
        <Route path="notifications" element={<GuestNotifications />} />
        <Route path="profile" element={<GuestProfile />} />
      </Route>

      {/* Public Routes */}
      <Route path="/public" element={<Layout />}>
        <Route index element={<PublicDashboard />} />
        <Route path="rooms" element={<PublicRooms />} />
        <Route path="rooms/:id" element={<RoomDetails />} />
        <Route path="booking/:id" element={<BookingForm />} />
        <Route path="payment/:id" element={<Payment />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
