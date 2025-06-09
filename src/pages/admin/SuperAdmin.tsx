
import { useState } from "react";
import { usePGAdmins, useAdminStats } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import ErrorBoundary from "@/components/admin/ErrorBoundary";
import SuperAdminHeader from "@/components/admin/SuperAdminHeader";
import SuperAdminOverview from "@/components/admin/SuperAdminOverview";
import SuperAdminSubscriptions from "@/components/admin/SuperAdminSubscriptions";
import SuperAdminRevenue from "@/components/admin/SuperAdminRevenue";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import AdminManagement from "@/components/admin/AdminManagement";
import LiveActivityFeed from "@/components/admin/LiveActivityFeed";
import AdminDetailModal from "@/components/admin/AdminDetailModal";
import { PGAdmin } from "@/hooks/usePGAdmins";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const SuperAdmin = () => {
  const { data: pgAdmins = [], isLoading, error, refetch } = usePGAdmins();
  const stats = useAdminStats(pgAdmins);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [selectedAdminForDetail, setSelectedAdminForDetail] = useState<PGAdmin | null>(null);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-8">
        <Card className="border-red-200 bg-red-50 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              Failed to Load Super Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">
              There was an error loading the dashboard data. Please check your connection and try again.
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <SuperAdminHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview" className="mt-0">
              <SuperAdminOverview 
                stats={stats} 
                isLoading={isLoading} 
                onTabChange={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-0">
              <SuperAdminSubscriptions admins={pgAdmins} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="revenue" className="mt-0">
              <SuperAdminRevenue stats={stats} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <AnalyticsDashboard stats={stats} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="admins" className="mt-0">
              <AdminManagement 
                admins={pgAdmins} 
                isLoading={isLoading} 
                onRefresh={() => refetch()}
                selectedAdmins={selectedAdmins}
                onSelectionChange={setSelectedAdmins}
                onAdminClick={setSelectedAdminForDetail}
              />
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <LiveActivityFeed />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <AdminDetailModal
          admin={selectedAdminForDetail}
          isOpen={!!selectedAdminForDetail}
          onClose={() => setSelectedAdminForDetail(null)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default SuperAdmin;
