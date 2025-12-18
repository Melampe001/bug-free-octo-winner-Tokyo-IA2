# TokyoIA Web Application

Next.js web application for the TokyoIA platform.

## Features

- Modern React with Next.js 14
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design
- API integration with backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with required environment variables:
```bash
# Copy from .env.example
cp .env.example .env.local
```

Then update `.env.local` with your actual values:
```
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# App Config
NEXT_PUBLIC_SITE_NAME="Local Premium Elite"
NEXT_PUBLIC_SITE_DESCRIPTION="Premium subscription-based platform with elite features"
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Project Structure

```
web/
├── app/               # Next.js app router
│   ├── page.tsx      # Home page
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/        # React components
│   ├── Button.tsx     # Button component
│   └── Header.tsx     # Header component
├── public/           # Static assets
├── package.json      # Dependencies
└── README.md        # This file
```

## Technologies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Query** - Data fetching
- **Axios** - HTTP client

## Development

The web application connects to the backend API running on port 8000. Make sure the backend is running before starting development.

## Deployment

### Vercel Deployment

This application is designed to be deployed on Vercel. Follow these steps:

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository

2. **Configure Environment Variables**
   
   In your Vercel project settings, add the following environment variables:

   **Supabase Configuration:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<your_supabase_service_role_key>
   ```

   **Stripe Configuration:**
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
   ```

   **NextAuth Configuration:**
   ```
   NEXTAUTH_URL=<your_production_url>
   NEXTAUTH_SECRET=<generate_random_secret>
   ```

   **App Configuration:**
   ```
   NEXT_PUBLIC_APP_URL=<your_production_url>
   NEXT_PUBLIC_SITE_NAME="Local Premium Elite"
   NEXT_PUBLIC_SITE_DESCRIPTION="Premium subscription-based platform with elite features"
   ```

3. **Deploy**
   - Click "Deploy" and Vercel will build and deploy your application
   - Once deployed, update the `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` with your actual Vercel URL

4. **Configure Stripe Webhooks**
   - In your Stripe Dashboard, add your Vercel URL + `/api/stripe/webhook` as a webhook endpoint
   - Copy the webhook signing secret and update the `STRIPE_WEBHOOK_SECRET` environment variable

For more details, see the main project README for additional deployment instructions.
