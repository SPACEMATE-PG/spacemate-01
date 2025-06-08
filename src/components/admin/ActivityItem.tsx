
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp } from "lucide-react";
import { ActivityItem as ActivityItemType } from "@/types/activity";
import { getActivityIcon, getSeverityColor, formatTimestamp } from "@/utils/activityUtils";

interface ActivityItemProps {
  activity: ActivityItemType;
  isLatest: boolean;
  isMobile: boolean;
}

const ActivityItem = ({ activity, isLatest, isMobile }: ActivityItemProps) => {
  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-sm font-semibold text-slate-900 truncate">
                {activity.title}
              </h4>
              <div className="flex items-center gap-1 ml-2">
                <Badge className={`text-xs ${getSeverityColor(activity.severity)}`}>
                  {activity.severity}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{activity.description}</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTimestamp(activity.timestamp)}
              </div>
              {activity.amount && (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  ₹{activity.amount.toLocaleString()}
                </span>
              )}
            </div>
            {activity.user && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <Users className="h-3 w-3" />
                {activity.user}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-semibold text-slate-900 truncate">
            {activity.title}
          </h4>
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getSeverityColor(activity.severity)}`}>
              {activity.severity}
            </Badge>
            <span className="text-xs text-slate-500">
              {formatTimestamp(activity.timestamp)}
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {activity.user && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {activity.user}
            </span>
          )}
          {activity.amount && (
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <TrendingUp className="h-3 w-3" />
              ₹{activity.amount.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
