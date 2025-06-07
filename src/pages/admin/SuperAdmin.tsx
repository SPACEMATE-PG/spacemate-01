
import { usePGAdmins, useAdminStats } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import SuperAdminMetrics from "@/components/admin/SuperAdminMetrics";
import AdminManagement from "@/components/admin/AdminManagement";
import ErrorBoundary from "@/components/admin/ErrorBoundary";
import SuperAdminHeader from "@/components/admin/SuperAdminHeader";
import SuperAdminTable from "@/components/admin/SuperAdminTable";
import SuperAdminPricing from "@/components/admin/SuperAdminPricing";

const SuperAdmin = () => {
  const { data: pgAdmins = [], isLoading, error, refetch } = usePGAdmins();
  const stats = useAdminStats(pgAdmins);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <SuperAdminHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <SuperAdminMetrics stats={stats} isLoading={isLoading} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <AdminManagement 
                admins={pgAdmins} 
                isLoading={isLoading} 
                onRefresh={() => refetch()}
              />
            </div>

            <div>
              <SuperAdminPricing />
            </div>
          </div>

          <SuperAdminTable pgAdmins={pgAdmins} isLoading={isLoading} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SuperAdmin;
