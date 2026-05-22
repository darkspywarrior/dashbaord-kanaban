"use client"

import { AppHeader } from "@/components/layout"
import {
  StatsCard,
  WeeklyChart,
  TasksByStatusChart,
  ActivityFeed,
  RecentTasks,
  ProjectProgress,
  UpcomingDeadlines,
} from "@/components/dashboard"
import { dashboardStats } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <AppHeader
        title="Dashboard"
        description="Overview of your team&apos;s progress"
      />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatsCard
            title="Total Tasks"
            value={dashboardStats.totalTasks}
            icon="tasks"
            trend={{ value: 12, isPositive: true }}
            description="from last month"
          />
          <StatsCard
            title="Completed"
            value={dashboardStats.completedTasks}
            icon="completed"
            trend={{ value: 8, isPositive: true }}
            description="from last week"
          />
          <StatsCard
            title="Pending"
            value={dashboardStats.pendingTasks}
            icon="pending"
            trend={{ value: 4, isPositive: false }}
            description="need attention"
          />
          <StatsCard
            title="Overdue"
            value={dashboardStats.overdueTasks}
            icon="overdue"
            trend={{ value: 2, isPositive: false }}
            description="tasks overdue"
          />
          <StatsCard
            title="Active Projects"
            value={dashboardStats.activeProjects}
            icon="projects"
            description="in progress"
          />
          <StatsCard
            title="Team Members"
            value={dashboardStats.teamMembers}
            icon="team"
            description="active users"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <WeeklyChart />
          <TasksByStatusChart />
        </div>

        {/* Activity & Tasks Row */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <ActivityFeed />
          <RecentTasks />
          <ProjectProgress />
          <UpcomingDeadlines />
        </div>
      </div>
    </div>
  )
}
