"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  status?: string
  actionButton?: {
    label: string
    icon?: LucideIcon
    onClick?: () => void
  }
}

export function PageHeader({ title, subtitle, status, actionButton }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-3">
          {title}
        </h1>
        {subtitle && <p className="text-lg text-gray-600 mb-2">{subtitle}</p>}
        {status && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">{status}</span>
          </div>
        )}
      </div>
      {actionButton && (
        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2 shadow-lg h-12 px-6"
          onClick={actionButton.onClick}
        >
          {actionButton.icon && <actionButton.icon className="h-4 w-4" />}
          <span>{actionButton.label}</span>
        </Button>
      )}
    </div>
  )
}
