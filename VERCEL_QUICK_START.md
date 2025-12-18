# 🚀 Deploy to Vercel in Under 5 Minutes

## Prerequisites
- GitHub account with this repository
- Vercel account (free tier works fine)

## Step 1: Create Vercel Project (2 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your GitHub repository: `Melampe001/bug-free-octo-winner-Tokyo-IA2`
4. Configure project settings:
   - **Root Directory**: `web`
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

## Step 2: Add Environment Variables (2 minutes)

In the Vercel project settings, add these 5 **required** environment variables:

### Required Variables:
1. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
3. `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Your Stripe publishable key
4. `NEXTAUTH_SECRET` - Random 32+ character secret string
5. `STRIPE_SECRET_KEY` - Your Stripe secret key

**Where to get these values?** → See `VERCEL_ENV_SETUP.md`

### Optional Variables (can add later):
- `SUPABASE_SERVICE_ROLE_KEY` - For admin operations
- `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks
- `NEXT_PUBLIC_APP_URL` - Your production URL (auto-set by Vercel)

## Step 3: Deploy (1 minute)

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. Done! 🎉

Your app will be live at: `https://your-project-name.vercel.app`

## Post-Deployment

### Update Stripe Webhook
Once deployed, add your Vercel URL to Stripe webhook settings:
- Webhook URL: `https://your-project-name.vercel.app/api/webhooks/stripe`

### Update Supabase Auth
Add your Vercel URL to Supabase authentication settings:
- Site URL: `https://your-project-name.vercel.app`
- Redirect URLs: `https://your-project-name.vercel.app/auth/callback`

## Troubleshooting

### Build fails?
- Check all 5 required environment variables are set
- Make sure Root Directory is set to `web`

### Runtime errors?
- Verify environment variables are correct
- Check Vercel function logs in dashboard

### Need help?
- Check Vercel deployment logs
- Review environment variable setup in `VERCEL_ENV_SETUP.md`

---

**That's it!** Your Local Premium Elite app is now live on Vercel.
