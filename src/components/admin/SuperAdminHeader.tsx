
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SuperAdminHeader = ({ activeTab, onTabChange }: SuperAdminHeaderProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "subscriptions", label: "Subscriptions", icon: "💳" },
    { id: "revenue", label: "Revenue", icon: "💰" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "admins", label: "Admin Management", icon: "👥" },
    { id: "activity", label: "Live Activity", icon: "⚡" }
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Super Admin Dashboard</h1>
                  <p className="text-slate-600 text-sm mt-1">Subscription & Revenue Management Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Online
              </Badge>
              <div className="text-sm text-slate-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-12 bg-slate-100">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all"
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
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
