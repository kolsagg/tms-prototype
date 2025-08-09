"use client"

import { Button } from "@/components/ui/button"
import { Menu, LogOut, Home } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden hover:bg-gray-100/80">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page Title Area */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Aktivite Yönetimi</h1>
            <p className="text-sm text-gray-500">Aktivitelerinizi ve zamanınızı yönetin</p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Duyurular Butonu */}
          <Link href="/activity/home">
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100/80 gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Anasayfa</span>
          </Button>
          </Link>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">EK</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Emre Kolunsağ</p>
              <p className="text-xs text-gray-500">ABAP Developer</p>
            </div>
          </div>

          {/* Logout */}
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Çıkış</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
