"use client"

import { useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { KanbanBoard } from "./kanban-board"
import { AnalyticsSidebar } from "./analytics-sidebar"
import { cn } from "@/lib/utils"

export function KanbanDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <KanbanBoard />
        </main>
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            sidebarOpen ? "w-80" : "w-0"
          )}
        >
          {sidebarOpen && <AnalyticsSidebar />}
        </div>
      </div>
    </div>
  )
}
