"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { projectProgress } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ProjectProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {projectProgress.map((project) => (
          <div key={project.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={cn("h-2.5 w-2.5 rounded-full", project.color)} />
                <span className="font-medium">{project.name}</span>
              </div>
              <span className="text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
