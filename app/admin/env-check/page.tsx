"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function EnvCheck() {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})

  useEffect(() => {
    // Check for Supabase variables specifically
    const publicEnvVars: Record<string, string | undefined> = {}

    // Check specific environment variables
    publicEnvVars["NEXT_PUBLIC_SUPABASE_URL"] = process.env.NEXT_PUBLIC_SUPABASE_URL
    publicEnvVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"] = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment variables check:", {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })

    setEnvVars(publicEnvVars)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/login" className="inline-block mb-8 hover:text-gray-400 transition-colors">
          ← Back to login
        </Link>

        <h1 className="text-4xl font-bold mb-8">Environment Variables Check</h1>

        <div className="p-6 bg-zinc-900 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Supabase Environment Variables</h2>

          {Object.keys(envVars).length === 0 ? (
            <p className="text-red-500">No environment variables found!</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <li key={key} className="flex items-start">
                  <span className={value ? "text-green-500" : "text-red-500"}>{value ? "✓" : "✗"}</span>
                  <div className="ml-2">
                    <div className="font-mono">{key}</div>
                    <div className="text-gray-400 text-sm">
                      {value
                        ? key.includes("KEY")
                          ? `${value.substring(0, 5)}...${value.substring(value.length - 3)}`
                          : `${value.substring(0, 15)}...`
                        : "Not set"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 p-4 bg-yellow-900/30 text-yellow-300 rounded">
            <p className="font-semibold">Important:</p>
            <p className="mt-2">If your environment variables are not showing up:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Make sure they are prefixed with NEXT_PUBLIC_ to be accessible in the browser</li>
              <li>Check that they are properly set in your environment or .env.local file</li>
              <li>Verify that they are being loaded correctly in your deployment environment</li>
              <li>Try redeploying your application after setting the environment variables</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
