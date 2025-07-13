import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Outlet } from "react-router-dom";
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
import PGAdminLayout from "./components/admin/PGAdminLayout";
import WardenLayout from "./components/admin/WardenLayout";
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
import FoodManagement from "./pages/admin/FoodManagement";
import SubscriptionPayment from "./pages/admin/SubscriptionPayment";
import SuperAdminSettings from "./pages/admin/SuperAdminSettings";
import PGAdminSettings from "./pages/admin/PGAdminSettings";
import PGAdminHelp from "./pages/admin/PGAdminHelp";
import PGAdminAbout from "./pages/admin/PGAdminAbout";
import Security from "./pages/admin/Security";
import Messages from "./pages/admin/Messages";
import Expenses from "./pages/admin/Expenses";

// New imports for sub-pages
import WardenDashboard from "./pages/admin/WardenDashboard";
import WardenAssets from "./pages/admin/WardenAssets";
import WardenRequests from "./pages/admin/WardenRequests";
import WardenMaintenance from "./pages/admin/WardenMaintenance";
import WardenNotifications from "./pages/admin/WardenNotifications";

// Guest pages
import GuestRooms from "./pages/guest/Rooms";
import GuestMeals from "./pages/guest/Meals";
import GuestNotifications from "./pages/guest/Notifications";
import GuestProfile from "./pages/guest/Profile";
import GuestIndex from "./pages/guest/Index";

// Public pages
import PublicRooms from "./pages/public/Rooms";
import RoomDetails from "./pages/public/RoomDetails";
import BookingForm from "./pages/public/BookingForm";
import Payment from "./pages/public/Payment";

// Warden protection component
const RequireWarden = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, userRole, adminSubRole } = useAuth();
  
  console.log("RequireWarden check - isAuthenticated:", isAuthenticated, "userRole:", userRole, "adminSubRole:", adminSubRole);
  
  if (!isAuthenticated || userRole !== UserRole.ADMIN || adminSubRole !== AdminSubRole.WARDEN) {
    console.error("Warden access denied - isAuthenticated:", isAuthenticated, "userRole:", userRole, "adminSubRole:", adminSubRole);
    return <Navigate to="/role-selection" replace />;
  }
  
  return children;
};

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
  
  console.log("RequireSuperAdmin check - isAuthenticated:", isAuthenticated, "userRole:", userRole, "adminSubRole:", adminSubRole);
  
  if (!isAuthenticated || userRole !== UserRole.ADMIN || adminSubRole !== AdminSubRole.SUPER_ADMIN) {
    console.error("Super Admin access denied - isAuthenticated:", isAuthenticated, "userRole:", userRole, "adminSubRole:", adminSubRole);
    return <Navigate to="/role-selection" replace />;
  }
  
  return children;
};

// PG Manager protection component
const RequirePGManager = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, userRole, adminSubRole } = useAuth();
  
  console.log("RequirePGManager check - isAuthenticated:", isAuthenticated, "userRole:", userRole, "adminSubRole:", adminSubRole);
  
  if (!isAuthenticated || userRole !== UserRole.ADMIN || adminSubRole !== AdminSubRole.PG_ADMIN) {
    console.error("PG Manager access denied - isAuthenticated:", isAuthenticated, "userRole:", userRole, "adminSubRole:", adminSubRole);
    return <Navigate to="/role-selection" replace />;
  }
  
  return children;
};

const AppRoutes = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
      <Route path="/super-admin/settings" element={
        <RequireSuperAdmin>
          <SuperAdminSettings />
        </RequireSuperAdmin>
      } />

      {/* PG Manager Routes */}
      <Route path="/pg-admin" element={<PGAdminLayout />}>
        <Route index element={<PGManager />} />
        <Route path="residents/requests" element={<JoiningRequests />} />
        <Route path="residents" element={<GuestsList />} />
        <Route path="rooms" element={<RoomManagement />} />
        <Route path="food" element={<FoodManagement />} />
        <Route path="requests" element={<ServiceRequests />} />
        <Route path="payments" element={<FinancialManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<PGAdminSettings />} />
        <Route path="help" element={<PGAdminHelp />} />
        <Route path="about" element={<PGAdminAbout />} />
        {/* New Routes */}
        <Route path="security" element={<Security />} />
        <Route path="messages" element={<Messages />} />
        <Route path="expenses" element={<Expenses />} />
      </Route>

      {/* Guest Routes */}
      <Route path="/guest" element={
        <RequireAuth allowedRole={UserRole.PG_GUEST}>
          <Layout />
        </RequireAuth>
      }>
        <Route index element={<GuestIndex />} />
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

      {/* Warden Routes */}
      <Route path="/warden" element={<RequireWarden><WardenLayout /></RequireWarden>}>
        <Route index element={<WardenDashboard />} />
        <Route path="assets" element={<WardenAssets />} />
        <Route path="requests" element={<WardenRequests />} />
        <Route path="maintenance" element={<WardenMaintenance />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<WardenNotifications />} />
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
        <div className="overflow-x-hidden">
          <AppRoutes />
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
