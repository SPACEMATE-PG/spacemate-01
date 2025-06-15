import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  BarChart2, 
  PieChart, 
  LineChart, 
  Calendar, 
  Users, 
  IndianRupee, 
  TrendingUp,
  AlertCircle,
  Wrench,
  Receipt,
  Wallet
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PGAdminLayout from "@/components/admin/PGAdminLayout";

// Mock data - replace with actual API data
const mockOccupancyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [85, 90, 88, 92, 95, 89]
};

const mockRevenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [120000, 125000, 130000, 128000, 132000, 135000]
};

const mockExpenseData = {
  labels: ["Utilities", "Maintenance", "Staff", "Supplies", "Other"],
  data: [30000, 25000, 40000, 15000, 10000]
};

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("month");
  const [showGenerateReport, setShowGenerateReport] = useState(false);

  const handleBack = () => {
    navigate("/pg-admin");
  };

  const handleGenerateReport = () => {
    setShowGenerateReport(true);
  };

  const handleDownloadReport = (type: string) => {
    // TODO: Implement report download
    console.log(`Downloading ${type} report`);
  };

  return (
    <PGAdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="quarter">Last 3 Months</SelectItem>
                    <SelectItem value="year">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleGenerateReport}
                className="bg-hostel-primary hover:bg-hostel-secondary"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹1,25,000</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Occupancy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-gray-500">Current occupancy</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,000</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-gray-400" />
                    {/* Add actual chart component here */}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <PieChart className="h-8 w-8 text-gray-400" />
                    {/* Add actual chart component here */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("revenue")}
                    >
                      <IndianRupee className="h-4 w-4 mr-2" />
                      Revenue Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("expenses")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Expense Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("profit")}
                    >
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Profit & Loss Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("pending")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Pending Payments
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("overdue")}
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Overdue Payments
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("collection")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Collection Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("current")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Current Occupancy
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("history")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Occupancy History
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("forecast")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Occupancy Forecast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("availability")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Room Availability
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("maintenance")}
                    >
                      <Wrench className="h-4 w-4 mr-2" />
                      Maintenance Schedule
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("utilization")}
                    >
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Room Utilization
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="occupancy">Occupancy</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="guests">Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Last 7 Days</SelectItem>
                          <SelectItem value="month">Last 30 Days</SelectItem>
                          <SelectItem value="quarter">Last 3 Months</SelectItem>
                          <SelectItem value="year">Last 12 Months</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Include Data</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="revenue" className="rounded" />
                        <label htmlFor="revenue">Revenue</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="expenses" className="rounded" />
                        <label htmlFor="expenses">Expenses</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="occupancy" className="rounded" />
                        <label htmlFor="occupancy">Occupancy</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="maintenance" className="rounded" />
                        <label htmlFor="maintenance">Maintenance</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-hostel-primary hover:bg-hostel-secondary"
                      onClick={handleGenerateReport}
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Generate Report Dialog */}
        <Dialog open={showGenerateReport} onOpenChange={setShowGenerateReport}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Report</DialogTitle>
              <DialogDescription>
                Generate a report in your preferred format.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Format</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowGenerateReport(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-hostel-primary hover:bg-hostel-secondary"
                  onClick={() => setShowGenerateReport(false)}
                >
                  Generate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PGAdminLayout>
  );
};

export default Reports; 