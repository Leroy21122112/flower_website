"use client"

import { useState } from "react"
import Link from "next/link"

export default function SimpleDiagnosePage() {
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")
  const [testResults, setTestResults] = useState<{
    fetch: { status: string; message: string }
    supabase: { status: string; message: string }
    cors: { status: string; message: string }
    database: { status: string; message: string }
  }>({
    fetch: { status: "pending", message: "Not started" },
    supabase: { status: "pending", message: "Not started" },
    cors: { status: "pending", message: "Not started" },
    database: { status: "pending", message: "Not started" },
  })
  const [isRunningTests, setIsRunningTests] = useState(false)

  const updateTestResult = (
    test: "fetch" | "supabase" | "cors" | "database",
    status: "pending" | "success" | "error",
    message: string,
  ) => {
    setTestResults((prev) => ({
      ...prev,
      [test]: { status, message },
    }))
  }

  const runTests = async () => {
    if (!supabaseUrl || !supabaseKey) {
      alert("Please enter your Supabase URL and anon key")
      return
    }

    setIsRunningTests(true)

    // Test 1: Browser Fetch API
    updateTestResult("fetch", "pending", "Testing browser fetch API...")
    try {
      const response = await fetch("https://httpbin.org/get")
      if (response.ok) {
        updateTestResult("fetch", "success", "Browser fetch API is working correctly")
      } else {
        updateTestResult("fetch", "error", `Fetch API error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      updateTestResult("fetch", "error", `Fetch API error: ${error instanceof Error ? error.message : String(error)}`)
    }

    // Test 2: Supabase Connection
    updateTestResult("supabase", "pending", "Testing Supabase connection...")
    try {
      // Dynamically import Supabase to avoid server-side issues
      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(supabaseUrl, supabaseKey)

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          updateTestResult("supabase", "error", `Supabase connection error: ${error.message}`)
        } else {
          updateTestResult("supabase", "success", "Successfully connected to Supabase")

          // Test 3: CORS Configuration
          updateTestResult("cors", "pending", "Testing CORS configuration...")
          try {
            const { error: corsError } = await supabase
              .from("subscribers")
              .select("count", { count: "exact", head: true })

            if (corsError) {
              if (corsError.message.includes("CORS") || corsError.message.includes("cross-origin")) {
                updateTestResult("cors", "error", `CORS error: ${corsError.message}`)
              } else {
                updateTestResult("cors", "success", "CORS is properly configured")

                // Test 4: Database Access
                updateTestResult("database", "pending", "Testing database access...")
                if (corsError.code === "PGRST301") {
                  updateTestResult("database", "error", "Database error: Table 'subscribers' does not exist")
                } else if (corsError.code === "42501") {
                  updateTestResult("database", "error", "Database error: Permission denied. Check your RLS policies.")
                } else {
                  updateTestResult("database", "error", `Database error: ${corsError.message}`)
                }
              }
            } else {
              updateTestResult("cors", "success", "CORS is properly configured")
              updateTestResult("database", "success", "Database access is working correctly")
            }
          } catch (corsError) {
            updateTestResult(
              "cors",
              "error",
              `CORS test error: ${corsError instanceof Error ? corsError.message : String(corsError)}`,
            )
          }
        }
      } catch (error) {
        updateTestResult(
          "supabase",
          "error",
          `Supabase connection error: ${error instanceof Error ? error.message : String(error)}`,
        )
      }
    } catch (error) {
      updateTestResult(
        "supabase",
        "error",
        `Failed to load Supabase client: ${error instanceof Error ? error.message : String(error)}`,
      )
    }

    setIsRunningTests(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/login" className="inline-block mb-8 hover:text-gray-400 transition-colors">
          ← Back to login
        </Link>

        <h1 className="text-4xl font-bold mb-8">Simple Supabase Diagnostic</h1>

        <div className="space-y-8">
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Enter Your Supabase Credentials</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="supabase-url" className="block text-sm font-medium mb-1">
                  Supabase URL
                </label>
                <input
                  id="supabase-url"
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project-id.supabase.co"
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div>
                <label htmlFor="supabase-key" className="block text-sm font-medium mb-1">
                  Supabase Anon Key
                </label>
                <input
                  id="supabase-key"
                  type="text"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="your-anon-key"
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <button
                onClick={runTests}
                disabled={isRunningTests}
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                {isRunningTests ? "Running Tests..." : "Run Diagnostic Tests"}
              </button>
            </div>
          </div>

          <div className="p-6 bg-zinc-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Diagnostic Results</h2>
            <div className="space-y-4">
              {Object.entries(testResults).map(([testName, { status, message }]) => (
                <div key={testName} className="p-4 border rounded-md border-zinc-800">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium capitalize">{testName}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        status === "pending"
                          ? "bg-yellow-900/30 text-yellow-300"
                          : status === "success"
                            ? "bg-green-900/30 text-green-300"
                            : "bg-red-900/30 text-red-300"
                      }`}
                    >
                      {status === "pending" ? "Not Started" : status === "success" ? "Success" : "Failed"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-zinc-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Common Issues & Solutions</h2>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-medium">CORS Issues</h3>
                <p className="text-sm text-gray-400 mt-1">
                  If you're seeing CORS errors, you need to add your domain to the allowed origins in your Supabase
                  project settings:
                </p>
                <ol className="list-decimal pl-5 text-sm text-gray-400 mt-2">
                  <li>Go to your Supabase dashboard</li>
                  <li>Navigate to Project Settings → API → CORS</li>
                  <li>Add your domain (e.g., https://your-domain.com) to the allowed origins</li>
                  <li>For local development, add http://localhost:3000</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium">Network Issues</h3>
                <p className="text-sm text-gray-400 mt-1">
                  "Failed to fetch" errors often indicate network connectivity problems:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-400 mt-2">
                  <li>Check if your internet connection is working</li>
                  <li>Verify that your Supabase project is online and not in maintenance mode</li>
                  <li>Try accessing your Supabase URL directly in the browser</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Database Access Issues</h3>
                <p className="text-sm text-gray-400 mt-1">
                  If you're seeing permission errors or "relation does not exist" errors:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-400 mt-2">
                  <li>Verify that the tables you're trying to access exist in your database</li>
                  <li>Check your Row Level Security (RLS) policies</li>
                  <li>Make sure you're using the correct anon key with appropriate permissions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
