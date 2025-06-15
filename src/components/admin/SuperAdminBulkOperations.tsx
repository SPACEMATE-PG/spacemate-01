
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const SuperAdminBulkOperations = () => {
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

  const managers = dummyManagers;
  const wardens = dummyWardens;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Operations</h2>
        <p className="text-slate-600">Manage PG Managers and Wardens with bulk operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PG Manager Box */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm">👨‍💼</span>
              </div>
              PG Manager
              <Button size="sm" variant="outline" className="ml-auto" onClick={() => setShowManagerModal(true)}>
                <Plus className="h-4 w-4 mr-1" /> Create New
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <label className="block font-medium mb-2 text-blue-900">Select Managers:</label>
            <div className="bg-white p-3 rounded border max-h-40 overflow-y-auto mb-4 shadow-sm">
              {managers.map(m => (
                <label key={m.id} className="flex items-center gap-2 cursor-pointer mb-2 p-2 hover:bg-blue-50 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedManagers.includes(m.id)}
                    onChange={e => {
                      if (e.target.checked) setSelectedManagers(prev => [...prev, m.id]);
                      else setSelectedManagers(prev => prev.filter(id => id !== m.id));
                    }}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.email}</div>
                  </div>
                </label>
              ))}
            </div>
            <label className="block font-medium mb-2 text-blue-900">Message:</label>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[100px] mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={managerMessage}
              onChange={e => setManagerMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition w-full"
              disabled={selectedManagers.length === 0 || !managerMessage}
              onClick={() => {
                setSendSuccess("Manager");
                setManagerMessage("");
                setSelectedManagers([]);
                setTimeout(() => setSendSuccess(""), 2000);
              }}
            >
              Send Intimation ({selectedManagers.length} selected)
            </Button>
            {sendSuccess === "Manager" && (
              <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
                ✅ Intimation sent to selected managers!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warden Box */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                <span className="text-white text-sm">🛡️</span>
              </div>
              Warden
              <Button size="sm" variant="outline" className="ml-auto" onClick={() => setShowWardenModal(true)}>
                <Plus className="h-4 w-4 mr-1" /> Create New
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <label className="block font-medium mb-2 text-purple-900">Select Wardens:</label>
            <div className="bg-white p-3 rounded border max-h-40 overflow-y-auto mb-4 shadow-sm">
              {wardens.map(w => (
                <label key={w.id} className="flex items-center gap-2 cursor-pointer mb-2 p-2 hover:bg-purple-50 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedWardens.includes(w.id)}
                    onChange={e => {
                      if (e.target.checked) setSelectedWardens(prev => [...prev, w.id]);
                      else setSelectedWardens(prev => prev.filter(id => id !== w.id));
                    }}
                    className="accent-purple-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{w.name}</div>
                    <div className="text-xs text-gray-500">{w.email}</div>
                  </div>
                </label>
              ))}
            </div>
            <label className="block font-medium mb-2 text-purple-900">Message:</label>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[100px] mb-4 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={wardenMessage}
              onChange={e => setWardenMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Button
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition w-full"
              disabled={selectedWardens.length === 0 || !wardenMessage}
              onClick={() => {
                setSendSuccess("Warden");
                setWardenMessage("");
                setSelectedWardens([]);
                setTimeout(() => setSendSuccess(""), 2000);
              }}
            >
              Send Intimation ({selectedWardens.length} selected)
            </Button>
            {sendSuccess === "Warden" && (
              <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
                ✅ Intimation sent to selected wardens!
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create New Manager Modal */}
      <Dialog open={showManagerModal} onOpenChange={setShowManagerModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">👨‍💼</span>
              </div>
              Create New PG Manager
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={e => { 
            e.preventDefault(); 
            setShowManagerModal(false); 
            setNewManager({ name: "", email: "" }); 
          }} className="space-y-4">
            <Input
              placeholder="Manager Name"
              value={newManager.name}
              onChange={e => setNewManager({ ...newManager, name: e.target.value })}
              required
            />
            <Input
              placeholder="Manager Email"
              type="email"
              value={newManager.email}
              onChange={e => setNewManager({ ...newManager, email: e.target.value })}
              required
            />
            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
              Create Manager
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create New Warden Modal */}
      <Dialog open={showWardenModal} onOpenChange={setShowWardenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center">
                <span className="text-white text-xs">🛡️</span>
              </div>
              Create New Warden
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={e => { 
            e.preventDefault(); 
            setShowWardenModal(false); 
            setNewWarden({ name: "", email: "" }); 
          }} className="space-y-4">
            <Input
              placeholder="Warden Name"
              value={newWarden.name}
              onChange={e => setNewWarden({ ...newWarden, name: e.target.value })}
              required
            />
            <Input
              placeholder="Warden Email"
              type="email"
              value={newWarden.email}
              onChange={e => setNewWarden({ ...newWarden, email: e.target.value })}
              required
            />
            <Button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-700">
              Create Warden
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminBulkOperations;
