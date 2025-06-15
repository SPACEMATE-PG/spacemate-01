import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Bell, 
  IndianRupee, // For Financial
  Building,    // For Rooms
  ClipboardList // For Requests
} from 'lucide-react';

interface PGAdminLayoutProps {
  children?: React.ReactNode;
}

const navigationItems = [
  { label: "Dashboard", icon: Home, path: "/pg-admin" },
  { label: "Guests", icon: Users, path: "/pg-admin/residents" },
  { label: "Rooms", icon: Building, path: "/pg-admin/rooms" },
  { label: "Requests", icon: ClipboardList, path: "/pg-admin/requests" },
  { label: "Financial", icon: IndianRupee, path: "/pg-admin/payments" },
  { label: "Notifications", icon: Bell, path: "/pg-admin/notifications" },
];

const PGAdminLayout: React.FC<PGAdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children || <Outlet />}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-around items-center h-16 px-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative flex flex-col items-center justify-center flex-1 h-full px-1 text-sm transition-colors duration-200
                    ${isActive 
                      ? 'text-indigo-600' 
                      : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                  {isActive && (
                    <div className="absolute top-0 h-0.5 bg-indigo-600 w-full rounded-t-sm"></div>
                  )}
                  <item.icon className="h-6 w-6" />
                  <span className="mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PGAdminLayout; 