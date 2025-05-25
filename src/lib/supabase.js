import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/app`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getUserUsage = async (userId) => {
  const { data, error } = await supabase
    .rpc('get_user_usage', { p_user_id: userId })
  
  if (error) throw error
  return data || 0
}

export const checkUserIsPro = async (userId) => {
  const { data, error } = await supabase
    .rpc('is_user_pro', { p_user_id: userId })
  
  if (error) throw error
  return data || false
}

export const saveEmail = async (emailData) => {
  const { data, error } = await supabase
    .from('emails')
    .insert([emailData])
    .select()
  
  if (error) throw error
  return data[0]
}

export const getUserEmails = async (userId, limit = 10) => {
  const { data, error } = await supabase
    .from('emails')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}