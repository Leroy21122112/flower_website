// lib/supabase/server.ts

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

// Read Supabase credentials from your environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single server-side Supabase client
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export both a named and default export so all imports work
export { supabase };
export default supabase;
