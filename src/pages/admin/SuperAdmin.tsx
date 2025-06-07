
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Calendar,
  Crown,
  Clock,
  Shield,
  Zap,
  AlertCircle
} from "lucide-react";
import { usePGAdmins, useAdminStats } from "@/hooks/usePGAdmins";
import SuperAdminMetrics from "@/components/admin/SuperAdminMetrics";
import AdminManagement from "@/components/admin/AdminManagement";
import ErrorBoundary from "@/components/admin/ErrorBoundary";

const SuperAdmin = () => {
  const { data: pgAdmins = [], isLoading, error, refetch } = usePGAdmins();
  const stats = useAdminStats(pgAdmins);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 font-medium">Active</Badge>;
      case "free":
        return <Badge className="bg-blue-100 text-blue-700 font-medium">Free Trial</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-700 font-medium">Expired</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 font-medium">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

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
        {/* Professional Header */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">Super Admin Dashboard</h1>
                    <p className="text-slate-600 text-sm mt-1">Revenue & Subscription Management Portal</p>
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Enhanced Key Metrics */}
          <SuperAdminMetrics stats={stats} isLoading={isLoading} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Enhanced Admin Management */}
            <div className="xl:col-span-2">
              <AdminManagement 
                admins={pgAdmins} 
                isLoading={isLoading} 
                onRefresh={() => refetch()}
              />
            </div>

            {/* Enhanced Pricing Section */}
            <div>
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="bg-white border-b border-slate-100 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
                    <Zap className="h-5 w-5 mr-3 text-indigo-600" />
                    Subscription Plans
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-blue-900 text-lg">Monthly Plan</h3>
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-blue-900 mb-2">₹1,000</div>
                        <div className="text-blue-700 text-sm mb-3">per PG per month</div>
                        <Badge className="bg-blue-200 text-blue-800 text-xs">Most Flexible</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 relative hover:shadow-md transition-all duration-200">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600 text-white text-xs px-3 py-1">POPULAR</Badge>
                      </div>
                      <CardContent className="p-5 pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-purple-900 text-lg">6-Month Plan</h3>
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-purple-900 mb-2">₹5,500</div>
                        <div className="text-purple-700 text-sm mb-3">per PG (save ₹500)</div>
                        <Badge className="bg-purple-200 text-purple-800 text-xs">8% Discount</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-emerald-900 text-lg">Yearly Plan</h3>
                          <Crown className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="text-3xl font-bold text-emerald-900 mb-2">₹10,000</div>
                        <div className="text-emerald-700 text-sm mb-3">per PG (save ₹2,000)</div>
                        <Badge className="bg-emerald-200 text-emerald-800 text-xs">17% Discount</Badge>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-900 text-sm">Free Trial</h4>
                          <p className="text-xs text-amber-800">2-3 months complimentary access for new PG admins</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Desktop Table */}
          <div className="hidden lg:block">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-white border-b border-slate-100 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-slate-900">Detailed Admin Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-8 space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="font-semibold text-slate-700">Admin Details</TableHead>
                          <TableHead className="font-semibold text-slate-700">Common ID</TableHead>
                          <TableHead className="font-semibold text-slate-700">Properties</TableHead>
                          <TableHead className="font-semibold text-slate-700">Subscription</TableHead>
                          <TableHead className="font-semibold text-slate-700">Revenue</TableHead>
                          <TableHead className="font-semibold text-slate-700">Last Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pgAdmins.map((admin) => (
                          <TableRow key={admin.id} className="hover:bg-slate-50 transition-colors">
                            <TableCell className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                  {admin.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900">{admin.name}</div>
                                  <div className="text-sm text-slate-500">{admin.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-slate-300 text-slate-700">{admin.commonId}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-center">
                                <div className="font-semibold text-slate-900">
                                  {admin.totalPGs} / <span className="text-emerald-600">{admin.activePGs}</span>
                                </div>
                                <div className="text-xs text-slate-500">Total / Active</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(admin.subscriptionStatus)}
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold text-emerald-600 text-lg">
                                ₹{admin.monthlyRevenue.toLocaleString()}
                              </div>
                              <div className="text-xs text-slate-500">per month</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-slate-600">
                                {new Date(admin.lastActive).toLocaleDateString()}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SuperAdmin;
