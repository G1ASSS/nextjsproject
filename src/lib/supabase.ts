import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tdckfwyohklvzudnfswk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)