
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notifications } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const AdminNotifications = () => {
  const { toast } = useToast();
  const [notificationType, setNotificationType] = useState<string>("all");
  
  const filteredNotifications = notificationType === "all" 
    ? notifications 
    : notifications.filter(notification => notification.type === notificationType);
  
  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Sent",
      description: "Your notification has been sent to all PG residents.",
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notification Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Send New Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendNotification} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Notification Title</label>
              <Input id="title" placeholder="Enter notification title" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="Enter your message" rows={4} required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Notification Type</label>
              <Select defaultValue="announcement">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meal">Meal</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="recipients" className="text-sm font-medium">Recipients</label>
              <Select defaultValue="all">
                <SelectTrigger id="recipients">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All PG Guests</SelectItem>
                  <SelectItem value="specific">Select Specific Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="requiresAction" className="mr-2" />
                <label htmlFor="requiresAction" className="text-sm font-medium">Requires Action/Response</label>
              </div>
              <p className="text-xs text-gray-500">
                If checked, the recipient will be asked to respond (e.g., confirming meal attendance).
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-hostel-primary hover:bg-hostel-secondary">
              Send Notification
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={notificationType} onValueChange={setNotificationType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meal">Meals</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div key={notification.id} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-gray-500">
                    {format(new Date(notification.createdAt), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyles(notification.type)}`}>
                      {notification.type}
                    </span>
                    {notification.requiresAction && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                        Requires Action
                      </span>
                    )}
                  </div>
                  {notification.requiresAction && (
                    <button className="text-sm text-hostel-primary">View Responses</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get styles based on notification type
const getTypeStyles = (type: string) => {
  switch (type) {
    case "meal":
      return "bg-green-100 text-green-800";
    case "payment":
      return "bg-blue-100 text-blue-800";
    case "announcement":
      return "bg-purple-100 text-purple-800";
    case "service":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default AdminNotifications;
