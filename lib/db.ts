import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log("Cek Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Ada (Terbaca)" : "Kosong (Gagal)");

export const supabase = createClient(supabaseUrl, supabaseAnonKey)