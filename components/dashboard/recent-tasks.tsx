"use client"

import { CalendarDays, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { tasks, teamMembers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function RecentTasks() {
  const recentTasks = tasks
    .filter((t) => t.status !== "done" && t.status !== "backlog")
    .slice(0, 5)

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const priorityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-0">
            {recentTasks.map((task) => {
              const overdue = isOverdue(task.dueDate)
              const assignee = teamMembers.find((m) =>
                task.assignees.includes(m.id)
              )

              return (
                <div
                  key={task.id}
                  className="flex items-start gap-3 border-b border-border px-6 py-4 last:border-0"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">
                        {task.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 text-xs",
                          priorityColors[task.priority]
                        )}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      {assignee && (
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                            {assignee.avatar}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      {task.dueDate && (
                        <div
                          className={cn(
                            "flex items-center gap-1 text-xs",
                            overdue
                              ? "text-destructive"
                              : "text-muted-foreground"
                          )}
                        >
                          {overdue ? (
                            <AlertCircle className="h-3 w-3" />
                          ) : (
                            <CalendarDays className="h-3 w-3" />
                          )}
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
