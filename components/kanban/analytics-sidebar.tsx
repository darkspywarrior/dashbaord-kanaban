"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
  Plus,
} from "lucide-react"
import {
  teamMembers,
  analyticsData,
  weeklyProgress,
  tasksByPriority,
} from "@/lib/kanban-data"
import { cn } from "@/lib/utils"

export function AnalyticsSidebar() {
  return (
    <div className="w-80 shrink-0 border-l border-border bg-secondary/20 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Completed"
            value={analyticsData.tasksCompleted}
            change={analyticsData.tasksCompletedChange}
            icon={CheckCircle2}
            positive
          />
          <StatCard
            title="In Progress"
            value={analyticsData.inProgress}
            change={analyticsData.inProgressChange}
            icon={Clock}
            positive={analyticsData.inProgressChange <= 0}
          />
          <StatCard
            title="Overdue"
            value={analyticsData.overdue}
            change={analyticsData.overdueChange}
            icon={AlertCircle}
            positive={analyticsData.overdueChange <= 0}
            danger
          />
          <StatCard
            title="Velocity"
            value={analyticsData.teamVelocity}
            change={analyticsData.teamVelocityChange}
            icon={Zap}
            positive
          />
        </div>

        <Separator className="bg-border/50" />

        {/* Weekly Progress Chart */}
        <Card className="bg-card/50 border-border/30">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm font-medium text-foreground">
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-2">
            <ChartContainer
              config={{
                completed: {
                  label: "Completed",
                  color: "var(--color-success)",
                },
                created: {
                  label: "Created",
                  color: "var(--color-chart-1)",
                },
              }}
              className="h-[120px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress} barGap={1}>
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="completed"
                    fill="var(--color-success)"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={12}
                  />
                  <Bar
                    dataKey="created"
                    fill="var(--color-chart-1)"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tasks by Priority */}
        <Card className="bg-card/50 border-border/30">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm font-medium text-foreground">
              Tasks by Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-2">
            <div className="flex items-center gap-4">
              <ChartContainer
                config={{
                  count: {
                    label: "Count",
                  },
                }}
                className="h-[100px] w-[100px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tasksByPriority}
                      dataKey="count"
                      nameKey="priority"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={45}
                      strokeWidth={2}
                      stroke="var(--color-card)"
                    >
                      {tasksByPriority.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex-1 space-y-2">
                {tasksByPriority.map((item) => (
                  <div key={item.priority} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-xs text-muted-foreground flex-1">
                      {item.priority}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-border/50" />

        {/* Team Members */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Team</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary-foreground">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.role}
                  </p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Sprint Progress */}
        <Card className="bg-card/50 border-border/30">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Sprint Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Sprint 14</span>
              <span className="text-foreground font-medium">68%</span>
            </div>
            <Progress value={68} className="h-2" />
            <p className="text-xs text-muted-foreground">
              5 days remaining
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  change: number
  icon: React.ElementType
  positive: boolean
  danger?: boolean
}

function StatCard({ title, value, change, icon: Icon, positive, danger }: StatCardProps) {
  return (
    <Card className="bg-card/50 border-border/30">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <Icon
            className={cn(
              "h-4 w-4",
              danger ? "text-destructive" : "text-muted-foreground"
            )}
          />
          <div
            className={cn(
              "flex items-center gap-0.5 text-[10px]",
              positive ? "text-success" : "text-destructive"
            )}
          >
            {positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}
