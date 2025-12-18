# Vercel Deployment Guide - Local Premium Elite

Complete guide for deploying the Local Premium Elite Next.js 14 application to Vercel.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Account Setup](#step-1-account-setup)
- [Step 2: Connect GitHub Repository](#step-2-connect-github-repository)
- [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
- [Step 4: Build Settings](#step-4-build-settings)
- [Step 5: Domain Configuration](#step-5-domain-configuration)
- [Step 6: SSL/TLS Certificates](#step-6-ssltls-certificates)
- [Step 7: Monitoring and Logs](#step-7-monitoring-and-logs)
- [Step 8: Post-Deployment Verification](#step-8-post-deployment-verification)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
1. **Vercel Account** - [Sign up at vercel.com](https://vercel.com/signup)
2. **Supabase Account** - [Sign up at supabase.com](https://supabase.com)
3. **Stripe Account** - [Sign up at stripe.com](https://stripe.com)
4. **GitHub Account** - Repository access required

### Required Information
- GitHub repository access
- Production domain name (if using custom domain)
- SSL certificate (if using custom SSL, optional)

### Estimated Time
- **Initial Setup**: 30-45 minutes
- **Environment Configuration**: 15-20 minutes
- **Custom Domain Setup**: 10-15 minutes
- **Total**: ~1-1.5 hours

### Cost Considerations
- **Vercel**: Free tier available (Hobby plan), Pro plan starts at $20/month
- **Supabase**: Free tier available, Pro starts at $25/month
- **Stripe**: Pay-as-you-go, 2.9% + $0.30 per successful charge
- **Domain**: ~$10-15/year (if purchasing new domain)

---

## Step 1: Account Setup

### 1.1 Vercel Account
1. Visit [vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (recommended for easier repository connection)
3. Complete email verification
4. Choose your plan:
   - **Hobby** (Free): Personal projects, non-commercial use
   - **Pro** ($20/month): Commercial projects, team collaboration
   - **Enterprise**: Contact sales for custom pricing

### 1.2 Supabase Production Database
1. Go to [supabase.com](https://supabase.com)
2. Create a new project:
   - Click "New Project"
   - Choose organization
   - Enter project name: `local-premium-elite-prod`
   - Choose region closest to your users (e.g., `us-east-1`)
   - Generate a strong database password (save this securely!)
3. Wait 2-3 minutes for project initialization
4. Navigate to Settings > API to get:
   - Project URL: `https://[project-ref].supabase.co`
   - `anon` public key
   - `service_role` secret key (keep secure!)

### 1.3 Stripe Production Account
1. Log into [dashboard.stripe.com](https://dashboard.stripe.com)
2. Switch to **Live mode** (toggle in top-right)
3. Complete account verification:
   - Business information
   - Bank account details
   - Tax information
4. Get API keys from Developers > API keys:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...` (keep secure!)
5. Set up webhook endpoint (after Vercel deployment):
   - Go to Developers > Webhooks
   - Click "Add endpoint"
   - URL will be: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

---

## Step 2: Connect GitHub Repository

### 2.1 Import Project to Vercel
1. Log into [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." > "Project"
3. Import from GitHub:
   - If first time: Click "Install Vercel" on GitHub
   - Grant access to the `bug-free-octo-winner-Tokyo-IA2` repository
4. Select the repository from the list

### 2.2 Configure Project Settings
1. **Project Name**: `local-premium-elite` (or your preference)
2. **Framework Preset**: Next.js (should auto-detect)
3. **Root Directory**: `web` ⚠️ **IMPORTANT** - The Next.js app is in the `web` folder
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `.next` (default)
6. **Install Command**: `npm install` (default)

**Do not deploy yet!** We need to configure environment variables first.

---

## Step 3: Configure Environment Variables

### 3.1 Add Environment Variables in Vercel
1. In your Vercel project settings, go to **Settings** > **Environment Variables**
2. Add each variable below for **Production** environment
3. Click "Add" after each variable

### 3.2 Required Environment Variables

#### Next.js Configuration
```
NEXT_PUBLIC_APP_URL
Value: https://yourdomain.com
Environments: Production
```

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL
Value: https://[your-project-ref].supabase.co
Environments: Production, Preview

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [your-anon-key]
Environments: Production, Preview

SUPABASE_SERVICE_ROLE_KEY
Value: [your-service-role-key]
Environments: Production
⚠️ Keep this secret! Do not expose in client-side code.
```

#### Stripe Configuration
```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY
Value: pk_live_[your-publishable-key]
Environments: Production

STRIPE_SECRET_KEY
Value: sk_live_[your-secret-key]
Environments: Production
⚠️ Keep this secret! Never expose publicly.

STRIPE_WEBHOOK_SECRET
Value: whsec_[your-webhook-secret]
Environments: Production
Note: Get this after setting up webhook endpoint
```

#### NextAuth Configuration
```
NEXTAUTH_URL
Value: https://yourdomain.com
Environments: Production

NEXTAUTH_SECRET
Value: [generate-random-secret]
Environments: Production
⚠️ Generate with: openssl rand -base64 32
```

#### App Configuration
```
NEXT_PUBLIC_SITE_NAME
Value: Local Premium Elite
Environments: Production, Preview

NEXT_PUBLIC_SITE_DESCRIPTION
Value: Premium subscription-based platform with elite features
Environments: Production, Preview
```

### 3.3 Generate NEXTAUTH_SECRET
Run this command locally to generate a secure secret:
```bash
openssl rand -base64 32
```
Copy the output and use it as `NEXTAUTH_SECRET`

### 3.4 Environment Variables Best Practices
- ✅ Use `NEXT_PUBLIC_` prefix only for variables needed in browser
- ✅ Keep secret keys (Stripe, Supabase service role) server-side only
- ✅ Use different values for Preview vs Production
- ✅ Store sensitive values in a password manager
- ✅ Rotate secrets periodically (every 90 days)
- ❌ Never commit `.env` files to Git
- ❌ Never expose secret keys in client-side code

---

## Step 4: Build Settings

### 4.1 Verify Build Configuration
Your `vercel.json` is already configured in the `web` directory:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 4.2 Deploy Your Application
1. After adding all environment variables, return to the project overview
2. Click "Deploy" or trigger deployment via:
   ```bash
   git push origin main
   ```
3. Watch the build logs in real-time
4. First deployment takes 3-5 minutes

### 4.3 Build Optimization
The application includes several optimizations:
- ✅ SWC minification enabled
- ✅ Image optimization with AVIF/WebP
- ✅ CSS optimization
- ✅ Package import optimization for `lucide-react`
- ✅ Gzip compression enabled
- ✅ Security headers configured

### 4.4 Monitor Build Progress
1. Click on the deployment in Vercel dashboard
2. View real-time logs in "Building" section
3. Check for any errors or warnings
4. Typical build time: 2-3 minutes

---

## Step 5: Domain Configuration

### 5.1 Using Vercel Default Domain
Your app is automatically available at:
```
https://[project-name].vercel.app
```

### 5.2 Add Custom Domain

#### If you own a domain:
1. Go to Project Settings > **Domains**
2. Click "Add Domain"
3. Enter your domain: `yourdomain.com`
4. Click "Add"

#### Configure DNS Records:
Vercel will provide DNS configuration. Add these records to your domain registrar:

**For apex domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Recommended Setup:
Add both apex and www:
1. `yourdomain.com` (primary)
2. `www.yourdomain.com` (redirect to primary)

### 5.3 Domain Verification
1. Wait 24-48 hours for DNS propagation (usually faster: 1-2 hours)
2. Vercel will automatically verify and provision SSL
3. Check status in Domains section
4. Once verified, you'll see a green checkmark ✓

### 5.4 Domain Best Practices
- ✅ Use both apex and www (with redirect)
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Set up www to redirect to apex (or vice versa)
- ✅ Update `NEXT_PUBLIC_APP_URL` environment variable
- ✅ Update `NEXTAUTH_URL` environment variable

---

## Step 6: SSL/TLS Certificates

### 6.1 Automatic SSL (Recommended)
Vercel automatically provisions and renews SSL certificates via Let's Encrypt:
- ✅ Free SSL certificates
- ✅ Automatic renewal every 90 days
- ✅ Wildcard support for subdomains
- ✅ HTTP/2 and HTTP/3 support

**No action needed!** SSL is automatic once domain is verified.

### 6.2 Custom SSL Certificate (Optional)
If you have a custom certificate:
1. Go to Project Settings > **Domains**
2. Click on your domain
3. Scroll to "SSL Certificate"
4. Upload certificate files:
   - Certificate (`.crt`)
   - Private key (`.key`)
   - Certificate chain (optional)

### 6.3 Verify SSL Configuration
1. Visit your domain with `https://`
2. Check for padlock icon in browser
3. Click padlock to view certificate details
4. Verify issued by "Let's Encrypt" or your custom CA

### 6.4 Force HTTPS
Your `next.config.js` already includes security headers. To force HTTPS at DNS level:
1. Vercel automatically redirects HTTP to HTTPS
2. Add HSTS header (already configured in `next.config.js`)

---

## Step 7: Monitoring and Logs

### 7.1 Vercel Analytics
Enable analytics to monitor performance:
1. Go to Project > **Analytics**
2. Click "Enable Analytics"
3. Choose plan:
   - **Hobby**: 100k events/month (free)
   - **Pro**: Unlimited events

Metrics tracked:
- Real Experience Score (RES)
- Web Vitals (LCP, FID, CLS)
- Page views
- Time to First Byte (TTFB)

### 7.2 Runtime Logs
Access logs for debugging:
1. Go to Project > **Deployments**
2. Click on active deployment
3. Navigate to **Functions** or **Runtime Logs**
4. Filter by:
   - Time range
   - Log level (info, warn, error)
   - Function name

### 7.3 Real-time Logs
Stream logs in real-time:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to project
vercel link

# Stream logs
vercel logs --follow
```

### 7.4 Error Monitoring (Recommended)
Integrate external error monitoring:
- **Sentry**: [sentry.io](https://sentry.io) - Error tracking
- **LogRocket**: [logrocket.com](https://logrocket.com) - Session replay
- **Datadog**: [datadoghq.com](https://datadoghq.com) - Full observability

### 7.5 Performance Monitoring
Monitor Core Web Vitals:
1. Enable Vercel Speed Insights
2. Check Lighthouse scores
3. Monitor:
   - Largest Contentful Paint (LCP) < 2.5s
   - First Input Delay (FID) < 100ms
   - Cumulative Layout Shift (CLS) < 0.1

---

## Step 8: Post-Deployment Verification

### 8.1 Functionality Checklist
Test these features after deployment:

**Authentication (NextAuth):**
- [ ] User can sign up
- [ ] User can log in
- [ ] User can log out
- [ ] Session persists correctly
- [ ] Protected routes work

**Database (Supabase):**
- [ ] Data reads successfully
- [ ] Data writes successfully
- [ ] Real-time subscriptions work (if used)
- [ ] Row Level Security (RLS) is enabled

**Payments (Stripe):**
- [ ] Checkout page loads
- [ ] Payment processes successfully
- [ ] Webhooks are received
- [ ] Subscription status updates
- [ ] Customer portal works

**General:**
- [ ] All pages load correctly
- [ ] Images load and optimize
- [ ] API routes respond correctly
- [ ] No console errors
- [ ] Mobile responsiveness
- [ ] Performance score > 90

### 8.2 Performance Testing
1. Run Lighthouse audit:
   - Open Chrome DevTools
   - Go to "Lighthouse" tab
   - Run audit for Performance, Accessibility, SEO
   - Target scores: All > 90

2. Test load time:
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Target: < 2 seconds First Contentful Paint

### 8.3 Security Verification
1. Check security headers:
   ```bash
   curl -I https://yourdomain.com
   ```
   Verify presence of:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`

2. Test SSL:
   - Visit [SSL Labs](https://www.ssllabs.com/ssltest/)
   - Enter your domain
   - Target grade: A or A+

### 8.4 Update Webhook URLs
After deployment, update webhook URLs in external services:

**Stripe Webhooks:**
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) > Developers > Webhooks
2. Update endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
3. Copy the signing secret
4. Update `STRIPE_WEBHOOK_SECRET` in Vercel

**Test Webhooks:**
1. Trigger a test event in Stripe dashboard
2. Check Vercel logs for webhook received
3. Verify webhook handler processes correctly

---

## Troubleshooting

For detailed troubleshooting, see [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)

### Quick Fixes

**Build fails:**
- Check Node.js version compatibility (v18+ recommended)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors: `npm run type-check`

**Environment variables not working:**
- Verify variable names are correct (case-sensitive)
- Check if variable is available in correct environment
- Redeploy after adding new variables

**Domain not resolving:**
- Wait 24-48 hours for DNS propagation
- Verify DNS records at domain registrar
- Use `nslookup yourdomain.com` to check DNS

**Authentication issues:**
- Verify `NEXTAUTH_URL` matches your domain
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

---

## Additional Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [NextAuth Documentation](https://next-auth.js.org/)

### Support
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js Discord](https://nextjs.org/discord)

### Security Best Practices
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Vercel Security](https://vercel.com/docs/concepts/security)

---

## Next Steps

After successful deployment:
1. ✅ Review [VERCEL_SETUP_CHECKLIST.md](./VERCEL_SETUP_CHECKLIST.md) for completeness
2. ✅ Set up monitoring and alerts
3. ✅ Configure backup strategy for Supabase
4. ✅ Set up staging environment for testing
5. ✅ Document any custom configurations
6. ✅ Share access with team members
7. ✅ Set up CI/CD if not using Vercel Git integration

**Congratulations! Your Local Premium Elite application is now live on Vercel! 🎉**
