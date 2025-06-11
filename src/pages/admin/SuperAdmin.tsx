import { useState } from "react";
import { usePGAdmins, useAdminStats } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Plus } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SuperAdmin = () => {
  const { data: pgAdmins = [], isLoading, error, refetch } = usePGAdmins();
  const stats = useAdminStats(pgAdmins);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [selectedAdminForDetail, setSelectedAdminForDetail] = useState<PGAdmin | null>(null);
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // Admin Operations state
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);
  const [selectedWardens, setSelectedWardens] = useState<string[]>([]);
  const [managerMessage, setManagerMessage] = useState("");
  const [wardenMessage, setWardenMessage] = useState("");
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [showWardenModal, setShowWardenModal] = useState(false);
  const [newManager, setNewManager] = useState({ name: "", email: "" });
  const [newWarden, setNewWarden] = useState({ name: "", email: "" });
  const [sendSuccess, setSendSuccess] = useState("");

  // Dummy users for demonstration
  const dummyManagers = [
    { id: "m1", name: "Rajesh Kumar", email: "rajesh@pgowner.com" },
    { id: "m2", name: "Priya Sharma", email: "priya@hostels.com" },
    { id: "m3", name: "Amit Patel", email: "amit@pgmanagement.com" },
  ];
  const dummyWardens = [
    { id: "w1", name: "Suresh Warden", email: "suresh.warden@pg.com" },
    { id: "w2", name: "Meena Warden", email: "meena.warden@pg.com" },
    { id: "w3", name: "John Warden", email: "john.warden@pg.com" },
  ];

  // Use dummy users for both lists
  const managers = dummyManagers;
  const wardens = dummyWardens;

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
        <SuperAdminHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />

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

            <TabsContent value="bulk-ops" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PG Manager Box */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      PG Manager
                      <Button size="sm" variant="outline" className="ml-auto" onClick={() => setShowManagerModal(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Create New
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <label className="block font-medium mb-2 text-blue-900">Select Managers:</label>
                    <div className="bg-white p-2 rounded border max-h-40 overflow-y-auto mb-4">
                      {managers.map(m => (
                        <label key={m.id} className="flex items-center gap-2 cursor-pointer mb-1">
                          <input
                            type="checkbox"
                            checked={selectedManagers.includes(m.id)}
                            onChange={e => {
                              if (e.target.checked) setSelectedManagers(prev => [...prev, m.id]);
                              else setSelectedManagers(prev => prev.filter(id => id !== m.id));
                            }}
                            className="accent-blue-600"
                          />
                          <span>{m.name} <span className="text-xs text-gray-500">({m.email})</span></span>
                        </label>
                      ))}
                    </div>
                    <label className="block font-medium mb-2 text-blue-900">Message:</label>
                    <textarea
                      className="w-full p-2 border rounded min-h-[80px] mb-4"
                      value={managerMessage}
                      onChange={e => setManagerMessage(e.target.value)}
                      placeholder="Type your message here..."
                    />
                    <Button
                      className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition w-full"
                      disabled={selectedManagers.length === 0 || !managerMessage}
                      onClick={() => {
                        setSendSuccess("Manager");
                        setManagerMessage("");
                        setSelectedManagers([]);
                        setTimeout(() => setSendSuccess(""), 2000);
                      }}
                    >
                      Send Intimation
                    </Button>
                    {sendSuccess === "Manager" && (
                      <div className="mt-2 text-green-700 font-medium">Intimation sent to selected managers!</div>
                    )}
                  </CardContent>
                </Card>
                {/* Warden Box */}
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      Warden
                      <Button size="sm" variant="outline" className="ml-auto" onClick={() => setShowWardenModal(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Create New
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <label className="block font-medium mb-2 text-purple-900">Select Wardens:</label>
                    <div className="bg-white p-2 rounded border max-h-40 overflow-y-auto mb-4">
                      {wardens.map(w => (
                        <label key={w.id} className="flex items-center gap-2 cursor-pointer mb-1">
                          <input
                            type="checkbox"
                            checked={selectedWardens.includes(w.id)}
                            onChange={e => {
                              if (e.target.checked) setSelectedWardens(prev => [...prev, w.id]);
                              else setSelectedWardens(prev => prev.filter(id => id !== w.id));
                            }}
                            className="accent-purple-600"
                          />
                          <span>{w.name} <span className="text-xs text-gray-500">({w.email})</span></span>
                        </label>
                      ))}
                    </div>
                    <label className="block font-medium mb-2 text-purple-900">Message:</label>
                    <textarea
                      className="w-full p-2 border rounded min-h-[80px] mb-4"
                      value={wardenMessage}
                      onChange={e => setWardenMessage(e.target.value)}
                      placeholder="Type your message here..."
                    />
                    <Button
                      className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition w-full"
                      disabled={selectedWardens.length === 0 || !wardenMessage}
                      onClick={() => {
                        setSendSuccess("Warden");
                        setWardenMessage("");
                        setSelectedWardens([]);
                        setTimeout(() => setSendSuccess(""), 2000);
                      }}
                    >
                      Send Intimation
                    </Button>
                    {sendSuccess === "Warden" && (
                      <div className="mt-2 text-green-700 font-medium">Intimation sent to selected wardens!</div>
                    )}
                  </CardContent>
                </Card>
              </div>
              {/* Create New Manager Modal */}
              <Dialog open={showManagerModal} onOpenChange={setShowManagerModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New PG Manager</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={e => { e.preventDefault(); setShowManagerModal(false); setNewManager({ name: "", email: "" }); }}>
                    <Input
                      className="mb-3"
                      placeholder="Manager Name"
                      value={newManager.name}
                      onChange={e => setNewManager({ ...newManager, name: e.target.value })}
                      required
                    />
                    <Input
                      className="mb-3"
                      placeholder="Manager Email"
                      type="email"
                      value={newManager.email}
                      onChange={e => setNewManager({ ...newManager, email: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full bg-indigo-600 text-white">Create</Button>
                  </form>
                </DialogContent>
              </Dialog>
              {/* Create New Warden Modal */}
              <Dialog open={showWardenModal} onOpenChange={setShowWardenModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Warden</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={e => { e.preventDefault(); setShowWardenModal(false); setNewWarden({ name: "", email: "" }); }}>
                    <Input
                      className="mb-3"
                      placeholder="Warden Name"
                      value={newWarden.name}
                      onChange={e => setNewWarden({ ...newWarden, name: e.target.value })}
                      required
                    />
                    <Input
                      className="mb-3"
                      placeholder="Warden Email"
                      type="email"
                      value={newWarden.email}
                      onChange={e => setNewWarden({ ...newWarden, email: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full bg-purple-600 text-white">Create</Button>
                  </form>
                </DialogContent>
              </Dialog>
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
