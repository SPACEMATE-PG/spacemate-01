import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialNotes = [
  { id: 1, asset: "Washing Machine", note: "Leaking pipe fixed.", date: "2024-06-12" },
  { id: 2, asset: "Water Purifier", note: "Filter replaced.", date: "2024-06-10" },
];

const WardenMaintenance = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [asset, setAsset] = useState("");

  const handleAddNote = () => {
    if (!asset || !newNote) return;
    setNotes(prev => [
      { id: prev.length + 1, asset, note: newNote, date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
    setAsset("");
    setNewNote("");
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-2 py-4 space-y-4">
      <h2 className="text-2xl font-bold mb-2">Maintenance Notes</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input placeholder="Asset Name" value={asset} onChange={e => setAsset(e.target.value)} />
        <Input placeholder="Maintenance Note" value={newNote} onChange={e => setNewNote(e.target.value)} />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>
      <div className="space-y-3">
        {notes.map(n => (
          <Card key={n.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base">{n.asset}</CardTitle>
              <span className="text-xs text-gray-400">{n.date}</span>
            </CardHeader>
            <CardContent className="text-sm">{n.note}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WardenMaintenance; 