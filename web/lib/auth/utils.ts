import { User } from '@/types'

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: User | null): boolean {
  return user !== null
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

/**
 * Check if user has required subscription tier
 */
export function hasSubscription(
  user: User | null,
  requiredTier: 'premium' | 'elite'
): boolean {
  if (!user) return false

  const tierLevel = {
    free: 0,
    premium: 1,
    elite: 2,
  }

  const userTierLevel = tierLevel[user.subscription]
  const requiredTierLevel = tierLevel[requiredTier]

  return userTierLevel >= requiredTierLevel
}

/**
 * Get user display name
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest'
  return user.name || user.email.split('@')[0]
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: User | null): string {
  if (!user) return 'G'
  
  if (user.name) {
    const parts = user.name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return parts[0][0].toUpperCase()
  }
  
  return user.email[0].toUpperCase()
}

/**
 * Format subscription tier for display
 */
export function formatSubscriptionTier(tier: 'free' | 'premium' | 'elite'): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1)
}
