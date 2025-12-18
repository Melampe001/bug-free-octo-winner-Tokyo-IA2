import Stripe from 'stripe'

export type StripeCustomer = Stripe.Customer
export type StripeSubscription = Stripe.Subscription
export type StripePrice = Stripe.Price
export type StripeProduct = Stripe.Product
export type StripePaymentIntent = Stripe.PaymentIntent
export type StripeInvoice = Stripe.Invoice

export interface StripeCheckoutSession {
  id: string
  url: string
}

export interface CreateCheckoutSessionParams {
  priceId: string
  userId: string
  customerEmail: string
  successUrl: string
  cancelUrl: string
}

export interface StripeWebhookEvent {
  type: string
  data: {
    object: any
  }
}

export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'
