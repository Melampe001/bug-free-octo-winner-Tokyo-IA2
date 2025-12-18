import { createClient } from './server'
import { User, UserProfile } from '@/types'
import { Database } from '@/types/database'

type UsersRow = Database['public']['Tables']['users']['Row']
type ProfilesRow = Database['public']['Tables']['profiles']['Row']

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()
  
  const { data: { user: authUser }, error } = await supabase.auth.getUser()
  
  if (error || !authUser) {
    return null
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single()

  if (!userData) {
    return null
  }

  const typedData = userData as UsersRow

  return {
    id: typedData.id,
    email: typedData.email,
    name: typedData.name || undefined,
    avatar: typedData.avatar || undefined,
    role: typedData.role,
    subscription: typedData.subscription,
    createdAt: new Date(typedData.created_at),
    updatedAt: new Date(typedData.updated_at),
  }
}

/**
 * Get user profile by user ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return null
  }

  const typedData = data as ProfilesRow

  return {
    userId: typedData.user_id,
    bio: typedData.bio || undefined,
    location: typedData.location || undefined,
    website: typedData.website || undefined,
    socialLinks: typedData.social_links as UserProfile['socialLinks'],
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  profile: Partial<UserProfile>
): Promise<boolean> {
  const supabase = createClient()
  
  // Using type assertion to work around Supabase SSR type inference issues
  const { error } = await (supabase as any)
    .from('profiles')
    .upsert({
      user_id: userId,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      social_links: profile.socialLinks,
      updated_at: new Date().toISOString(),
    })

  return !error
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(page = 1, pageSize = 10) {
  const supabase = createClient()
  
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (error) {
    return null
  }

  return {
    data: data || [],
    pagination: {
      page,
      pageSize,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / pageSize),
    },
  }
}

/**
 * Update user subscription
 */
export async function updateUserSubscription(
  userId: string,
  subscription: 'free' | 'premium' | 'elite'
): Promise<boolean> {
  const supabase = createClient()
  
  // Using type assertion to work around Supabase SSR type inference issues
  const { error } = await (supabase as any)
    .from('users')
    .update({ 
      subscription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  return !error
}
