import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"

// IMPORTANT: Replace these with your actual Supabase credentials
// This is a temporary solution to bypass environment variables issues
const SUPABASE_URL = "https://your-actual-project-id.supabase.co"
const SUPABASE_ANON_KEY = "your-actual-anon-key"

// Server-side Supabase client - only used in Server Components and Server Actions
export const createServerSupabaseClient = () => {
  console.log("Creating server Supabase client with hardcoded credentials")

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
}
