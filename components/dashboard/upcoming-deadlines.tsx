"use client"

import { CalendarDays, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { tasks, projects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function UpcomingDeadlines() {
  const upcomingTasks = tasks
    .filter((t) => t.dueDate && t.status !== "done")
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5)

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date()
  const isDueSoon = (dueDate: string) => {
    const diff = new Date(dueDate).getTime() - new Date().getTime()
    return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000 // 3 days
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="space-y-0">
            {upcomingTasks.map((task) => {
              const overdue = isOverdue(task.dueDate!)
              const dueSoon = isDueSoon(task.dueDate!)
              const project = projects.find((p) => p.id === task.projectId)

              return (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 border-b border-border px-6 py-3 last:border-0",
                    overdue && "bg-destructive/5"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg p-2",
                      overdue
                        ? "bg-destructive/10 text-destructive"
                        : dueSoon
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {overdue ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <CalendarDays className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {project?.name}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      overdue
                        ? "border-destructive/20 bg-destructive/10 text-destructive"
                        : dueSoon
                          ? "border-warning/20 bg-warning/10 text-warning"
                          : ""
                    )}
                  >
                    {new Date(task.dueDate!).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
