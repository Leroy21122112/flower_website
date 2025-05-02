"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from '@/lib/auth/AuthContext'
import { LayoutDashboard, Users, ShoppingBag, Tag, Calendar, Settings, LogOut } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Tour Dates",
    href: "/admin/tour-dates",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <div className="flex flex-col h-full border-r border-zinc-800 bg-zinc-950 w-64">
      <div className="p-6">
        <Link href="/admin" className="flex items-center">
          <h1 className="text-2xl font-bold">flower.</h1>
          <span className="ml-2 text-xs bg-zinc-800 px-2 py-1 rounded">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              pathname === item.href ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900",
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={signOut}
          className="flex items-center px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md w-full transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
