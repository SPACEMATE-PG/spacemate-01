import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Plus, Check, X, History, Trash2, Download } from "lucide-react";

const initialAssets = [
  { id: 1, name: "Cot", category: "Furniture", quantity: 20, status: "Good", lastUpdated: "2024-06-15", note: "", history: [{date: "2024-06-15", change: "Added Cot (20)"}] },
  { id: 2, name: "Bed", category: "Furniture", quantity: 20, status: "Good", lastUpdated: "2024-06-15", note: "", history: [{date: "2024-06-15", change: "Added Bed (20)"}] },
  { id: 3, name: "Washing Machine", category: "Appliance", quantity: 2, status: "Needs Attention", lastUpdated: "2024-06-10", note: "Leaking pipe", history: [{date: "2024-06-10", change: "Status updated to Needs Attention"}] },
  { id: 4, name: "Water Purifier", category: "Appliance", quantity: 1, status: "Good", lastUpdated: "2024-06-12", note: "", history: [{date: "2024-06-12", change: "Added Water Purifier (1)"}] },
  { id: 5, name: "Common Area Sofa", category: "Furniture", quantity: 3, status: "Good", lastUpdated: "2024-06-13", note: "", history: [{date: "2024-06-13", change: "Added Common Area Sofa (3)"}] },
];

const statusOptions = ["Good", "Needs Attention", "Out of Order"];
const categoryOptions = ["All", "Furniture", "Appliance"];

function exportToCSV(data) {
  const csvRows = [
    ["Name", "Category", "Quantity", "Status", "Last Updated", "Note"],
    ...data.map(a => [a.name, a.category, a.quantity, a.status, a.lastUpdated, a.note || ""]),
  ];
  const csvContent = csvRows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "assets.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const WardenAssets = () => {
  const { toast } = useToast();
  const [assets, setAssets] = useState(initialAssets);
  const [editingAsset, setEditingAsset] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: "", category: "", quantity: 1, status: "Good", note: "" });
  const [editFields, setEditFields] = useState({ id: null, quantity: 1, status: "Good", note: "" });
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [showHistory, setShowHistory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleEdit = (asset) => {
    setEditingAsset(asset.id);
    setEditFields({ id: asset.id, quantity: asset.quantity, status: asset.status, note: asset.note || "" });
  };

  const handleSaveEdit = () => {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === editFields.id
          ? { ...a, quantity: editFields.quantity, status: editFields.status, note: editFields.note, lastUpdated: new Date().toISOString().slice(0, 10), history: [{date: new Date().toISOString().slice(0, 10), change: `Edited asset (${editFields.quantity}, ${editFields.status})`}, ...(a.history || [])] }
          : a
      )
    );
    setEditingAsset(null);
    toast({ title: "Asset updated", description: "Asset details updated successfully." });
  };

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.category) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setAssets((prev) => [
      {
        ...newAsset,
        id: prev.length + 1,
        lastUpdated: new Date().toISOString().slice(0, 10),
        history: [{date: new Date().toISOString().slice(0, 10), change: `Added ${newAsset.name} (${newAsset.quantity})`}],
      },
      ...prev,
    ]);
    setIsAddDialogOpen(false);
    setNewAsset({ name: "", category: "", quantity: 1, status: "Good", note: "" });
    toast({ title: "Asset added", description: "New asset added successfully." });
  };

  const handleDelete = (id) => {
    setAssets(prev => prev.filter(a => a.id !== id));
    setDeleteConfirm(null);
    toast({ title: "Asset deleted", description: "Asset removed from the list." });
  };

  let filtered = assets.filter(a =>
    (filterCategory === "All" || a.category === filterCategory) &&
    (filterStatus === "All" || a.status === filterStatus) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()))
  );
  filtered = filtered.sort((a, b) => {
    if (sortBy === "name") return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    if (sortBy === "status") return sortDir === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    if (sortBy === "lastUpdated") return sortDir === "asc" ? a.lastUpdated.localeCompare(b.lastUpdated) : b.lastUpdated.localeCompare(a.lastUpdated);
    return 0;
  });

  return (
    <div className="max-w-3xl mx-auto w-full px-2 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold">Asset Management</h2>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2" onClick={() => exportToCSV(filtered)}><Download className="h-4 w-4" />Export CSV</Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-2">
                <Input placeholder="Asset Name*" value={newAsset.name} onChange={e => setNewAsset({ ...newAsset, name: e.target.value })} />
                <Input placeholder="Category*" value={newAsset.category} onChange={e => setNewAsset({ ...newAsset, category: e.target.value })} />
                <Input type="number" min={1} placeholder="Quantity*" value={newAsset.quantity} onChange={e => setNewAsset({ ...newAsset, quantity: Number(e.target.value) })} />
                <select className="border rounded px-2 py-1" value={newAsset.status} onChange={e => setNewAsset({ ...newAsset, status: e.target.value })}>
                  {statusOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                </select>
                <Input placeholder="Note (optional)" value={newAsset.note} onChange={e => setNewAsset({ ...newAsset, note: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAsset}>Add</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-32" />
        <select className="border rounded px-2 py-1" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          {categoryOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
        </select>
        <select className="border rounded px-2 py-1" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {statusOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
        </select>
        <select className="border rounded px-2 py-1" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
          <option value="lastUpdated">Sort by Last Updated</option>
        </select>
        <select className="border rounded px-2 py-1" value={sortDir} onChange={e => setSortDir(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(asset => (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>
                      {editingAsset === asset.id ? (
                        <Input type="number" min={1} value={editFields.quantity} onChange={e => setEditFields({ ...editFields, quantity: Number(e.target.value) })} className="w-20" />
                      ) : (
                        asset.quantity
                      )}
                    </TableCell>
                    <TableCell>
                      {editingAsset === asset.id ? (
                        <select className="border rounded px-2 py-1" value={editFields.status} onChange={e => setEditFields({ ...editFields, status: e.target.value })}>
                          {statusOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                        </select>
                      ) : (
                        <Badge variant={asset.status === "Good" ? "default" : asset.status === "Needs Attention" ? "secondary" : "destructive"}>{asset.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{asset.lastUpdated}</TableCell>
                    <TableCell>
                      {editingAsset === asset.id ? (
                        <Input value={editFields.note} onChange={e => setEditFields({ ...editFields, note: e.target.value })} className="w-32" />
                      ) : (
                        asset.note || "-"
                      )}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setShowHistory(asset.id)}><History className="h-4 w-4" /></Button>
                      {editingAsset === asset.id ? (
                        <>
                          <Button size="icon" variant="ghost" onClick={handleSaveEdit}><Check className="h-4 w-4 text-green-600" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingAsset(null)}><X className="h-4 w-4 text-red-600" /></Button>
                        </>
                      ) : (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(asset)}><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleteConfirm(asset.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(asset => (
          <Card key={asset.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">{asset.name}</CardTitle>
                <div className="text-xs text-gray-500">{asset.category}</div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => setShowHistory(asset.id)}><History className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleEdit(asset)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setDeleteConfirm(asset.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {editingAsset === asset.id ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="text-xs">Qty:</span><Input type="number" min={1} value={editFields.quantity} onChange={e => setEditFields({ ...editFields, quantity: Number(e.target.value) })} className="w-20" /></div>
                  <div className="flex items-center gap-2"><span className="text-xs">Status:</span><select className="border rounded px-2 py-1" value={editFields.status} onChange={e => setEditFields({ ...editFields, status: e.target.value })}>{statusOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}</select></div>
                  <div className="flex items-center gap-2"><span className="text-xs">Note:</span><Input value={editFields.note} onChange={e => setEditFields({ ...editFields, note: e.target.value })} className="w-32" /></div>
                  <div className="flex gap-2 mt-2"><Button size="icon" variant="ghost" onClick={handleSaveEdit}><Check className="h-4 w-4 text-green-600" /></Button><Button size="icon" variant="ghost" onClick={() => setEditingAsset(null)}><X className="h-4 w-4 text-red-600" /></Button></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm"><span>Qty:</span> <span>{asset.quantity}</span></div>
                  <div className="flex items-center gap-2 text-sm"><span>Status:</span> <Badge variant={asset.status === "Good" ? "default" : asset.status === "Needs Attention" ? "secondary" : "destructive"}>{asset.status}</Badge></div>
                  <div className="flex items-center gap-2 text-sm"><span>Note:</span> <span>{asset.note || "-"}</span></div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">Last updated: {asset.lastUpdated}</div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Asset History Modal */}
      <Dialog open={!!showHistory} onOpenChange={() => setShowHistory(null)}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader><DialogTitle>Asset History</DialogTitle></DialogHeader>
          <div className="py-2">
            {assets.find(a => a.id === showHistory)?.history?.length ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {assets.find(a => a.id === showHistory).history.map((h, i) => <li key={i}>{h.date}: {h.change}</li>)}
              </ul>
            ) : <div className="text-gray-500">No history available.</div>}
          </div>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-xs w-full">
          <DialogHeader><DialogTitle>Delete Asset?</DialogTitle></DialogHeader>
          <div className="py-2">Are you sure you want to delete this asset?</div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WardenAssets; 