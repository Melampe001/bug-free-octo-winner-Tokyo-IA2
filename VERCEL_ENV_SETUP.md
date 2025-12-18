# Vercel Environment Setup Guide

## Overview
This guide shows you where to find and how to set up each required environment variable for your Local Premium Elite application on Vercel.

## Required Environment Variables

### 1. **Supabase Configuration**

#### NEXT_PUBLIC_SUPABASE_URL
**Where to find it:**
1. Go to [supabase.com](https://supabase.com) and login
2. Select your project
3. Click "Settings" → "API"
4. Copy the "Project URL"

**Format:**
```
https://[project-id].supabase.co
```

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
**Where to find it:**
1. Same location as above (Settings → API)
2. Under "Project API keys"
3. Copy the "anon public" key (the first one)

**Format:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### SUPABASE_SERVICE_ROLE_KEY
**Where to find it:**
1. Settings → API (same as above)
2. Under "Project API keys"
3. Copy the "service_role" key (the second one, marked as secret)

**Format:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 2. **Stripe Configuration**

#### NEXT_PUBLIC_STRIPE_PUBLIC_KEY
**Where to find it:**
1. Go to [stripe.com](https://stripe.com) and login
2. Go to "Developers" → "API Keys"
3. Make sure you're in **Live mode** (toggle at top left)
4. Copy the "Publishable key" (starts with `pk_live_`)

**Format:**
```
pk_live_xxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important:** Use LIVE keys for production, TEST keys for development

#### STRIPE_SECRET_KEY
**Where to find it:**
1. Same location (Developers → API Keys)
2. In **Live mode**
3. Copy the "Secret key" (starts with `sk_live_`)
4. Keep this **PRIVATE** - never share it

**Format:**
```
sk_live_xxxxxxxxxxxxxxxxxxxxx
```

#### STRIPE_WEBHOOK_SECRET (Optional but Recommended)
**Where to find it:**
1. Go to "Developers" → "Webhooks"
2. Click "Add an endpoint"
3. Enter your Vercel URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the "Signing secret"

**Format:**
```
whsec_xxxxxxxxxxxxxxxxxxxxx
```

---

### 3. **NextAuth Configuration**

#### NEXTAUTH_SECRET
**Generate a new secure secret:**
```bash
openssl rand -base64 32
```

Or use this Node.js command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Format:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

⚠️ **Important:** Generate a NEW secret for production, don't reuse development secrets

#### NEXTAUTH_URL
**Set this to your production URL:**
```
https://yourdomain.com
```

Or if using Vercel's default domain:
```
https://your-project-name.vercel.app
```

---

## How to Add Variables to Vercel

### Method 1: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Click "Add New"
5. Enter variable name and value
6. Select environments (Production, Preview, Development)
7. Click "Save"
8. Redeploy for changes to take effect

### Method 2: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Add a variable
vercel env add NEXT_PUBLIC_SUPABASE_URL

# List all variables
vercel env ls

# Pull variables to .env.local
vercel env pull
```

---

## Setup Checklist

Complete these in order:

- [ ] **Supabase Setup**
  - [ ] Create Supabase project at [supabase.com](https://supabase.com)
  - [ ] Copy `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Copy `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Copy `SUPABASE_SERVICE_ROLE_KEY`

- [ ] **Stripe Setup**
  - [ ] Create Stripe account at [stripe.com](https://stripe.com)
  - [ ] Switch to LIVE mode
  - [ ] Copy `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` (pk_live_...)
  - [ ] Copy `STRIPE_SECRET_KEY` (sk_live_...)
  - [ ] Copy `STRIPE_WEBHOOK_SECRET` (optional)

- [ ] **NextAuth Setup**
  - [ ] Generate `NEXTAUTH_SECRET` using command above
  - [ ] Set `NEXTAUTH_URL` to your domain or Vercel URL

- [ ] **Add to Vercel**
  - [ ] Login to Vercel dashboard
  - [ ] Go to your project Settings
  - [ ] Add all 5+ variables to Environment Variables
  - [ ] Ensure they're set for Production environment
  - [ ] Redeploy project

- [ ] **Test Deployment**
  - [ ] Visit your deployed app
  - [ ] Test authentication
  - [ ] Test payment flow (use Stripe test cards in preview)

---

## Environment Variable Summary Table

| Variable Name | Source | Priority | Type |
|---|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase API Settings | Required | String |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase API Settings | Required | String |
| SUPABASE_SERVICE_ROLE_KEY | Supabase API Settings | Required | Secret |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | Stripe API Keys (Live) | Required | String |
| STRIPE_SECRET_KEY | Stripe API Keys (Live) | Required | Secret |
| STRIPE_WEBHOOK_SECRET | Stripe Webhooks | Recommended | Secret |
| NEXTAUTH_SECRET | Generated | Required | Secret |
| NEXTAUTH_URL | Your domain/Vercel URL | Required | String |

---

## Troubleshooting

### "API request failed"
- Check if Supabase URL is correct (should include `.supabase.co`)
- Verify the anon key is not the service role key

### "Invalid Stripe key"
- Ensure you're using LIVE keys (pk_live_, sk_live_), not TEST keys
- Check key hasn't been accidentally truncated

### "NextAuth secret is missing"
- Regenerate using the command: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Make sure it's added to Vercel environment variables

### "Webhook secret not working"
- Ensure the endpoint URL matches exactly: `https://yourdomain.com/api/webhooks/stripe`
- Wait a few minutes for Vercel to fully deploy

---

## Security Notes

1. **Never commit secrets to Git** - They go in Vercel dashboard only
2. **Use Live keys in production** - Never use Test/Development keys in production
3. **Rotate secrets regularly** - Especially if exposed or suspected compromise
4. **Keep backups** - Store a backup of your secrets in a secure location
5. **Use different secrets for different environments** - Dev, Staging, Production

---

## Next Steps

After setting up environment variables:
1. ✅ Redeploy your project on Vercel
2. ✅ Test authentication flow
3. ✅ Test payment processing (use Stripe test cards)
4. ✅ Check deployment logs for errors
5. ✅ Monitor application in Vercel dashboard

---

**Last Updated:** 2025-12-18  
**Framework:** Next.js 14.2.0  
**Deployment Target:** Vercel