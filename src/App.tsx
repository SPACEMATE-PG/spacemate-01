
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/login" element={<Login />} />
            
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
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
