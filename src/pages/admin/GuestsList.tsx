import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, UserPlus, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PGAdminLayout from "@/components/admin/PGAdminLayout";

// Mock data - replace with actual API call
const mockGuests = [
  {
    id: 1,
    name: "John Doe",
    room: "101",
    roomType: "Double Sharing",
    phone: "+91 9876543210",
    email: "john@example.com",
    status: "active",
    moveInDate: "2024-03-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    room: "102",
    roomType: "Single Sharing",
    phone: "+91 9876543211",
    email: "jane@example.com",
    status: "active",
    moveInDate: "2024-03-05",
  },
  // Add more mock data as needed
];

const GuestsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    navigate("/pg-admin");
  };

  const handleAddGuest = () => {
    navigate("/pg-admin/guests/add");
  };

  const handleEditGuest = (guestId: number) => {
    navigate(`/pg-admin/guests/${guestId}/edit`);
  };

  const handleDeleteGuest = (guestId: number) => {
    // TODO: Implement delete functionality
    console.log("Delete guest:", guestId);
  };

  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.room.includes(searchQuery) ||
    guest.phone.includes(searchQuery) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PGAdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Guest List</CardTitle>
            <Button
              onClick={handleAddGuest}
              className="bg-hostel-primary hover:bg-hostel-secondary"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search guests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Move-in Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>{guest.room}</TableCell>
                      <TableCell>{guest.roomType}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{guest.phone}</div>
                          <div className="text-sm text-gray-500">{guest.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={guest.status === "active" ? "default" : "secondary"}
                          className="bg-green-100 text-green-800"
                        >
                          {guest.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{guest.moveInDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditGuest(guest.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteGuest(guest.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PGAdminLayout>
  );
};

export default GuestsList; 