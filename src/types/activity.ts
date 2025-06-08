
export interface ActivityItem {
  id: string;
  type: "login" | "payment" | "registration" | "subscription" | "property";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  amount?: number;
  severity: "low" | "medium" | "high";
}
