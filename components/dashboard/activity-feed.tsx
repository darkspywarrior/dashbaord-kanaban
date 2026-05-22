"use client"

import { MessageSquare, FolderPlus, UserPlus, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { activityFeed, teamMembers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const iconMap = {
  task: CheckCircle,
  comment: MessageSquare,
  project: FolderPlus,
  member: UserPlus,
}

const colorMap = {
  task: "bg-success/10 text-success",
  comment: "bg-chart-1/10 text-chart-1",
  project: "bg-chart-4/10 text-chart-4",
  member: "bg-chart-2/10 text-chart-2",
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-0">
            {activityFeed.map((activity) => {
              const Icon = iconMap[activity.type]
              const member = teamMembers.find((m) => m.name === activity.user)

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border-b border-border px-6 py-4 last:border-0"
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {member?.avatar || activity.user.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <div className={cn("rounded-lg p-1.5", colorMap[activity.type])}>
                    <Icon className="h-3.5 w-3.5" />
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
