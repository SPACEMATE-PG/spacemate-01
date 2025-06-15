
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import SuperAdminSidebar from "./SuperAdminSidebar";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SuperAdminHeader = ({ activeTab, onTabChange }: SuperAdminHeaderProps) => {
  return (
    <>
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Space Mate
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Super Admin Dashboard
                </p>
              </div>
              <Badge variant="outline" className="ml-4 bg-green-50 text-green-700 border-green-200 px-3 py-1 text-xs flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
            {/* Menu Button on the right */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <SuperAdminSidebar onTabChange={onTabChange} activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHeader;
