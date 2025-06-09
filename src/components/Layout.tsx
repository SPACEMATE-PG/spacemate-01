
import { useLocation } from "react-router-dom";
import SuperAdminLayout from "./layout/SuperAdminLayout";
import RegularLayout from "./layout/RegularLayout";

const Layout = () => {
  const location = useLocation();

  // Check if we're on super admin route
  const isSuperAdmin = location.pathname.startsWith('/super-admin');

  // Render appropriate layout based on route
  if (isSuperAdmin) {
    return <SuperAdminLayout />;
  }

  return <RegularLayout />;
};

export default Layout;
