import TimerCard from "./TimerCard.js";
import StatsCard from "./StatsCard.js";
import RecentActivity from "./RecentActivity.js";
import ProjectsTable from "./ProjectTable.js";

export default function DashboardContent() {
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <TimerCard />
        <StatsCard title="Total Hours" value="40h" />
        <StatsCard title="Projects" value="5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <ProjectsTable />
      </div>
    </main>
  );
}
