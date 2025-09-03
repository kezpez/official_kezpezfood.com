import { createClient } from '@supabase/supabase-js'

const supabaseUrlB = import.meta.env.VITE_SUPABASE_URLB
const supabaseAnonKeyB = import.meta.env.VITE_SUPABASE_ANON_KEYB

export const supabase = createClient(supabaseUrlB, supabaseAnonKeyB)
