import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zkppmojepcoocgxlsghh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcHBtb2plcGNvb2NneGxzZ2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0MTQ5MzgsImV4cCI6MTk2ODk5MDkzOH0.SmMrvhsdY8rp07HbiFn2Tx6XaX-tpCQxeRthi4eQeOo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)