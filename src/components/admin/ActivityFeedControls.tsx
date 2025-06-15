import { Button } from "@/components/ui/button";
import { Activity, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ActivityFeedControlsProps {
  filter: string;
  setFilter: (filter: string) => void;
  isLive: boolean;
  isLoading: boolean;
  activitiesCount: number;
  toggleLiveUpdates: () => void;
  refreshActivities: () => void;
  isMobile: boolean;
}

const ActivityFeedControls = ({
  filter,
  setFilter,
  isLive,
  isLoading,
  activitiesCount,
  toggleLiveUpdates,
  refreshActivities,
  isMobile,
}: ActivityFeedControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full sm:w-[180px] text-sm">
          <Activity className="h-4 w-4 mr-2 text-gray-500" />
          <SelectValue placeholder="Filter activities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Activities</SelectItem>
          <SelectItem value="payment">Payments</SelectItem>
          <SelectItem value="registration">Registrations</SelectItem>
          <SelectItem value="login">Logins</SelectItem>
          <SelectItem value="subscription">Subscriptions</SelectItem>
          <SelectItem value="property">Properties</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLiveUpdates}
        className={`flex-shrink-0 ${isLive ? 'text-green-700 border-green-300 hover:bg-green-50' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
      >
        <Activity className={`h-4 w-4 mr-2 ${isLive ? 'animate-pulse' : ''}`} />
        {isLive ? 'Pause Live' : 'Resume Live'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={refreshActivities}
        disabled={isLoading}
        className="flex-shrink-0"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
};

export default ActivityFeedControls;
