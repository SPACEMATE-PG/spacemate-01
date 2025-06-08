
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, RefreshCw } from "lucide-react";

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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-slate-900`}>
            Live Activity Feed
          </h3>
          <Badge className={`${isLive ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
            {isLive ? 'Live' : 'Paused'}
          </Badge>
        </div>
        <Badge variant="outline" className="bg-slate-50 text-xs">
          {activitiesCount} Items
        </Badge>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-white"
          >
            <option value="all">All Activities</option>
            <option value="payment">Payments</option>
            <option value="registration">Registrations</option>
            <option value="login">Logins</option>
            <option value="subscription">Subscriptions</option>
            <option value="property">Properties</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLiveUpdates}
            className={`flex items-center gap-1 ${isLive ? 'text-green-700 border-green-300' : 'text-gray-700 border-gray-300'}`}
          >
            <Activity className={`h-4 w-4 ${isLive ? 'animate-pulse' : ''}`} />
            {!isMobile && (isLive ? 'Pause' : 'Resume')}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshActivities}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeedControls;
