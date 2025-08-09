"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, List, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const navigationItems = [
  {
    name: "Kontrol Paneli",
    href: "/activity/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Takvim",
    href: "/activity/calendar",
    icon: Calendar,
  },
  {
    name: "İş Listesi",
    href: "/activity/tasks",
    icon: List,
  },
  {
    name: "Raporlar",
    href: "/activity/reports",
    icon: BarChart3,
  },
]

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <aside
        className={cn(
          "bg-white/95 backdrop-blur-md border-r border-gray-200/50 min-h-screen transition-all duration-300 fixed lg:static z-40 shadow-xl lg:shadow-none",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Collapse/Expand Button - Absolute positioned on sidebar edge */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn(
            "absolute top-6 z-20 h-8 w-8 rounded-full bg-white border-2 border-gray-200 shadow-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hidden lg:flex items-center justify-center",
            isCollapsed ? "-right-4" : "-right-4",
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </Button>

        {/* Logo Section */}
        <div
          className={cn("p-4 border-b border-gray-200/50 flex items-center", isCollapsed ? "justify-center" : "gap-3")}
        >
          {!isCollapsed ? (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">cT</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                  ConcentIT
                </h1>
                <p className="text-xs text-gray-500 truncate">Business Management</p>
              </div>
            </>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs">cT</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 p-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full transition-all rounded-lg relative group",
                      isCollapsed ? "h-10 px-0 justify-center" : "justify-start gap-3 h-10 px-3",
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80",
                    )}
                    onClick={() => onClose()}
                  >
                    <Icon className="flex-shrink-0 h-4 w-4" />

                    {!isCollapsed && <span className="font-medium text-sm truncate">{item.name}</span>}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}
    </>
  )
}
