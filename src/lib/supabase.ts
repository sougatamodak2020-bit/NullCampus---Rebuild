import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"

// Safe client creation - won't crash during build
export const supabase = (() => {
  try {
    return createClientComponentClient()
  } catch (error) {
    console.warn('Supabase client creation failed - using null client')
    return null
  }
})()

// Admin client with safety checks
export const supabaseAdmin = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  
  if (!url || !serviceKey) {
    console.warn('Supabase admin credentials missing')
    return null
  }
  
  try {
    return createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.warn('Supabase admin client creation failed')
    return null
  }
})()

// Helper functions
export const isSupabaseConfigured = () => supabase !== null
export const isSupabaseAdminConfigured = () => supabaseAdmin !== null
