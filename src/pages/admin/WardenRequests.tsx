import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const requests = [
  { id: 1, type: "Join Request", guest: "John Doe", status: "Pending Admin Approval", date: "2024-06-12" },
  { id: 2, type: "Room Change", guest: "Jane Smith", status: "Pending Admin Approval", date: "2024-06-11" },
];

const WardenRequests = () => (
  <div className="max-w-3xl mx-auto w-full px-2 py-4 space-y-4">
    <h2 className="text-2xl font-bold mb-2">Requests (View Only)</h2>
    <p className="text-sm text-gray-500 mb-2">Requests requiring Admin approval. Please escalate to Admin if action is needed.</p>
    <div className="space-y-3">
      {requests.map(r => (
        <Card key={r.id}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base">{r.type}</CardTitle>
            <Badge variant="secondary">{r.status}</Badge>
          </CardHeader>
          <CardContent className="text-sm">
            <div>Guest: {r.guest}</div>
            <div>Date: {r.date}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default WardenRequests; 