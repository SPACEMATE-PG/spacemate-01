
import { PGAdmin } from "@/hooks/usePGAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SuperAdminPricing from "./SuperAdminPricing";

interface SuperAdminSubscriptionsProps {
  admins: PGAdmin[];
  isLoading?: boolean;
}

const SuperAdminSubscriptions = ({ admins, isLoading }: SuperAdminSubscriptionsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const activeSubscriptions = admins.filter(admin => admin.subscriptionStatus === 'active');
  const expiredSubscriptions = admins.filter(admin => admin.subscriptionStatus === 'expired');
  const trialSubscriptions = admins.filter(admin => admin.subscriptionStatus === 'trial');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 text-lg">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 mb-2">{activeSubscriptions.length}</div>
            <p className="text-green-600 text-sm">Currently paying customers</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 text-lg">Trial Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700 mb-2">{trialSubscriptions.length}</div>
            <p className="text-orange-600 text-sm">Trial period users</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 text-lg">Expired Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700 mb-2">{expiredSubscriptions.length}</div>
            <p className="text-red-600 text-sm">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {admins.slice(0, 5).map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-gray-600">{admin.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={admin.subscriptionStatus === 'active' ? 'default' : 
                              admin.subscriptionStatus === 'trial' ? 'secondary' : 'destructive'}
                    >
                      {admin.subscriptionStatus}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">${admin.monthlyRevenue}/month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <SuperAdminPricing />
      </div>
    </div>
  );
};

export default SuperAdminSubscriptions;
