import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const recentAssets = [
  { name: "Washing Machine", change: "Status updated to Needs Attention", date: "2024-06-10" },
  { name: "Bed", change: "Quantity increased to 20", date: "2024-06-09" },
];
const reminders = [
  "Update inventory this week",
  "Check maintenance notes for appliances",
];
const actions = [
  { action: "Added asset: Water Purifier", date: "2024-06-12" },
  { action: "Edited asset: Washing Machine", date: "2024-06-10" },
  { action: "Added maintenance note", date: "2024-06-09" },
];

const WardenDashboard = ({ onQuickAdd }) => {
  const [showReminders, setShowReminders] = useState(true);
  return (
    <div className="max-w-3xl mx-auto w-full px-2 py-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h2 className="text-2xl font-bold">Warden Overview</h2>
        <Button size="sm" className="gap-2" onClick={onQuickAdd}>
          <Plus className="h-4 w-4" /> Quick Add Asset
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => window.location.href = '/warden/assets?filter=attention'}>
          <CardHeader><CardTitle className="text-sm">Assets Needing Attention</CardTitle></CardHeader>
          <CardContent><div className="text-xl font-bold text-red-600">1</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Total Assets</CardTitle></CardHeader>
          <CardContent><div className="text-xl font-bold">5</div></CardContent>
        </Card>
      </div>
      {showReminders && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Reminders</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setShowReminders(false)}>Dismiss</Button>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {reminders.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader><CardTitle>Recent Actions</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {actions.map((a, i) => (
              <li key={i} className="text-sm flex flex-col">
                <span>{a.action}</span>
                <span className="text-xs text-gray-400">{a.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent Asset Changes</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentAssets.map((a, i) => (
              <li key={i} className="text-sm flex flex-col">
                <span className="font-semibold">{a.name}</span>
                <span>{a.change}</span>
                <span className="text-xs text-gray-400">{a.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WardenDashboard; 