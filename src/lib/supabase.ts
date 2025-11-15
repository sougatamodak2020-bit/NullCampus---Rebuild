import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClientComponentClient()

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          avatar_3d: string | null
          created_at: string
          updated_at: string
        }
      }
      courses: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          price: number
          thumbnail: string
          tutor_id: string
          level: string
          duration: string
          rating: number
          enrolled_count: number
          tags: string[]
          created_at: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          payment_id: string | null
          enrolled_at: string
          progress: number
          completed: boolean
        }
      }
    }
  }
}
