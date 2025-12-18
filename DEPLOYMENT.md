# TokyoIA Deployment Guide

This document provides comprehensive deployment instructions for all components of the TokyoIA platform.

## Deployment Overview

The TokyoIA platform consists of three main components:
- **Backend API**: Python FastAPI server
- **Web Application**: Next.js frontend
- **Android Application**: Native mobile app

Each component has its own deployment strategy and requirements.

## Prerequisites

### General Requirements
- Git installed
- Access to the repository
- Environment variables configured
- Appropriate cloud provider accounts

### Backend Requirements
- Python 3.11 or higher
- pip package manager
- Cloud hosting (AWS, GCP, Azure, or similar)
- Database access (Supabase)

### Web Requirements
- Node.js 16+ and npm
- Vercel account (recommended) or alternative hosting
- Environment variables set

### Android Requirements
- Android Studio or Gradle
- Google Play Console access (for production)
- Signing keys configured

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=false

# CORS Configuration
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# JWT Secret
JWT_SECRET=your-secure-random-secret

# ML Models Path
ML_MODELS_PATH=/app/models
```

### Web Environment Variables

Create a `.env.local` file in the `web/` directory:

```bash
# Next.js
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret

# App Config
NEXT_PUBLIC_SITE_NAME="TokyoIA"
NEXT_PUBLIC_SITE_DESCRIPTION="AI-powered premium platform"
```

### Android Environment Variables

Configure in `android/local.properties`:

```properties
sdk.dir=/path/to/android/sdk
API_BASE_URL=https://api.yourdomain.com
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Backend Deployment

### Using Docker (Recommended)

1. **Build Docker Image**:
```bash
cd backend
docker build -t tokyoia-backend:latest .
```

2. **Run Container**:
```bash
docker run -d \
  --name tokyoia-backend \
  -p 8000:8000 \
  --env-file .env \
  tokyoia-backend:latest
```

3. **Deploy to Cloud**:
```bash
# Example: Push to Docker registry
docker tag tokyoia-backend:latest your-registry/tokyoia-backend:latest
docker push your-registry/tokyoia-backend:latest
```

### Manual Deployment

1. **Install Dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Run Migrations** (if applicable):
```bash
# Future: Database migrations
alembic upgrade head
```

3. **Start Server**:
```bash
# Production with multiple workers
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

# Or with gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

### Cloud Platform Deployments

#### AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize
cd backend
eb init -p python-3.11 tokyoia-backend

# Create environment
eb create tokyoia-production

# Deploy
eb deploy
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud run deploy tokyoia-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Azure App Service
```bash
az webapp up \
  --name tokyoia-backend \
  --resource-group tokyoia-rg \
  --runtime "PYTHON:3.11"
```

### Health Checks

Verify deployment:
```bash
curl https://api.yourdomain.com/health
# Expected: {"status": "healthy"}
```

## Web Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd web
vercel --prod
```

4. **Set Environment Variables**:
```bash
# Via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Or via Vercel dashboard
# Settings → Environment Variables
```

5. **Configure Custom Domain**:
- Go to Vercel Dashboard → Project → Settings → Domains
- Add your custom domain
- Update DNS records as instructed

### Manual Deployment

1. **Build Application**:
```bash
cd web
npm install
npm run build
```

2. **Start Production Server**:
```bash
npm start
```

3. **Deploy to Other Platforms**:

**Netlify**:
```bash
npm install -g netlify-cli
cd web
netlify deploy --prod
```

**AWS Amplify**:
```bash
# Configure amplify.yml in root
amplify init
amplify publish
```

**Docker**:
```bash
cd web
docker build -t tokyoia-web:latest .
docker run -p 3000:3000 tokyoia-web:latest
```

## Android Deployment

### Build APK (Debug)
```bash
cd android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Build APK (Release)
```bash
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

### Build AAB (Google Play)
```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Sign APK/AAB

1. **Generate Keystore** (first time):
```bash
keytool -genkey -v -keystore tokyoia.keystore -alias tokyoia -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing** in `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("tokyoia.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias "tokyoia"
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. **Build Signed Release**:
```bash
export KEYSTORE_PASSWORD=your_password
export KEY_PASSWORD=your_password
./gradlew bundleRelease
```

### Deploy to Google Play

1. **Create App in Google Play Console**
2. **Upload AAB**:
   - Go to Release → Production
   - Create new release
   - Upload app-release.aab
   - Add release notes
   - Submit for review

## CI/CD Pipeline

### GitHub Actions

The repository includes automated CI/CD workflows in `.github/workflows/`:

#### Continuous Integration (`ci.yml`)
Runs automatically on push/PR to main/develop:
- Backend: Python tests with pytest
- Web: ESLint, type checking, build
- Android: Gradle build

#### Deployment Workflows

**Backend Deployment** (create `.github/workflows/deploy-backend.yml`):
```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          # Add your deployment commands
```

**Web Deployment** (automatic with Vercel):
- Vercel automatically deploys on push to main
- Preview deployments for PRs

**Android Deployment**:
```yaml
name: Deploy Android

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and deploy
        run: |
          cd android
          ./gradlew bundleRelease
          # Upload to Play Store
```

## Database Management

### Supabase Setup

1. **Create Project**:
   - Go to https://supabase.com
   - Create new project
   - Save credentials

2. **Run Migrations**:
```sql
-- Example: Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  subscription TEXT DEFAULT 'free',
  balance DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. **Set up RLS (Row Level Security)**:
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);
```

## Monitoring and Maintenance

### Application Monitoring

1. **Backend Health Checks**:
```bash
# Set up monitoring endpoint
curl https://api.yourdomain.com/health
```

2. **Web Performance**:
- Use Vercel Analytics
- Monitor Core Web Vitals
- Set up error tracking (e.g., Sentry)

3. **Database Monitoring**:
- Supabase Dashboard → Performance
- Monitor query performance
- Set up alerts for slow queries

### Log Management

**Backend Logs**:
```bash
# Docker logs
docker logs tokyoia-backend

# Or use logging service
# - AWS CloudWatch
# - Google Cloud Logging
# - Azure Monitor
```

**Web Logs**:
- Vercel Dashboard → Logs
- Real-time function logs
- Error tracking

### Backup Strategy

**Database Backups**:
- Supabase provides automatic daily backups
- Enable Point-in-Time Recovery (PITR)
- Export periodic snapshots:
```bash
# Manual backup
pg_dump -h your-supabase-db > backup.sql
```

**Application Data**:
- Store critical data in version control
- Back up environment variables securely
- Document configuration changes

## Rollback Procedures

### Backend Rollback

**Docker Deployment**:
```bash
# Tag previous version
docker tag tokyoia-backend:current tokyoia-backend:rollback

# Deploy previous version
docker pull your-registry/tokyoia-backend:previous
docker tag your-registry/tokyoia-backend:previous tokyoia-backend:latest
docker restart tokyoia-backend
```

**Manual Deployment**:
```bash
cd backend
git checkout previous-stable-tag
pip install -r requirements.txt
systemctl restart tokyoia-backend
```

### Web Rollback

**Vercel**:
- Go to Vercel Dashboard → Deployments
- Find previous successful deployment
- Click "Promote to Production"

**Manual**:
```bash
cd web
git checkout previous-stable-tag
npm install
npm run build
pm2 restart tokyoia-web
```

### Android Rollback

- Google Play Console → Release Management
- Deactivate current release
- Reactivate previous version
- Or increase rollout percentage gradually

## Security Considerations

### SSL/TLS Certificates
- Use Let's Encrypt for free certificates
- Vercel provides automatic HTTPS
- Configure SSL for backend API

### Secrets Management
- Use cloud provider secret managers (AWS Secrets Manager, GCP Secret Manager)
- Never commit secrets to version control
- Rotate secrets regularly

### API Security
- Enable rate limiting
- Implement API key authentication
- Use CORS properly
- Monitor for suspicious activity

## Performance Optimization

### Backend
- Enable gzip compression
- Use connection pooling
- Implement caching (Redis)
- Optimize database queries

### Web
- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement code splitting
- Enable caching headers

### Database
- Create appropriate indexes
- Optimize query patterns
- Monitor slow queries
- Scale as needed

## Troubleshooting

### Common Issues

**Backend won't start**:
- Check environment variables
- Verify database connection
- Check logs for errors
- Ensure dependencies installed

**Web build fails**:
- Clear `.next` directory
- Delete `node_modules` and reinstall
- Check for TypeScript errors
- Verify environment variables

**Android build fails**:
- Clean build: `./gradlew clean`
- Sync Gradle files
- Check SDK versions
- Verify signing configuration

## Scaling Strategies

### Horizontal Scaling
- Add more backend server instances
- Use load balancer (e.g., AWS ALB, NGINX)
- Database read replicas

### Vertical Scaling
- Increase server resources
- Optimize application code
- Add caching layer

### Auto-scaling
- Configure based on CPU/memory usage
- Set minimum and maximum instances
- Monitor and adjust thresholds

## Navigation

- [Main Documentation](README.md)
- [Repository Structure](STRUCTURE.md)
- [Architecture](ARCHITECTURE.md)
- [Detailed Documentation](DOCUMENTATION.md)
- [Contributing Guide](CONTRIBUTING.md)
