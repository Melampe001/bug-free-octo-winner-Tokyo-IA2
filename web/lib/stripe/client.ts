import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

/**
 * Get Stripe.js instance
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
  }
  return stripePromise
}

/**
 * Create a checkout session and redirect to Stripe Checkout
 */
export async function redirectToCheckout(priceId: string) {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })

    const { sessionId } = await response.json()

    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Failed to load Stripe')
    }

    const { error } = await stripe.redirectToCheckout({ sessionId })

    if (error) {
      console.error('Stripe checkout error:', error)
      throw error
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}

/**
 * Create a customer portal session
 */
export async function redirectToCustomerPortal() {
  try {
    const response = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { url } = await response.json()

    if (url) {
      window.location.href = url
    }
  } catch (error) {
    console.error('Error redirecting to customer portal:', error)
    throw error
  }
}
