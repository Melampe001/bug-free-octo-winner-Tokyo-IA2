import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../supabase/server'
import { Database } from '@/types/database'

type UsersRow = Database['public']['Tables']['users']['Row']

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

  const typedData = userData as Pick<UsersRow, 'role'> | null

  if (!typedData || typedData.role !== 'admin') {
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

  if (!userData) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  const typedSubscriptionData = userData as Pick<UsersRow, 'subscription'>

  const tierLevel = {
    free: 0,
    premium: 1,
    elite: 2,
  }

  const userTierLevel = tierLevel[typedSubscriptionData.subscription as keyof typeof tierLevel]
  const requiredTierLevel = tierLevel[requiredTier]

  if (userTierLevel < requiredTierLevel) {
    return NextResponse.json(
      { error: `${requiredTier} subscription required` },
      { status: 403 }
    )
  }

  return handler(request)
}
