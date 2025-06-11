import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { UserRole, AdminSubRole } from "./types";
import { useEffect } from "react";
import { App as CapApp } from "@capacitor/app";

// Pages
import SplashScreen from "./pages/SplashScreen";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

// Admin pages
import SuperAdmin from "./pages/admin/SuperAdmin";
import PGManager from "./pages/admin/PGManager";
import AddGuest from "./pages/admin/AddGuest";
import GuestsList from "./pages/admin/GuestsList";
import RoomManagement from "./pages/admin/RoomManagement";
import ServiceRequests from "./pages/admin/ServiceRequests";
import FinancialManagement from "./pages/admin/FinancialManagement";
import Notifications from "./pages/admin/Notifications";
import Reports from "./pages/admin/Reports";
import JoiningRequests from "./pages/admin/JoiningRequests";

// Guest pages
import GuestRooms from "./pages/guest/Rooms";
import GuestMeals from "./pages/guest/Meals";
import GuestNotifications from "./pages/guest/Notifications";
import GuestProfile from "./pages/guest/Profile";

// Public pages
import PublicRooms from "./pages/public/Rooms";
import RoomDetails from "./pages/public/RoomDetails";
import BookingForm from "./pages/public/BookingForm";
import Payment from "./pages/public/Payment";

const queryClient = new QueryClient();

// Capacitor Android back button handler
const CapacitorBackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let removeListener: (() => void) | undefined;
    (async () => {
      const handler = await CapApp.addListener("backButton", () => {
        if (location.pathname !== "/" && location.pathname !== "/role-selection") {
          navigate(-1);
        } else {
          CapApp.exitApp();
        }
      });
      removeListener = handler.remove;
    })();
    return () => {
      if (removeListener) removeListener();
    };
  }, [location, navigate]);
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
  
  if (!isAuthenticated || userRole !== UserRole.ADMIN || adminSubRole !== AdminSubRole.PG_ADMIN) {
    return <Navigate to="/role-selection" replace />;
  }
  
  return children;
};

const AppRoutes = () => (
  <BrowserRouter>
    <CapacitorBackHandler />
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />
      
      {/* Super Admin Route */}
      <Route path="/super-admin" element={
        <RequireSuperAdmin>
          <SuperAdmin />
        </RequireSuperAdmin>
      } />

      {/* PG Manager Routes */}
      <Route path="/pg-admin" element={
        <RequirePGManager>
          <PGManager />
        </RequirePGManager>
      } />
      <Route path="/pg-admin/guests" element={
        <RequirePGManager><GuestsList /></RequirePGManager>
      } />
      <Route path="/pg-admin/guests/add" element={
        <RequirePGManager><AddGuest /></RequirePGManager>
      } />
      <Route path="/pg-admin/guests/requests" element={
        <RequirePGManager><JoiningRequests /></RequirePGManager>
      } />
      <Route path="/pg-admin/rooms" element={
        <RequirePGManager><RoomManagement /></RequirePGManager>
      } />
      <Route path="/pg-admin/requests" element={
        <RequirePGManager><ServiceRequests /></RequirePGManager>
      } />
      <Route path="/pg-admin/financial" element={
        <RequirePGManager>
          <FinancialManagement />
        </RequirePGManager>
      } />
      <Route path="/pg-admin/notifications" element={
        <RequirePGManager>
          <Notifications />
        </RequirePGManager>
      } />
      <Route path="/pg-admin/reports" element={
        <RequirePGManager>
          <Reports />
        </RequirePGManager>
      } />

      {/* Guest Routes */}
      <Route path="/guest" element={
        <RequireAuth allowedRole={UserRole.PG_GUEST}>
          <Layout />
        </RequireAuth>
      }>
        <Route path="rooms" element={<GuestRooms />} />
        <Route path="meals" element={<GuestMeals />} />
        <Route path="notifications" element={<GuestNotifications />} />
        <Route path="profile" element={<GuestProfile />} />
      </Route>

      {/* Public Routes */}
      <Route path="/public" element={<Layout />}>
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
