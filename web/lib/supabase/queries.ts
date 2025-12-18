import { createClient } from './server'
import { User, UserProfile } from '@/types'
import { Database, Json } from '@/types/database'

type UsersRow = Database['public']['Tables']['users']['Row']
type ProfilesRow = Database['public']['Tables']['profiles']['Row']
type ProfilesInsert = Database['public']['Tables']['profiles']['Insert']
type UsersUpdate = Database['public']['Tables']['users']['Update']

/**
 * Helper to parse social links from JSON
 */
function parseSocialLinks(json: Json | null): UserProfile['socialLinks'] | undefined {
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    return undefined
  }
  const obj = json as Record<string, unknown>
  return {
    twitter: typeof obj.twitter === 'string' ? obj.twitter : undefined,
    github: typeof obj.github === 'string' ? obj.github : undefined,
    linkedin: typeof obj.linkedin === 'string' ? obj.linkedin : undefined,
  }
}

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
    socialLinks: parseSocialLinks(typedData.social_links),
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
  
  const profileData: ProfilesInsert = {
    user_id: userId,
    bio: profile.bio ?? null,
    location: profile.location ?? null,
    website: profile.website ?? null,
    social_links: profile.socialLinks ?? null,
    updated_at: new Date().toISOString(),
  }
  
  // Cast to unknown first to work around Supabase SSR type inference limitation
  // The Database type is correctly defined but SSR client returns generic types
  const { error } = await (supabase.from('profiles') as unknown as {
    upsert: (data: ProfilesInsert) => Promise<{ error: Error | null }>
  }).upsert(profileData)

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
  
  const updateData: UsersUpdate = {
    subscription,
    updated_at: new Date().toISOString(),
  }
  
  // Cast to unknown first to work around Supabase SSR type inference limitation
  // The Database type is correctly defined but SSR client returns generic types
  const { error } = await (supabase.from('users') as unknown as {
    update: (data: UsersUpdate) => { eq: (column: string, value: string) => Promise<{ error: Error | null }> }
  }).update(updateData).eq('id', userId)

  return !error
}
