"use client"

import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderKanban,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: "tasks" | "completed" | "pending" | "overdue" | "projects" | "team"
}

const iconMap = {
  tasks: ListTodo,
  completed: CheckCircle2,
  pending: Clock,
  overdue: AlertTriangle,
  projects: FolderKanban,
  team: Users,
}

const colorMap = {
  tasks: "bg-chart-1/10 text-chart-1",
  completed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  overdue: "bg-destructive/10 text-destructive",
  projects: "bg-chart-4/10 text-chart-4",
  team: "bg-chart-2/10 text-chart-2",
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  icon,
}: StatsCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("rounded-lg p-2", colorMap[icon])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2">
          {trend && (
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
