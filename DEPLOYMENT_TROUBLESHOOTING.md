# Deployment Troubleshooting Guide

Comprehensive troubleshooting guide for Local Premium Elite deployment on Vercel. This guide covers common issues, solutions, and debugging techniques.

## Table of Contents
1. [Build Failures](#build-failures)
2. [Environment Variable Issues](#environment-variable-issues)
3. [Supabase Connection Problems](#supabase-connection-problems)
4. [Stripe Integration Issues](#stripe-integration-issues)
5. [NextAuth Configuration Problems](#nextauth-configuration-problems)
6. [Database Migration Issues](#database-migration-issues)
7. [Performance Issues](#performance-issues)
8. [Domain and SSL Issues](#domain-and-ssl-issues)
9. [API Route Issues](#api-route-issues)
10. [General Debugging Techniques](#general-debugging-techniques)

---

## Build Failures

### Issue: Build fails with "Module not found" error

**Symptoms:**
```
Error: Cannot find module 'xyz'
Module not found: Can't resolve 'package-name'
```

**Solutions:**

1. **Check package.json dependencies:**
   ```bash
   cd web
   npm install
   ```

2. **Verify import paths are correct:**
   - Check for typos in import statements
   - Ensure case sensitivity matches (especially on Linux servers)
   - Use relative imports correctly: `@/components` vs `./components`

3. **Clear Vercel cache and redeploy:**
   - Go to Vercel dashboard > Project Settings
   - Delete the project cache
   - Trigger new deployment

4. **Check Node.js version compatibility:**
   - Ensure Node.js 18+ is used
   - Add `.node-version` file if needed:
     ```
     18
     ```

### Issue: Build fails with TypeScript errors

**Symptoms:**
```
Type error: Cannot find name 'XYZ'
TS2304: Cannot find type 'SomeType'
```

**Solutions:**

1. **Run type check locally:**
   ```bash
   cd web
   npm run type-check
   ```

2. **Fix type errors or temporarily disable strict mode:**
   - Fix the actual type issues (recommended)
   - Or add to `next.config.js`:
     ```javascript
     typescript: {
       ignoreBuildErrors: true, // Not recommended for production
     }
     ```

3. **Ensure all type definitions are installed:**
   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom
   ```

### Issue: Build fails with "Out of memory" error

**Symptoms:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
JavaScript heap out of memory
```

**Solutions:**

1. **Upgrade Vercel plan** (if on Hobby plan):
   - Pro plan has more memory allocation
   - Go to Project Settings > General

2. **Optimize build process:**
   - Remove unused dependencies
   - Use dynamic imports for large packages
   - Enable experimental features in `next.config.js`:
     ```javascript
     experimental: {
       optimizeCss: true,
       optimizePackageImports: ['lucide-react', 'date-fns'],
     }
     ```

3. **Check for circular dependencies:**
   ```bash
   npx madge --circular web/app
   ```

### Issue: Build succeeds locally but fails on Vercel

**Symptoms:**
- Local build works: `npm run build` ✅
- Vercel build fails ❌

**Solutions:**

1. **Check environment differences:**
   - Verify Node.js version matches
   - Check for OS-specific code (Windows vs Linux)
   - Ensure all environment variables are set in Vercel

2. **Test with clean install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **Check build logs for specific errors:**
   - Go to Vercel dashboard > Deployments > [Failed deployment]
   - Click "View Build Logs"
   - Look for the first error (often buried in output)

---

## Environment Variable Issues

### Issue: Environment variables not accessible in code

**Symptoms:**
```javascript
console.log(process.env.NEXT_PUBLIC_APP_URL); // undefined
console.log(process.env.STRIPE_SECRET_KEY); // undefined
```

**Solutions:**

1. **Verify variable is set in Vercel:**
   - Go to Settings > Environment Variables
   - Check variable exists
   - Verify correct environment selected (Production/Preview)

2. **Check variable naming:**
   - Client-side variables MUST start with `NEXT_PUBLIC_`
   - Server-side variables must NOT have `NEXT_PUBLIC_` prefix
   - Variable names are case-sensitive

3. **Redeploy after adding variables:**
   - Adding environment variables doesn't automatically redeploy
   - Trigger new deployment manually or push to Git

4. **Check variable in correct scope:**
   ```javascript
   // ✅ Client-side (components, pages)
   const appUrl = process.env.NEXT_PUBLIC_APP_URL;
   
   // ✅ Server-side only (API routes, getServerSideProps)
   const stripeSecret = process.env.STRIPE_SECRET_KEY;
   
   // ❌ Won't work: accessing server-side var in client component
   const secret = process.env.STRIPE_SECRET_KEY; // undefined in browser
   ```

### Issue: Environment variables work in dev but not production

**Symptoms:**
- Local development: Variables work ✅
- Production: Variables are `undefined` ❌

**Solutions:**

1. **Check `.env.local` vs Vercel settings:**
   - `.env.local` is only for local development
   - Must add variables to Vercel dashboard separately

2. **Verify environment selection:**
   - Check if variable is set for "Production" environment
   - Not just "Preview" or "Development"

3. **Check for typos in variable names:**
   - Copy-paste from Vercel dashboard to avoid typos
   - Variable names must match exactly

### Issue: Sensitive data exposed in client-side code

**Symptoms:**
- Secret keys visible in browser DevTools
- API keys in page source

**Solutions:**

1. **Remove `NEXT_PUBLIC_` prefix from secret variables:**
   ```bash
   # ❌ Wrong - exposes secret
   NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_xxx
   
   # ✅ Correct - keeps secret server-side
   STRIPE_SECRET_KEY=sk_live_xxx
   ```

2. **Use API routes for sensitive operations:**
   ```javascript
   // ✅ Client-side code
   const response = await fetch('/api/create-payment', {
     method: 'POST',
     // No secret keys exposed
   });
   
   // ✅ Server-side API route (app/api/create-payment/route.ts)
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   ```

3. **Audit environment variables:**
   - Review all `NEXT_PUBLIC_` variables
   - Ensure no secrets are exposed
   - Move secrets to server-side only variables

---

## Supabase Connection Problems

### Issue: "Invalid API key" or authentication errors

**Symptoms:**
```
Error: Invalid API key
AuthError: JWT expired
```

**Solutions:**

1. **Verify API keys are correct:**
   - Go to Supabase dashboard > Settings > API
   - Copy fresh keys
   - Update in Vercel environment variables

2. **Check you're using production Supabase project:**
   - Don't use development project keys in production
   - Create separate production project

3. **Verify anon key has correct permissions:**
   - Anon key respects Row Level Security (RLS)
   - Check RLS policies are set up correctly

### Issue: "Failed to fetch" or CORS errors

**Symptoms:**
```
Failed to fetch
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solutions:**

1. **Check Supabase URL is correct:**
   - Must be full URL: `https://[project-ref].supabase.co`
   - No trailing slash

2. **Verify domain is allowed in Supabase:**
   - Go to Supabase > Authentication > URL Configuration
   - Add your production domain to allowed redirect URLs

3. **Check client initialization:**
   ```typescript
   // ✅ Correct initialization
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
   ```

### Issue: Database queries return empty results

**Symptoms:**
- Queries work in Supabase SQL editor
- Return empty/null in application

**Solutions:**

1. **Check Row Level Security (RLS) policies:**
   - RLS might be blocking access
   - Test with service role key temporarily (server-side only!)
   - Review and update RLS policies

2. **Verify user authentication:**
   - Check if user is authenticated
   - Ensure correct user context in queries

3. **Check table and column names:**
   - Supabase is case-sensitive
   - Use exact names from schema

4. **Debug query:**
   ```typescript
   const { data, error } = await supabase
     .from('subscriptions')
     .select('*')
   
   console.log('Data:', data);
   console.log('Error:', error); // Check for errors
   ```

### Issue: Real-time subscriptions not working

**Symptoms:**
- Real-time listeners not receiving updates
- No errors but no data received

**Solutions:**

1. **Enable real-time on table:**
   - Go to Supabase > Database > Replication
   - Enable replication for the table

2. **Check subscription setup:**
   ```typescript
   const subscription = supabase
     .channel('table-changes')
     .on('postgres_changes', {
       event: '*',
       schema: 'public',
       table: 'your_table'
     }, (payload) => {
       console.log('Change received!', payload)
     })
     .subscribe()
   ```

3. **Verify WebSocket connection:**
   - Check browser console for WebSocket errors
   - Ensure no proxy/firewall blocking WebSockets

---

## Stripe Integration Issues

### Issue: "No such payment intent" or "Invalid API key"

**Symptoms:**
```
Error: No such payment_intent: 'pi_xxx'
Error: Invalid API key provided
```

**Solutions:**

1. **Verify Stripe keys are for correct mode:**
   - Production uses `pk_live_` and `sk_live_`
   - Test mode uses `pk_test_` and `sk_test_`
   - Don't mix test and live keys

2. **Check Stripe account is verified:**
   - Complete business verification in Stripe dashboard
   - Activate account for live mode

3. **Verify API version compatibility:**
   - Check Stripe library version: `npm list stripe`
   - Update if needed: `npm update stripe`

### Issue: Webhooks not being received

**Symptoms:**
- Payments work but webhook handler never called
- No logs in Vercel for webhook endpoint

**Solutions:**

1. **Verify webhook endpoint URL:**
   - Should be: `https://yourdomain.com/api/webhooks/stripe`
   - Check in Stripe dashboard > Developers > Webhooks
   - Ensure using production domain, not Vercel preview URL

2. **Check webhook events are selected:**
   - Add: `checkout.session.completed`
   - Add: `customer.subscription.*`
   - Add: `invoice.*`

3. **Test webhook endpoint manually:**
   ```bash
   # Use Stripe CLI
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   stripe trigger checkout.session.completed
   ```

4. **Check webhook signature verification:**
   ```typescript
   // Ensure STRIPE_WEBHOOK_SECRET is set
   const sig = request.headers.get('stripe-signature');
   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
   
   try {
     const event = stripe.webhooks.constructEvent(
       body,
       sig!,
       webhookSecret!
     );
     // Process event...
   } catch (err) {
     console.error('Webhook signature verification failed:', err);
     return new Response('Webhook Error', { status: 400 });
   }
   ```

### Issue: Checkout session fails to create

**Symptoms:**
```
Error creating checkout session
Invalid parameters: line_items
```

**Solutions:**

1. **Verify product and price IDs:**
   - Check IDs exist in Stripe dashboard
   - Use live mode IDs for production

2. **Check required parameters:**
   ```typescript
   const session = await stripe.checkout.sessions.create({
     mode: 'subscription', // or 'payment'
     line_items: [{
       price: 'price_xxx', // Must be valid price ID
       quantity: 1,
     }],
     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
   });
   ```

3. **Verify success/cancel URLs:**
   - Must be full URLs with protocol
   - Must be from allowed domains in Stripe settings

---

## NextAuth Configuration Problems

### Issue: "redirect_uri_mismatch" error

**Symptoms:**
```
Error: redirect_uri_mismatch
The redirect URI provided does not match
```

**Solutions:**

1. **Update OAuth provider settings:**
   - Add production domain to allowed redirect URIs
   - Format: `https://yourdomain.com/api/auth/callback/[provider]`
   - Example: `https://yourdomain.com/api/auth/callback/google`

2. **Verify NEXTAUTH_URL is correct:**
   ```bash
   # Must match your domain exactly
   NEXTAUTH_URL=https://yourdomain.com
   ```

3. **Check OAuth provider configuration:**
   - Google: [console.cloud.google.com](https://console.cloud.google.com)
   - GitHub: Repository Settings > Developer settings > OAuth Apps

### Issue: Session not persisting or users logged out

**Symptoms:**
- User logs in successfully
- Session disappears on page refresh
- Users randomly logged out

**Solutions:**

1. **Verify NEXTAUTH_SECRET is set:**
   ```bash
   # Must be minimum 32 characters
   openssl rand -base64 32
   ```

2. **Check cookie settings:**
   ```typescript
   // In [...nextauth]/route.ts or pages/api/auth/[...nextauth].ts
   export const authOptions = {
     // ...
     cookies: {
       sessionToken: {
         name: '__Secure-next-auth.session-token',
         options: {
           httpOnly: true,
           sameSite: 'lax',
           path: '/',
           secure: true, // Must be true for production HTTPS
         },
       },
     },
   };
   ```

3. **Verify domain configuration:**
   - If using www and apex, configure accordingly
   - Set cookie domain to `.yourdomain.com` if needed

### Issue: "Configuration error" or NextAuth not working

**Symptoms:**
```
[next-auth][error][OAUTH_CALLBACK_ERROR]
Configuration error
```

**Solutions:**

1. **Check NextAuth configuration:**
   ```typescript
   import NextAuth from 'next-auth';
   
   export const authOptions = {
     providers: [
       // At least one provider required
     ],
     secret: process.env.NEXTAUTH_SECRET,
     // ...
   };
   ```

2. **Verify all required environment variables:**
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - Provider credentials (if using OAuth)

3. **Check NextAuth API route:**
   - Must be at `app/api/auth/[...nextauth]/route.ts`
   - Or `pages/api/auth/[...nextauth].ts` (Pages Router)

---

## Database Migration Issues

### Issue: Schema mismatch or missing tables

**Symptoms:**
```
Error: relation "table_name" does not exist
Column "field_name" does not exist
```

**Solutions:**

1. **Run migrations in production:**
   - Connect to production Supabase database
   - Run migration scripts
   - Or use Supabase CLI:
     ```bash
     supabase db push
     ```

2. **Verify schema matches application code:**
   - Check table names and column names match
   - Ensure data types are compatible

3. **Check Supabase dashboard:**
   - Go to Database > Tables
   - Verify all required tables exist
   - Check column definitions

### Issue: Migration fails with permission errors

**Symptoms:**
```
ERROR: permission denied for table xxx
ERROR: must be owner of table xxx
```

**Solutions:**

1. **Use Supabase service role for migrations:**
   - Use service role key (server-side only)
   - Don't use anon key for schema changes

2. **Run migrations through Supabase dashboard:**
   - Go to SQL Editor
   - Paste migration SQL
   - Execute with full privileges

3. **Check RLS policies don't block migration:**
   - Disable RLS temporarily for migration
   - Re-enable after migration completes

---

## Performance Issues

### Issue: Slow page load times

**Symptoms:**
- Pages take > 3 seconds to load
- Poor Lighthouse scores
- High Time to First Byte (TTFB)

**Solutions:**

1. **Enable caching:**
   - Check `vercel.json` has proper cache headers
   - Use static generation where possible
   - Implement API response caching

2. **Optimize images:**
   - Use Next.js Image component
   - Add image domains to `next.config.js`:
     ```javascript
     images: {
       domains: ['yourdomain.com', 'images.unsplash.com'],
       formats: ['image/avif', 'image/webp'],
     }
     ```

3. **Reduce bundle size:**
   - Check bundle size: `npm run build`
   - Use dynamic imports for large components
   - Remove unused dependencies

4. **Optimize database queries:**
   - Add indexes to frequently queried columns
   - Use select() to fetch only needed columns
   - Implement pagination for large datasets

### Issue: API routes timing out

**Symptoms:**
```
Error: Function execution timed out
504 Gateway Timeout
```

**Solutions:**

1. **Increase function timeout:**
   ```json
   // vercel.json
   "functions": {
     "app/api/**/*.ts": {
       "maxDuration": 10 // seconds (Pro plan allows up to 60)
     }
   }
   ```

2. **Optimize long-running operations:**
   - Move to background jobs
   - Use pagination
   - Implement caching
   - Optimize database queries

3. **Use serverless functions efficiently:**
   - Keep functions focused and fast
   - Avoid heavy computation
   - Consider moving intensive tasks to background workers

### Issue: High memory usage

**Symptoms:**
- Deployments failing
- Out of memory errors
- Slow performance

**Solutions:**

1. **Optimize dependencies:**
   - Remove unused packages
   - Use lighter alternatives
   - Check bundle analyzer output

2. **Implement code splitting:**
   ```typescript
   // Use dynamic imports
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <LoadingSpinner />,
   });
   ```

3. **Upgrade Vercel plan:**
   - Pro plan has more memory allocation
   - Enterprise for highest limits

---

## Domain and SSL Issues

### Issue: Domain not resolving

**Symptoms:**
- Domain shows "Server not found"
- DNS propagation taking too long

**Solutions:**

1. **Verify DNS records:**
   ```bash
   nslookup yourdomain.com
   dig yourdomain.com
   ```

2. **Check DNS configuration:**
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

3. **Wait for DNS propagation:**
   - Can take up to 48 hours
   - Usually 1-2 hours
   - Check status: [whatsmydns.net](https://www.whatsmydns.net/)

4. **Verify domain in Vercel:**
   - Go to Settings > Domains
   - Check for green checkmark
   - Click "Refresh" if needed

### Issue: SSL certificate errors

**Symptoms:**
```
NET::ERR_CERT_COMMON_NAME_INVALID
Your connection is not private
```

**Solutions:**

1. **Wait for automatic SSL provisioning:**
   - Takes 1-10 minutes after domain verification
   - Vercel automatically provisions Let's Encrypt certificate

2. **Force SSL renewal:**
   - Remove domain from Vercel
   - Wait 5 minutes
   - Add domain again

3. **Check domain ownership:**
   - Verify DNS records are correct
   - Ensure domain is fully verified in Vercel

4. **Clear browser cache:**
   - SSL certificates are cached
   - Try incognito mode
   - Clear browser SSL cache

---

## API Route Issues

### Issue: API route returns 404

**Symptoms:**
```
404 - This page could not be found
API route /api/xxx not found
```

**Solutions:**

1. **Verify file structure:**
   ```
   app/
     api/
       route-name/
         route.ts    ✅ Correct
   
   # Not:
   app/
     api/
       route-name.ts  ❌ Wrong
   ```

2. **Check export syntax:**
   ```typescript
   // ✅ App Router (Next.js 13+)
   export async function GET(request: Request) {
     return Response.json({ data: 'Hello' });
   }
   
   // ❌ Pages Router (outdated for app/)
   export default function handler(req, res) {
     res.json({ data: 'Hello' });
   }
   ```

3. **Verify route is exported:**
   - Must export GET, POST, PUT, DELETE, etc.
   - Named exports only (no default export)

### Issue: API route CORS errors

**Symptoms:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
Blocked by CORS policy
```

**Solutions:**

1. **Add CORS headers:**
   ```typescript
   export async function GET(request: Request) {
     return Response.json(
       { data: 'Hello' },
       {
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
           'Access-Control-Allow-Headers': 'Content-Type, Authorization',
         },
       }
     );
   }
   ```

2. **Handle OPTIONS requests:**
   ```typescript
   export async function OPTIONS(request: Request) {
     return new Response(null, {
       status: 200,
       headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       },
     });
   }
   ```

---

## General Debugging Techniques

### Enable Debug Logging

1. **Vercel CLI logs:**
   ```bash
   vercel logs --follow
   vercel logs [deployment-url]
   ```

2. **Add debug logging in code:**
   ```typescript
   console.log('[DEBUG] Variable value:', process.env.SOME_VAR);
   console.log('[DEBUG] Request received:', request.url);
   ```

3. **Check Vercel dashboard:**
   - Go to Deployments > [Your deployment]
   - View Runtime Logs
   - Check for errors and warnings

### Test in Vercel Preview Environment

1. **Create preview deployment:**
   - Push to feature branch
   - Vercel creates preview URL
   - Test with preview environment variables

2. **Use preview for testing:**
   - Test Stripe in test mode
   - Use development Supabase project
   - Safe to experiment

### Compare Local vs Production

1. **Check environment differences:**
   ```bash
   # Local
   NODE_ENV=development

   # Production
   NODE_ENV=production
   ```

2. **Test production build locally:**
   ```bash
   npm run build
   npm run start
   ```

3. **Use same environment variables:**
   - Copy production env vars to `.env.local`
   - Test locally with production-like setup

### Contact Support

If issues persist:

1. **Vercel Support:**
   - [vercel.com/support](https://vercel.com/support)
   - Include deployment URL
   - Share error logs

2. **Community Help:**
   - [Next.js Discord](https://nextjs.org/discord)
   - [Vercel Discussions](https://github.com/vercel/vercel/discussions)
   - Stack Overflow

3. **Service-Specific Support:**
   - Supabase: [supabase.com/support](https://supabase.com/support)
   - Stripe: [support.stripe.com](https://support.stripe.com)

---

## Additional Resources

- [Vercel Troubleshooting Docs](https://vercel.com/docs/platform/troubleshooting)
- [Next.js Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)
- [Supabase Common Errors](https://supabase.com/docs/guides/platform/common-errors)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

---

**Still having issues?** Check the [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed setup instructions, or reach out to support channels listed above.
