
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SuperAdminSidebar from "./SuperAdminSidebar";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const SuperAdminHeader = ({ activeTab, onTabChange, onRefresh, isRefreshing }: SuperAdminHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg sticky top-0 z-20 animate-slide-up">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex-shrink-0 shadow-lg animate-scale-in">
              <Shield className="h-6 w-6 text-white drop-shadow-sm" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Space Mate
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
                Super Admin Dashboard
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="outline" className="bg-green-50/80 text-green-700 border-green-200 px-3 py-1.5 text-xs flex items-center shadow-sm animate-fade-in">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
              <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200 px-3 py-1.5 text-xs animate-fade-in">
                v2.1.0
              </Badge>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-white/70 border-gray-200/50 focus:bg-white transition-all duration-200"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-indigo-50 transition-all duration-200"
              onClick={() => onTabChange("activity")}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="hover:bg-indigo-50 transition-all duration-200"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>

            <SuperAdminSidebar onTabChange={onTabChange} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHeader;
