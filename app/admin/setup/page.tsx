"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AdminSetup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [userId, setUserId] = useState("")

  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      // 1. Create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (!data.user) {
        throw new Error("Failed to create user")
      }

      setUserId(data.user.id)
      setMessage(`User created with ID: ${data.user.id}`)
      setStatus("success")

      // 2. Show instructions for adding to admin_users table
    } catch (error) {
      console.error("Error creating admin:", error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/login" className="inline-block mb-8 hover:text-gray-400 transition-colors">
          ← Back to login
        </Link>

        <h1 className="text-4xl font-bold mb-8">Admin Setup</h1>

        <div className="space-y-8">
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Admin User</h2>
            <p className="mb-4 text-gray-400">
              This page helps you create a new admin user. After creating the user, you'll need to add them to the
              admin_users table in your Supabase database.
            </p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700"
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Creating..." : "Create Admin User"}
              </Button>
            </form>

            {status === "success" && (
              <div className="mt-6 p-4 bg-green-900/30 text-green-400 rounded">
                <p className="font-medium">User created successfully!</p>
                <p className="mt-2">Now you need to add this user to the admin_users table:</p>
                <div className="mt-2 p-3 bg-black/50 rounded font-mono text-sm overflow-x-auto">
                  {`INSERT INTO admin_users (id, email, created_at) 
VALUES ('${userId}', '${email}', NOW());`}
                </div>
                <p className="mt-4">
                  Run this SQL in your Supabase SQL Editor, then try to log in with your new credentials.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 p-4 bg-red-900/30 text-red-400 rounded">
                <p className="font-medium">Error creating user</p>
                <p className="mt-2">{message}</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-zinc-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Troubleshooting</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Make sure your Supabase environment variables are correctly set</li>
              <li>Ensure your Supabase project has email auth enabled</li>
              <li>
                After creating a user, you must manually add them to the admin_users table using the SQL command above
              </li>
              <li>If you're having trouble, check the browser console for more detailed error messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
