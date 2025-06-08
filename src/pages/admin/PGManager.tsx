
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { 
  Users, 
  Home as HomeIcon, 
  TrendingUp, 
  Calendar,
  DollarSign,
  UserCheck,
  AlertCircle,
  Plus
} from "lucide-react";

const PGManager = () => {
  // Mock data for PG Manager dashboard
  const pgStats = {
    totalRooms: 50,
    occupiedRooms: 42,
    totalGuests: 42,
    monthlyRevenue: 630000,
    pendingRequests: 5,
    maintenanceIssues: 2
  };

  const occupancyRate = (pgStats.occupiedRooms / pgStats.totalRooms * 100).toFixed(1);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">PG Manager Dashboard</h1>
                  <p className="text-gray-600">Manage your PG operations and monitor performance</p>
                </div>
                <Button className="bg-hostel-primary hover:bg-hostel-secondary">
                  <Plus size={16} className="mr-2" />
                  Add New Guest
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                  <HomeIcon className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pgStats.totalRooms}</div>
                  <p className="text-xs text-blue-100">
                    {pgStats.occupiedRooms} occupied, {pgStats.totalRooms - pgStats.occupiedRooms} available
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{occupancyRate}%</div>
                  <p className="text-xs text-green-100">
                    {pgStats.occupiedRooms} out of {pgStats.totalRooms} rooms
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                  <Users className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pgStats.totalGuests}</div>
                  <p className="text-xs text-purple-100">
                    Active residents
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{pgStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-orange-100">
                    This month's collection
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-hostel-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Guests
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Room Allocation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Meal Planning
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Payment Collection
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Pending Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Guest Applications</span>
                    <Badge variant="secondary">{pgStats.pendingRequests}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maintenance Issues</span>
                    <Badge variant="destructive">{pgStats.maintenanceIssues}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Payments</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Room Inspections</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New guest checked in</p>
                      <p className="text-xs text-gray-500">Room 205 - Rahul Kumar - 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-gray-500">₹15,000 from Priya Sharma - 5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maintenance request</p>
                      <p className="text-xs text-gray-500">AC repair in Room 301 - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PGManager;
