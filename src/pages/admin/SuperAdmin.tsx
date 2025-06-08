
import { useState } from "react";
import { usePGAdmins, useAdminStats } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import SuperAdminMetrics from "@/components/admin/SuperAdminMetrics";
import AdminManagement from "@/components/admin/AdminManagement";
import ErrorBoundary from "@/components/admin/ErrorBoundary";
import SuperAdminHeader from "@/components/admin/SuperAdminHeader";
import SuperAdminTable from "@/components/admin/SuperAdminTable";
import SuperAdminPricing from "@/components/admin/SuperAdminPricing";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import AdminBulkActions from "@/components/admin/AdminBulkActions";
import AdminDetailModal from "@/components/admin/AdminDetailModal";
import LiveActivityFeed from "@/components/admin/LiveActivityFeed";
import { PGAdmin } from "@/hooks/usePGAdmins";

const SuperAdmin = () => {
  const { data: pgAdmins = [], isLoading, error, refetch } = usePGAdmins();
  const stats = useAdminStats(pgAdmins);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [selectedAdminForDetail, setSelectedAdminForDetail] = useState<PGAdmin | null>(null);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
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
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
          <AdminSidebar />
          <SidebarInset className="flex-1">
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <SuperAdminHeader />
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <SuperAdminMetrics stats={stats} isLoading={isLoading} />

              <AnalyticsDashboard stats={stats} isLoading={isLoading} />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  <AdminBulkActions 
                    admins={pgAdmins}
                    selectedAdmins={selectedAdmins}
                    onSelectionChange={setSelectedAdmins}
                  />

                  <AdminManagement 
                    admins={pgAdmins} 
                    isLoading={isLoading} 
                    onRefresh={() => refetch()}
                    selectedAdmins={selectedAdmins}
                    onSelectionChange={setSelectedAdmins}
                    onAdminClick={setSelectedAdminForDetail}
                  />
                </div>

                <div className="space-y-8">
                  <SuperAdminPricing />
                  <LiveActivityFeed />
                </div>
              </div>

              <SuperAdminTable pgAdmins={pgAdmins} isLoading={isLoading} />
            </div>

            <AdminDetailModal
              admin={selectedAdminForDetail}
              isOpen={!!selectedAdminForDetail}
              onClose={() => setSelectedAdminForDetail(null)}
            />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
};

export default SuperAdmin;
