import { PGAdmin } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SuperAdminPricing from "./SuperAdminPricing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { useState, useMemo } from "react";

interface SuperAdminSubscriptionsProps {
  admins: PGAdmin[];
  isLoading?: boolean;
}

const SuperAdminSubscriptions = ({ admins, isLoading }: SuperAdminSubscriptionsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedAdmins = useMemo(() => {
    let filtered = admins;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((admin) => admin.subscriptionStatus === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === "monthlyRevenue") {
        return sortOrder === "asc" ? a.monthlyRevenue - b.monthlyRevenue : b.monthlyRevenue - a.monthlyRevenue;
      } else if (sortBy === "subscriptionStatus") {
        return sortOrder === "asc" ? a.subscriptionStatus.localeCompare(b.subscriptionStatus) : b.subscriptionStatus.localeCompare(a.subscriptionStatus);
      }
      return 0;
    });

    return filtered;
  }, [admins, searchTerm, filterStatus, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 lg:p-8">
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const getStatusCounts = (status: string) => admins.filter(admin => admin.subscriptionStatus === status).length;

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-lg">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{getStatusCounts('active')}</div>
            <p className="text-green-100 text-sm">Currently paying customers</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-yellow-600 text-white hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-lg">Trial Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{getStatusCounts('trial')}</div>
            <p className="text-orange-100 text-sm">Users in trial period</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-600 text-white hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-lg">Expired Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{getStatusCounts('expired')}</div>
            <p className="text-red-100 text-sm">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <CardTitle className="text-xl font-bold">All Subscriptions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                  Filter by Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("trial")}>Trial</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("expired")}>Expired</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                  Sort by <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("asc"); }}>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("desc"); }}>Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("monthlyRevenue"); setSortOrder("asc"); }}>Revenue (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("monthlyRevenue"); setSortOrder("desc"); }}>Revenue (High to Low)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("subscriptionStatus"); setSortOrder("asc"); }}>Status (A-Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("subscriptionStatus"); setSortOrder("desc"); }}>Status (Z-A)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={admin.subscriptionStatus === 'active' ? 'default' : admin.subscriptionStatus === 'trial' ? 'secondary' : 'destructive'}
                      >
                        {admin.subscriptionStatus.charAt(0).toUpperCase() + admin.subscriptionStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{admin.monthlyRevenue}</TableCell>
                    <TableCell>{admin.subscriptionPlan}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SuperAdminPricing />
    </div>
  );
};

export default SuperAdminSubscriptions;
