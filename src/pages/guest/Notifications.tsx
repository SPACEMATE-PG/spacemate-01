
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

const GuestNotifications = () => {
  const { currentUser } = useAuth();
  
  // Filter notifications for the current user
  const userNotifications = notifications.filter(
    notification => notification.userId === currentUser?.id
  );
  
  // Group notifications by date
  const groupedNotifications: Record<string, typeof notifications> = {};
  
  userNotifications.forEach(notification => {
    const date = format(new Date(notification.createdAt), "yyyy-MM-dd");
    if (!groupedNotifications[date]) {
      groupedNotifications[date] = [];
    }
    groupedNotifications[date].push(notification);
  });
  
  const handleNotificationAction = (notificationId: string, action: "yes" | "no") => {
    console.log(`Notification ID: ${notificationId}, Action: ${action}`);
    // In a real app, this would update the backend
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      
      {Object.keys(groupedNotifications).length > 0 ? (
        Object.entries(groupedNotifications)
          .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
          .map(([date, notifs]) => (
            <div key={date} className="space-y-2">
              <h2 className="text-sm font-medium text-gray-500">
                {format(new Date(date), "EEEE, MMMM do")}
              </h2>
              
              {notifs.map(notification => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyles(notification.type)}`}>
                            {notification.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(notification.createdAt), "h:mm a")}
                          </span>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="bg-hostel-primary w-2 h-2 rounded-full"></div>
                      )}
                    </div>
                    
                    {notification.requiresAction && (
                      <div className="mt-4 border-t pt-3 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleNotificationAction(notification.id, "no")}
                        >
                          No
                        </Button>
                        <Button
                          size="sm"
                          className="bg-hostel-primary hover:bg-hostel-secondary"
                          onClick={() => handleNotificationAction(notification.id, "yes")}
                        >
                          Yes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No notifications yet.</p>
          </CardContent>
        </Card>
      )}
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

export default GuestNotifications;
