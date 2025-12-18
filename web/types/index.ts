export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role: 'user' | 'admin'
  subscription: SubscriptionTier
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionTier = 'free' | 'premium' | 'elite'

export interface UserProfile {
  userId: string
  bio?: string
  location?: string
  website?: string
  socialLinks?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface Session {
  user: User
  accessToken: string
  refreshToken?: string
  expiresAt: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
