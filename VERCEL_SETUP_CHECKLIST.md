# Vercel Setup Checklist - Local Premium Elite

Complete checklist for deploying Local Premium Elite to Vercel. Use this to track your progress and ensure nothing is missed.

## 📋 Pre-Deployment Setup

### ✅ Account Setup & Prerequisites
- [ ] Vercel account created ([vercel.com/signup](https://vercel.com/signup))
- [ ] GitHub account with repository access
- [ ] Supabase production project created ([supabase.com](https://supabase.com))
- [ ] Stripe account verified and in Live mode ([stripe.com](https://stripe.com))
- [ ] Domain name purchased (if using custom domain)
- [ ] Team members invited (if applicable)

**Estimated Time:** 15-20 minutes

---

## 🗄️ Database Setup (Supabase)

### ✅ Supabase Production Database
- [ ] New production project created (don't reuse dev project)
- [ ] Project region selected (closest to target users)
- [ ] Strong database password generated and saved securely
- [ ] Database schema migrated/created
- [ ] Row Level Security (RLS) policies enabled
- [ ] Required tables created:
  - [ ] Users/profiles table
  - [ ] Subscriptions table
  - [ ] Transactions/payments table
  - [ ] Other application-specific tables
- [ ] Storage buckets configured (if using file uploads)
- [ ] Database backups enabled (Point-in-Time Recovery)

### ✅ Supabase Credentials Collected
- [ ] Project URL saved: `https://[project-ref].supabase.co`
- [ ] Anon/Public key copied (from Settings > API)
- [ ] Service Role key copied and stored securely (from Settings > API)
- [ ] Database connection string saved (if needed)

**Estimated Time:** 20-30 minutes

**Resources:**
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Documentation](https://supabase.com/docs)

---

## 💳 Payment Setup (Stripe)

### ✅ Stripe Production Configuration
- [ ] Stripe account verified (business info, bank details, tax info)
- [ ] Switched to **Live mode** (toggle in top-right corner)
- [ ] Business profile completed
- [ ] Bank account connected for payouts
- [ ] Tax settings configured
- [ ] Branding/logo uploaded (optional)

### ✅ Stripe Products & Pricing
- [ ] Subscription products created
- [ ] Pricing tiers configured
- [ ] Billing intervals set (monthly/annual)
- [ ] Trial periods configured (if applicable)
- [ ] Proration settings configured

### ✅ Stripe Credentials Collected
- [ ] Publishable key copied: `pk_live_...`
- [ ] Secret key copied and stored securely: `sk_live_...`
- [ ] Webhook secret noted (will be set after deployment): `whsec_...`

### ✅ Stripe Webhook (Post-Deployment)
⚠️ Complete AFTER initial deployment:
- [ ] Webhook endpoint created in Stripe dashboard
- [ ] Endpoint URL set to: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Events selected:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.created`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.paid`
  - [ ] `invoice.payment_failed`
- [ ] Webhook signing secret copied to Vercel environment variables
- [ ] Webhook tested with sample event

**Estimated Time:** 25-35 minutes

**Resources:**
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe Live Mode Checklist](https://stripe.com/docs/keys#live-mode)

---

## 🔐 Authentication Setup (NextAuth)

### ✅ NextAuth Configuration
- [ ] NEXTAUTH_SECRET generated (use: `openssl rand -base64 32`)
- [ ] Secret is minimum 32 characters
- [ ] Secret stored securely (password manager)
- [ ] Different secret for Preview environment

### ✅ OAuth Providers (if applicable)
- [ ] Google OAuth configured
  - [ ] Client ID obtained
  - [ ] Client Secret obtained
  - [ ] Authorized redirect URIs updated
- [ ] GitHub OAuth configured
  - [ ] Client ID obtained
  - [ ] Client Secret obtained
  - [ ] Authorization callback URL updated
- [ ] Other providers configured as needed

**Estimated Time:** 10-15 minutes

---

## 🚀 Vercel Project Setup

### ✅ GitHub Connection
- [ ] Repository imported to Vercel
- [ ] Vercel GitHub app installed
- [ ] Correct repository selected
- [ ] Branch to deploy selected (usually `main` or `master`)

### ✅ Project Configuration
- [ ] Project name set
- [ ] Framework preset: **Next.js** selected (auto-detected)
- [ ] Root directory set to: **`web`** ⚠️ CRITICAL
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Install command: `npm install` (default)
- [ ] Node.js version: 18.x or higher

**Estimated Time:** 5-10 minutes

---

## 🔧 Environment Variables Configuration

### ✅ Required Environment Variables in Vercel
Add these in **Settings > Environment Variables**:

#### Next.js Variables
- [ ] `NEXT_PUBLIC_APP_URL`
  - **Production:** `https://your-production-domain.com`
  - **Preview:** Can use Vercel URL or leave unset

#### Supabase Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - **Value:** `https://[project-ref].supabase.co`
  - **Environments:** Production, Preview
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **Value:** Your anon key from Supabase
  - **Environments:** Production, Preview
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - **Value:** Your service role key from Supabase
  - **Environments:** Production only
  - **⚠️ SECRET:** Never expose to client

#### Stripe Variables
- [ ] `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
  - **Production:** `pk_live_...`
  - **Preview:** `pk_test_...` (use test key)
  - **Environments:** Production, Preview
- [ ] `STRIPE_SECRET_KEY`
  - **Production:** `sk_live_...`
  - **Preview:** `sk_test_...` (use test key)
  - **Environments:** Production, Preview
  - **⚠️ SECRET:** Never expose to client
- [ ] `STRIPE_WEBHOOK_SECRET`
  - **Value:** `whsec_...` (get after webhook setup)
  - **Environments:** Production only
  - **⚠️ SECRET:** Set after initial deployment

#### NextAuth Variables
- [ ] `NEXTAUTH_URL`
  - **Production:** `https://your-production-domain.com`
  - **Preview:** Vercel preview URL or leave unset
  - **Environments:** Production, Preview
- [ ] `NEXTAUTH_SECRET`
  - **Value:** Generated with `openssl rand -base64 32`
  - **Environments:** Production, Preview (different values!)
  - **⚠️ SECRET:** Minimum 32 characters

#### App Configuration Variables
- [ ] `NEXT_PUBLIC_SITE_NAME`
  - **Value:** `Local Premium Elite`
  - **Environments:** Production, Preview, Development
- [ ] `NEXT_PUBLIC_SITE_DESCRIPTION`
  - **Value:** `Premium subscription-based platform with elite features`
  - **Environments:** Production, Preview, Development

### ✅ Optional Analytics Variables (Recommended)
- [ ] `NEXT_PUBLIC_SENTRY_DSN` (error tracking)
- [ ] `NEXT_PUBLIC_GA_TRACKING_ID` (Google Analytics)
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` (product analytics)

**Estimated Time:** 15-20 minutes

---

## 🌐 Domain Configuration

### ✅ Custom Domain Setup
- [ ] Domain added in Vercel (Settings > Domains)
- [ ] DNS records configured at domain registrar:
  - [ ] A record: `@` → `76.76.21.21`
  - [ ] CNAME record: `www` → `cname.vercel-dns.com`
- [ ] Domain verification completed (green checkmark)
- [ ] SSL certificate provisioned automatically
- [ ] www redirect configured (www → apex or apex → www)

### ✅ Update Environment Variables with Domain
- [ ] `NEXT_PUBLIC_APP_URL` updated to custom domain
- [ ] `NEXTAUTH_URL` updated to custom domain
- [ ] Redeployed after updating variables

**Estimated Time:** 10-15 minutes (plus DNS propagation 1-24 hours)

**Note:** DNS propagation can take up to 48 hours but usually completes in 1-2 hours.

---

## 🔒 SSL/TLS & Security

### ✅ SSL Certificate
- [ ] SSL certificate auto-provisioned by Vercel
- [ ] HTTPS working (padlock icon in browser)
- [ ] Certificate is valid (click padlock to verify)
- [ ] HTTP automatically redirects to HTTPS

### ✅ Security Headers
- [ ] Security headers configured in `next.config.js`:
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-XSS-Protection: 1; mode=block`
  - [ ] `Referrer-Policy: origin-when-cross-origin`
- [ ] Verified with: `curl -I https://yourdomain.com`

**Estimated Time:** 5 minutes (automatic)

---

## 🚀 Initial Deployment

### ✅ First Deploy
- [ ] All environment variables added
- [ ] Git pushed to trigger deployment (or manual deploy)
- [ ] Build logs monitored (no errors)
- [ ] Build completed successfully
- [ ] Deployment URL accessible
- [ ] Site loads without errors

### ✅ Post-Deployment Configuration
- [ ] Stripe webhook endpoint created with production URL
- [ ] `STRIPE_WEBHOOK_SECRET` updated in Vercel
- [ ] Redeployed to apply webhook secret
- [ ] Webhook tested with Stripe test event

**Estimated Time:** 10-15 minutes

---

## ✅ Monitoring & Analytics Setup

### ✅ Vercel Analytics
- [ ] Vercel Analytics enabled (Settings > Analytics)
- [ ] Web Vitals tracking active
- [ ] Real Experience Score (RES) monitoring

### ✅ Error Monitoring (Recommended)
- [ ] Sentry project created and DSN added
- [ ] Error tracking tested
- [ ] Alerts configured for critical errors

### ✅ Application Monitoring
- [ ] Log monitoring set up
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured (e.g., UptimeRobot)

**Estimated Time:** 15-20 minutes

---

## 🔍 Post-Deployment Testing

### ✅ Functionality Testing
- [ ] Homepage loads correctly
- [ ] All static pages accessible
- [ ] API routes responding
- [ ] No console errors

### ✅ Authentication Testing
- [ ] Sign-up flow works
- [ ] Sign-in flow works
- [ ] Sign-out works
- [ ] Session persistence works
- [ ] Protected routes redirect correctly

### ✅ Database Testing
- [ ] Data reads successfully
- [ ] Data writes successfully
- [ ] Real-time features work (if applicable)
- [ ] RLS policies enforced correctly

### ✅ Payment Testing
- [ ] Checkout page loads
- [ ] Test payment succeeds (use Stripe test card)
- [ ] Webhook received and processed
- [ ] Subscription status updates
- [ ] Customer portal accessible

### ✅ Performance Testing
- [ ] Lighthouse audit score > 90
- [ ] PageSpeed Insights score acceptable
- [ ] Images loading and optimized
- [ ] Time to First Byte (TTFB) < 600ms
- [ ] Core Web Vitals passing:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### ✅ Mobile Testing
- [ ] Site responsive on mobile devices
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Forms usable on mobile

### ✅ Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Estimated Time:** 30-45 minutes

---

## 📊 Cron Jobs (If Applicable)

### ✅ Scheduled Tasks Configuration
- [ ] Cron jobs defined in `vercel.json`
- [ ] API routes created for scheduled tasks
- [ ] Cron job schedule configured (cron syntax)
- [ ] Cron jobs tested manually
- [ ] Cron job logs monitored

**Example tasks:**
- Daily subscription status checks
- Weekly usage reports
- Monthly billing reconciliation

**Estimated Time:** 10-15 minutes (if needed)

---

## 👥 Team Collaboration (If Applicable)

### ✅ Team Access
- [ ] Team members invited to Vercel project
- [ ] Roles assigned appropriately
- [ ] Access to environment variables controlled
- [ ] GitHub collaborators added
- [ ] Documentation shared with team

**Estimated Time:** 10 minutes

---

## 📝 Documentation & Handoff

### ✅ Internal Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Runbook created for common tasks
- [ ] Emergency procedures documented
- [ ] Contact information for services documented

### ✅ Post-Deployment Checklist
- [ ] Backup strategy defined
- [ ] Monitoring alerts configured
- [ ] Incident response plan created
- [ ] Security audit scheduled
- [ ] Performance baseline established

**Estimated Time:** 20-30 minutes

---

## 🎉 Go-Live Checklist

### ✅ Final Pre-Launch Items
- [ ] All tests passing
- [ ] Monitoring active and alerting
- [ ] Backups configured
- [ ] Team notified of launch
- [ ] Support channels ready
- [ ] Marketing/comms aligned (if applicable)

### ✅ Launch Day
- [ ] DNS switched to production (if migrating)
- [ ] Old site redirected (if applicable)
- [ ] Monitoring dashboard open
- [ ] Team available for immediate support
- [ ] Social media announcement ready (if applicable)

### ✅ Post-Launch (First 24 Hours)
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Verify payment processing
- [ ] Check analytics data

**Estimated Time:** Variable

---

## 📈 Ongoing Maintenance

### ✅ Regular Tasks
- [ ] **Daily:** Monitor error logs
- [ ] **Daily:** Check system health dashboard
- [ ] **Weekly:** Review analytics and usage
- [ ] **Weekly:** Check for security updates
- [ ] **Monthly:** Review performance metrics
- [ ] **Monthly:** Audit user access and permissions
- [ ] **Quarterly:** Rotate secrets and API keys
- [ ] **Quarterly:** Review and optimize costs
- [ ] **Annually:** Security audit
- [ ] **Annually:** Disaster recovery test

---

## 🆘 Troubleshooting Resources

### Quick Links
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- [Deployment Troubleshooting](./DEPLOYMENT_TROUBLESHOOTING.md)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

### Support Channels
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: [supabase.com/support](https://supabase.com/support)
- Stripe Support: [support.stripe.com](https://support.stripe.com)

---

## ✅ Completion Summary

### Time Investment
- **Pre-deployment setup:** ~1-1.5 hours
- **Deployment & testing:** ~1-1.5 hours
- **Post-deployment optimization:** ~30-60 minutes
- **Total estimated time:** 3-4 hours

### Success Criteria
✅ All checklist items completed
✅ Application running smoothly in production
✅ All tests passing
✅ Monitoring active
✅ Team trained and documentation complete

---

**Congratulations! 🎉 Your Local Premium Elite application is now successfully deployed on Vercel!**

**Next Steps:**
1. Monitor application performance for first 48 hours
2. Gather user feedback
3. Plan iterative improvements
4. Keep documentation updated
5. Schedule regular maintenance tasks

---

**Note:** Print this checklist or keep it open in a separate tab/window while deploying. Check off items as you complete them to track progress.
