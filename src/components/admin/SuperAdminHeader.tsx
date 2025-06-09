
import { Badge } from "@/components/ui/badge";
import { Shield, Menu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBulkOperationsClick: () => void;
}

const SuperAdminHeader = ({ activeTab, onTabChange, onBulkOperationsClick }: SuperAdminHeaderProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊", shortLabel: "Overview" },
    { id: "subscriptions", label: "Subscriptions", icon: "💳", shortLabel: "Subs" },
    { id: "revenue", label: "Revenue", icon: "💰", shortLabel: "Revenue" },
    { id: "analytics", label: "Analytics", icon: "📈", shortLabel: "Analytics" },
    { id: "admins", label: "Admin Management", icon: "👥", shortLabel: "Admins" },
    { id: "activity", label: "Live Activity", icon: "⚡", shortLabel: "Activity" }
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem onClick={onBulkOperationsClick}>
                    Admin Operations
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex-shrink-0">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate">
                  Super Admin Dashboard
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 hidden sm:block">
                  Subscription & Revenue Management Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 lg:px-3 py-1 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 lg:mr-2"></div>
                <span className="hidden sm:inline">System </span>Online
              </Badge>
              <div className="text-xs lg:text-sm text-slate-500 hidden md:block">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-6 h-10 lg:h-12 bg-slate-100 p-1">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all px-1 lg:px-3"
                >
                  <span className="text-sm lg:text-base">{tab.icon}</span>
                  <span className="hidden sm:inline lg:hidden">{tab.shortLabel}</span>
                  <span className="hidden lg:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHeader;
