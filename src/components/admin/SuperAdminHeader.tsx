
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuperAdminSidebar from "./SuperAdminSidebar";

interface SuperAdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SuperAdminHeader = ({ activeTab, onTabChange }: SuperAdminHeaderProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊", shortLabel: "Overview", gradient: "from-blue-500 to-indigo-600" },
    { id: "subscriptions", label: "Subscription Management", icon: "💳", shortLabel: "Subs", gradient: "from-green-500 to-emerald-600" },
    { id: "revenue", label: "Revenue", icon: "💰", shortLabel: "Revenue", gradient: "from-yellow-500 to-amber-600" },
    { id: "analytics", label: "Data Analytics", icon: "📈", shortLabel: "Analytics", gradient: "from-purple-500 to-violet-600" },
    { id: "admins", label: "PG Admin Management", icon: "👥", shortLabel: "Admins", gradient: "from-cyan-500 to-blue-600" },
    { id: "bulk-ops", label: "Admin Operations", icon: "⚙️", shortLabel: "Admin Ops", gradient: "from-orange-500 to-red-600" },
    { id: "activity", label: "Live Activity", icon: "⚡", shortLabel: "Activity", gradient: "from-pink-500 to-rose-600" }
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

      {/* Image Navigation - Desktop Only */}
      <div className="hidden lg:block max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-7 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'ring-4 ring-indigo-200 scale-105 shadow-xl' 
                  : 'hover:scale-102 hover:shadow-lg'
              }`}
            >
              <div className={`bg-gradient-to-br ${tab.gradient} p-6 text-center`}>
                <div className="text-4xl mb-2">{tab.icon}</div>
                <h3 className="text-white font-semibold text-sm">{tab.label}</h3>
              </div>
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                activeTab === tab.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-10'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Tabs - Mobile/Tablet Only */}
      <div className="lg:hidden max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-2">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-16 bg-slate-100 p-1 gap-1">
            {tabs.slice(0, 4).map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex flex-col items-center justify-center gap-1 text-xs font-medium data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-lg transition-all px-1 h-full"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${tab.gradient} flex items-center justify-center`}>
                  <span className="text-white text-lg">{tab.icon}</span>
                </div>
                <span className="hidden sm:inline">{tab.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default SuperAdminHeader;
