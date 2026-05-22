"use client"

import { AppSidebar } from "./app-sidebar"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      <main className="flex-1 lg:pl-64">{children}</main>
    </div>
  )
}
