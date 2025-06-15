import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notifications = [
  { id: 1, message: "Reminder: Update asset inventory for June.", date: "2024-06-15" },
  { id: 2, message: "Your maintenance note for 'Washing Machine' was reviewed by Admin.", date: "2024-06-14" },
];

const WardenNotifications = () => (
  <div className="max-w-3xl mx-auto w-full px-2 py-4 space-y-4">
    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Bell className="h-5 w-5" />Notifications</h2>
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <div className="text-gray-500 text-center">No notifications at this time.</div>
      ) : (
        notifications.map(n => (
          <Card key={n.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base">{n.message}</CardTitle>
              <span className="text-xs text-gray-400">{n.date}</span>
            </CardHeader>
            <CardContent />
          </Card>
        ))
      )}
    </div>
  </div>
);

export default WardenNotifications; 