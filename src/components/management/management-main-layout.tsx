"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ManagementHeader } from "@/components/management/management-header"
import { ManagementSidebar } from "@/components/management/management-sidebar"
import { ManagementFooter } from "@/components/management/management-footer"

interface MainLayoutProps {
  children: React.ReactNode
}

export function ManagementMainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ManagementHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <ManagementSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 transition-all duration-300">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <ManagementFooter />
    </div>
  )
}
