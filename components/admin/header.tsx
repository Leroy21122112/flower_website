"use client"

import { useAuth } from '@/lib/auth/AuthContext'
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AdminHeader({ title }: { title: string }) {
  const { user } = useAuth()

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm hidden md:inline-block">{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
