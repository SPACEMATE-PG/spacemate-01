import { useLocation } from "react-router-dom";
import WardenLayout from "@/components/admin/WardenLayout";
import WardenDashboard from "./WardenDashboard";
import WardenRequests from "./WardenRequests";
import WardenMaintenance from "./WardenMaintenance";
import WardenNotifications from "./WardenNotifications";
import WardenAssets from "./WardenAssets";

const Warden = () => {
  const location = useLocation();
  let content = <WardenDashboard />;
  if (location.pathname === "/warden/assets") content = <WardenAssets />;
  if (location.pathname === "/warden/requests") content = <WardenRequests />;
  if (location.pathname === "/warden/maintenance") content = <WardenMaintenance />;
  if (location.pathname === "/warden/notifications") content = <WardenNotifications />;
  return <WardenLayout>{content}</WardenLayout>;
};

export default Warden; 