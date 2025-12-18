import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../supabase/server'
import { Database } from '@/types/database'

type UsersRow = Database['public']['Tables']['users']['Row']

/**
 * Type guard to validate user role data from database
 */
function isValidRoleData(data: unknown): data is Pick<UsersRow, 'role'> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'role' in data &&
    (data.role === 'user' || data.role === 'admin')
  )
}

/**
 * Type guard to validate user subscription data from database
 */
function isValidSubscriptionData(data: unknown): data is Pick<UsersRow, 'subscription'> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'subscription' in data &&
    (data.subscription === 'free' || data.subscription === 'premium' || data.subscription === 'elite')
  )
}

/**
 * Middleware to protect routes that require authentication
 */
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return handler(request)
}

/**
 * Middleware to protect routes that require admin role
 */
export async function withAdminAuth(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  // Runtime validation for type safety
  const roleData = userData as { role?: string } | null
  if (!roleData || roleData.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  return handler(request)
}

/**
 * Middleware to check subscription tier
 */
export async function withSubscription(
  request: NextRequest,
  requiredTier: 'premium' | 'elite',
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { data: userData } = await supabase
    .from('users')
    .select('subscription')
    .eq('id', user.id)
    .single()

  // Runtime validation for type safety
  const subscriptionData = userData as { subscription?: string } | null
  if (!subscriptionData || !isValidSubscriptionData(subscriptionData)) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  const tierLevel = {
    free: 0,
    premium: 1,
    elite: 2,
  }

  const userTierLevel = tierLevel[subscriptionData.subscription]
  const requiredTierLevel = tierLevel[requiredTier]

  if (userTierLevel < requiredTierLevel) {
    return NextResponse.json(
      { error: `${requiredTier} subscription required` },
      { status: 403 }
    )
  }

  return handler(request)
}
