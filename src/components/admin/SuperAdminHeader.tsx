
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { useEffect, useState } from "react";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SuperAdminHeader = ({ activeTab, onTabChange }: SuperAdminHeaderProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊", shortLabel: "Overview" },
    { id: "subscriptions", label: "Subscription Management", icon: "💳", shortLabel: "Subs" },
    { id: "revenue", label: "Revenue", icon: "💰", shortLabel: "Revenue" },
    { id: "analytics", label: "Data Analytics", icon: "📈", shortLabel: "Analytics" },
    { id: "admins", label: "PG Admin Management", icon: "👥", shortLabel: "Admins" },
    { id: "bulk-ops", label: "Admin Operations", icon: <Send className="h-6 w-6" />, shortLabel: "Admin Ops" },
    { id: "activity", label: "Live Activity", icon: "⚡", shortLabel: "Activity" }
  ];

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
                  Subscription & Revenue Management Portal
                </p>
              </div>
              <Badge variant="outline" className="ml-4 bg-green-50 text-green-700 border-green-200 px-3 py-1 text-xs flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
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
      {/* Large Page Title */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 pb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Super Admin Dashboard</h2>
      </div>
      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-2">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-7 h-16 bg-slate-100 p-1 gap-2">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex flex-col items-center justify-center gap-2 text-xs lg:text-sm font-medium data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-lg data-[state=active]:scale-110 transition-all px-1 lg:px-3 h-full"
              >
                <span className={typeof tab.icon === 'string' ? 'text-2xl' : ''}>
                  {tab.icon}
                </span>
                <span className="hidden sm:inline lg:hidden">{tab.shortLabel}</span>
                <span className="hidden lg:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default SuperAdminHeader;
