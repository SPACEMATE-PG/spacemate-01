import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { useState } from "react";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SuperAdminHeader = ({ activeTab, onTabChange }: SuperAdminHeaderProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊", shortLabel: "Overview" },
    { id: "subscriptions", label: "Subscriptions", icon: "💳", shortLabel: "Subs" },
    { id: "revenue", label: "Revenue", icon: "💰", shortLabel: "Revenue" },
    { id: "analytics", label: "Analytics", icon: "📈", shortLabel: "Analytics" },
    { id: "admins", label: "Admins", icon: "👥", shortLabel: "Admins" },
    { id: "bulk-ops", label: "Bulk Operations", icon: "✉️", shortLabel: "Bulk Ops" },
    { id: "activity", label: "Activity Log", icon: "⚡", shortLabel: "Activity" }
  ];

  const getTabTitle = (tabId: string) => {
    const currentTab = tabs.find(tab => tab.id === tabId);
    return currentTab ? currentTab.label : "Super Admin Dashboard";
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Dynamic Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex-shrink-0 shadow-md">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent truncate">
                Space Mate
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {getTabTitle(activeTab)}
              </p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-slate-50 border-gray-300 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="hover:bg-indigo-50 transition-all duration-200 rounded-full"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>

            {/* Sidebar Toggle for Mobile/Tablet */}
            <SuperAdminSidebar onTabChange={onTabChange} activeTab={activeTab} />
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs - Visible on Larger Screens */}
      <div className="hidden md:flex justify-center border-t border-slate-100 bg-slate-50 py-2 shadow-inner-t">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-5xl">
          <TabsList className="grid w-full grid-cols-7 h-10">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white 
                           data-[state=active]:shadow-md data-[state=active]:font-semibold 
                           hover:bg-indigo-100 transition-colors duration-200"
              >
                <span className="hidden sm:inline-block mr-2 text-base">{tab.icon}</span>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminHeader;
