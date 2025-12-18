export interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
  stripePriceId?: string
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      'Access to basic features',
      'Community support',
      'Up to 3 projects',
      'Basic analytics',
      '1GB storage',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For professionals and small teams',
    price: 29,
    currency: 'USD',
    interval: 'month',
    popular: true,
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      'Everything in Free',
      'Priority support',
      'Unlimited projects',
      'Advanced analytics',
      '50GB storage',
      'Custom branding',
      'API access',
      'Team collaboration',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'For large organizations and enterprises',
    price: 99,
    currency: 'USD',
    interval: 'month',
    stripePriceId: process.env.STRIPE_ELITE_PRICE_ID,
    features: [
      'Everything in Premium',
      'Dedicated account manager',
      'Unlimited everything',
      'Advanced security features',
      'Unlimited storage',
      'White-label solution',
      'Custom integrations',
      'SLA guarantee',
      '24/7 phone support',
      'On-premise deployment option',
    ],
  },
]

export const yearlyDiscount = 0.2 // 20% discount for yearly plans
