import { createClient } from './server'
import { User, UserProfile } from '@/types'

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

  return {
    id: userData.id,
    email: userData.email,
    name: userData.name || undefined,
    avatar: userData.avatar || undefined,
    role: userData.role,
    subscription: userData.subscription,
    createdAt: new Date(userData.created_at),
    updatedAt: new Date(userData.updated_at),
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

  return {
    userId: data.user_id,
    bio: data.bio || undefined,
    location: data.location || undefined,
    website: data.website || undefined,
    socialLinks: data.social_links as any,
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
  
  const { error } = await supabase
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
  
  const { error } = await supabase
    .from('users')
    .update({ 
      subscription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  return !error
}
