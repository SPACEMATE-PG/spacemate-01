import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap, Activity } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useActivityFeed } from "@/hooks/useActivityFeed";
import ActivityFeedControls from "./ActivityFeedControls";
import ActivityItem from "./ActivityItem";

const LiveActivityFeed = () => {
  const {
    activities,
    isLoading,
    filter,
    setFilter,
    isLive,
    refreshActivities,
    toggleLiveUpdates,
  } = useActivityFeed();
  const isMobile = useIsMobile();

  return (
    <Card className={`border-slate-200 ${isMobile ? 'bg-white/90 shadow-lg rounded-xl' : ''}`}>
      <CardHeader className={`bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-100 rounded-t-lg ${isMobile ? 'sticky top-0 z-10' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <Zap className="h-5 w-5 text-yellow-600" />
          <ActivityFeedControls
            filter={filter}
            setFilter={setFilter}
            isLive={isLive}
            isLoading={isLoading}
            activitiesCount={activities.length}
            toggleLiveUpdates={toggleLiveUpdates}
            refreshActivities={refreshActivities}
            isMobile={isMobile}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`${isMobile ? 'max-h-96' : 'max-h-[32rem]'} overflow-y-auto`}> 
          {activities.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No activities found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`p-4 hover:bg-slate-50 transition-colors ${
                    index === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  } ${isMobile ? 'px-2 py-3' : ''}`}
                >
                  <ActivityItem
                    activity={activity}
                    isLatest={index === 0}
                    isMobile={isMobile}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;
