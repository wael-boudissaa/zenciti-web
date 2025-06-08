import QuickActions from "./QuickAction";
import RecentActivity from "./RecentActivity";
import ReservationSummary from "./ReservationSummary";

export default function QuickActionsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <QuickActions />
      <RecentActivity />
      <ReservationSummary />
    </div>
  );
}
