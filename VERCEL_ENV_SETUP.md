# 🔐 Environment Variables Setup Guide

Complete step-by-step guide to get all required values for Vercel deployment.

## 1. NEXT_PUBLIC_SUPABASE_URL

**Where to find:**
1. Go to [supabase.com](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click **Settings** (gear icon) → **API**
4. Copy the **Project URL** under "Project URL"

**Format:** `https://xxxxxxxxxxxxx.supabase.co`

**Example:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
```

---

## 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

**Where to find:**
1. Same page as above (**Settings** → **API**)
2. Copy the **anon/public** key under "Project API keys"
3. This key is safe to expose in the browser

**Format:** Long JWT token starting with `eyJ...`

**Example:**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3. NEXT_PUBLIC_STRIPE_PUBLIC_KEY

**Where to find:**
1. Go to [stripe.com/dashboard](https://dashboard.stripe.com)
2. Click **Developers** → **API keys**
3. Copy the **Publishable key**
4. For testing: Use test mode keys (starts with `pk_test_`)
5. For production: Use live mode keys (starts with `pk_live_`)

**Format:** `pk_test_...` or `pk_live_...`

**Example:**
```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz
```

---

## 4. NEXTAUTH_SECRET

**How to generate:**

### Option 1: OpenSSL (recommended)
```bash
openssl rand -base64 32
```

### Option 2: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Option 3: Online Generator
- Go to [generate-random.org/encryption-key-generator](https://generate-random.org/encryption-key-generator)
- Select 256-bit key
- Copy the generated key

**Format:** Random 32+ character string

**Example:**
```
NEXTAUTH_SECRET=Xk9v8JmNpQrStUvWxYz2a3b4c5d6e7f8g9h0i1j2k3l4
```

⚠️ **Important:** Keep this secret! Don't share it or commit it to git.

---

## 5. STRIPE_SECRET_KEY

**Where to find:**
1. Same page as Stripe publishable key (**Developers** → **API keys**)
2. Copy the **Secret key**
3. For testing: Use test mode keys (starts with `sk_test_`)
4. For production: Use live mode keys (starts with `sk_live_`)

**Format:** `sk_test_...` or `sk_live_...`

**Example:**
```
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz
```

⚠️ **Important:** This is a SECRET key! Only add it in Vercel Dashboard, never commit to git.

---

## Optional Variables (Can Add Later)

### SUPABASE_SERVICE_ROLE_KEY
**Use case:** Admin operations, bypassing Row Level Security

**Where to find:**
1. Supabase Dashboard → **Settings** → **API**
2. Copy the **service_role** key
3. ⚠️ **Very sensitive!** Has admin access to your database

**Example:**
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### STRIPE_WEBHOOK_SECRET
**Use case:** Verify Stripe webhook events

**How to get:**
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-app.vercel.app/api/webhooks/stripe`
4. Select events to listen to
5. Copy the **Signing secret** (starts with `whsec_`)

**Example:**
```
STRIPE_WEBHOOK_SECRET=whsec_abcdefghijklmnopqrstuvwxyz123456
```

---

## Quick Setup Checklist

Copy this to track your progress:

- [ ] Create/login to Supabase account
- [ ] Get `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Get `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Create/login to Stripe account
- [ ] Get `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
- [ ] Get `STRIPE_SECRET_KEY`
- [ ] Generate `NEXTAUTH_SECRET`
- [ ] Add all 5 variables to Vercel Dashboard
- [ ] Deploy!

---

## Adding Variables to Vercel

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. For each variable:
   - Enter the **Name** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value**
   - Select environments: **Production**, **Preview**, **Development**
   - Click **Save**

---

## Security Best Practices

✅ **DO:**
- Add secrets only in Vercel Dashboard
- Use different keys for test/production
- Rotate secrets regularly
- Keep service role keys extremely secure

❌ **DON'T:**
- Commit secrets to git
- Share secret keys in chat/email
- Use production keys in development
- Expose service role keys in browser

---

**Need help?** Check the official documentation:
- [Supabase API Settings](https://supabase.com/docs/guides/api)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [NextAuth Configuration](https://next-auth.js.org/configuration/options)
