"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Settings,
  LayoutGrid,
  Plus,
  Filter,
  ChevronDown,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function DashboardHeader({ sidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="h-14 shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutGrid className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Project Alpha</h1>
              <p className="text-xs text-muted-foreground">Sprint 14 • Q2 2026</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks, projects..."
              className={cn(
                "pl-9 bg-muted/50 border-border/50 transition-all",
                searchFocused && "bg-muted border-primary/50"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filter</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>All Tasks</DropdownMenuItem>
              <DropdownMenuItem>My Tasks</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>High Priority</DropdownMenuItem>
              <DropdownMenuItem>Due This Week</DropdownMenuItem>
              <DropdownMenuItem>Overdue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Task</span>
          </Button>

          <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hidden lg:flex"
          >
            {sidebarOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary-foreground">
                    SC
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">sarah@company.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
