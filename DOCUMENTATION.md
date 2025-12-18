# TokyoIA Detailed Documentation

This document provides comprehensive, file-by-file documentation for the TokyoIA platform, including code examples and development workflows.

## Table of Contents

- [Backend Documentation](#backend-documentation)
- [Web Documentation](#web-documentation)
- [Android Documentation](#android-documentation)
- [Configuration Files](#configuration-files)
- [Development Workflows](#development-workflows)
- [Environment Variables](#environment-variables)

---

## Backend Documentation

### Backend Structure

The backend is a Python FastAPI application located in `/backend/app/`.

### Core Files

#### `backend/app/main.py`

**Purpose**: Main FastAPI application entry point and server configuration.

**Key Components**:
- FastAPI app initialization
- CORS middleware configuration
- Root and health check endpoints

**Code Example**:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TokyoIA API",
    description="AI-powered casino and payment platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to TokyoIA API", "version": "1.0.0"}
```

**Usage**:
```bash
# Run the server
cd backend/app
python main.py

# Or with uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Authentication Module

#### `backend/app/auth/__init__.py`

**Purpose**: User authentication endpoints (login, register, logout).

**Features**:
- User registration with email validation
- User login with credentials
- User logout

**Endpoints**:
- `POST /auth/login`: User login
- `POST /auth/register`: User registration  
- `POST /auth/logout`: User logout

**Models**:
```python
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    username: str
```

**Example Request**:
```bash
# Register new user
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "username": "johndoe"
  }'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

**Development Notes**:
- Current implementation provides basic endpoint structure
- Full JWT token generation and password hashing to be implemented
- Supabase authentication integration planned

### Payment Module

#### `backend/app/payments/__init__.py`

**Purpose**: Payment processing, deposits, withdrawals, and transaction management.

**Features**:
- Process deposits with multiple payment methods
- Handle withdrawal requests
- Get user balance
- Retrieve transaction history

**Endpoints**:
- `POST /payments/deposit`: Process a deposit
- `POST /payments/withdraw`: Process a withdrawal
- `GET /payments/balance`: Get user balance
- `GET /payments/transactions`: Get transaction history

**Models**:
```python
class PaymentMethod(str, Enum):
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    CRYPTO = "crypto"
    BANK_TRANSFER = "bank_transfer"

class PaymentRequest(BaseModel):
    amount: float
    method: PaymentMethod
    currency: str = "USD"
```

**Example Usage**:
```bash
# Deposit
curl -X POST http://localhost:8000/payments/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.0,
    "method": "credit_card",
    "currency": "USD"
  }'

# Get balance
curl http://localhost:8000/payments/balance
```

**Development Notes**:
- Current implementation provides endpoint structure and models
- Stripe API integration, transaction validation, and fraud detection planned
- Withdrawal limits and verification to be added in future updates

### Casino Module

#### `backend/app/casino/__init__.py`

**Purpose**: Casino gaming functionality including game sessions and leaderboards.

**Features**:
- Start casino game sessions
- List available games
- Get leaderboard

**Endpoints**:
- `POST /casino/play`: Start a game session
- `GET /casino/games`: List available games
- `GET /casino/leaderboard`: Get top players

**Models**:
```python
class GameType(str, Enum):
    SLOTS = "slots"
    POKER = "poker"
    BLACKJACK = "blackjack"
    ROULETTE = "roulette"

class GameSession(BaseModel):
    game_type: GameType
    bet_amount: float
```

**Example Usage**:
```bash
# Play a game
curl -X POST http://localhost:8000/casino/play \
  -H "Content-Type: application/json" \
  -d '{
    "game_type": "slots",
    "bet_amount": 10.0
  }'

# List games
curl http://localhost:8000/casino/games
```

**Game Logic**:
- Each game type has minimum and maximum bets
- Results are randomly generated in current implementation
- Full game logic and odds calculation to be implemented
- Winnings calculated based on bet amount

### Machine Learning Module

#### `backend/app/ml/__init__.py`

**Purpose**: Machine learning predictions and model management.

**Features**:
- Generate predictions from input data
- List available ML models

**Endpoints**:
- `POST /ml/predict`: Generate prediction
- `GET /ml/models`: List available models

**Models**:
```python
class PredictionRequest(BaseModel):
    data: List[float]
    model_type: str = "default"

class PredictionResponse(BaseModel):
    prediction: float
    confidence: float
    model_used: str
```

**Example Usage**:
```bash
# Make prediction
curl -X POST http://localhost:8000/ml/predict \
  -H "Content-Type: application/json" \
  -d '{
    "data": [1.2, 3.4, 5.6, 7.8],
    "model_type": "default"
  }'
```

**Development Notes**:
- Current implementation provides endpoint structure
- ML model loading (PyTorch/scikit-learn) to be implemented
- Model versioning, caching, and batch prediction support planned

### Backend Dependencies

#### `backend/requirements.txt`

Key dependencies:
- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **pydantic**: Data validation
- **sqlalchemy**: Database ORM
- **numpy, pandas**: Data processing
- **torch, transformers**: ML frameworks
- **httpx**: Async HTTP client

---

## Web Documentation

### Web Structure

The web application is a Next.js 14+ application using the App Router pattern, located in `/web/`.

### Core Application Files

#### `web/app/page.tsx`

**Purpose**: Home page component.

**Features**:
- Landing page layout
- Main content display

**Example Structure**:
```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1>Welcome to TokyoIA</h1>
      {/* Page content */}
    </main>
  )
}
```

#### `web/app/layout.tsx`

**Purpose**: Root layout component wrapping all pages.

**Features**:
- Global HTML structure
- Common providers
- Shared header/footer

**Example Structure**:
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Providers */}
        {children}
      </body>
    </html>
  )
}
```

### Component Library

#### `web/components/Button.tsx`

**Purpose**: Reusable button component.

**Example Usage**:
```tsx
import { Button } from '@/components/Button'

function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked')}>
      Click Me
    </Button>
  )
}
```

#### `web/components/Header.tsx`

**Purpose**: Application header with navigation.

**Features**:
- Logo display
- Navigation menu
- User authentication status
- Mobile responsive

### Authentication Utilities

#### `web/lib/auth/middleware.ts`

**Purpose**: Authentication middleware for protecting routes.

**Key Functions**:

**`withAuth`**: Protect routes requiring authentication
```tsx
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return handler(request)
}
```

**`withSubscription`**: Check subscription tier
```tsx
export async function withSubscription(
  request: NextRequest,
  requiredTier: 'premium' | 'elite',
  handler: (request: NextRequest) => Promise<NextResponse>
)
```

**Usage Example**:
```tsx
// In API route
import { withAuth } from '@/lib/auth/middleware'

export async function GET(request: NextRequest) {
  return withAuth(request, async (req) => {
    // Protected route logic
    return NextResponse.json({ data: 'Protected data' })
  })
}
```

#### `web/lib/auth/utils.ts`

**Purpose**: Authentication helper functions.

**Common Functions**:
- Get current user
- Check user role
- Validate session

### Stripe Integration

#### `web/lib/stripe/server.ts`

**Purpose**: Server-side Stripe operations.

**Key Functions**:

**Create Checkout Session**:
```typescript
export async function createCheckoutSession({
  priceId,
  userId,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  priceId: string
  userId: string
  customerEmail: string
  successUrl: string
  cancelUrl: string
})
```

**Create Customer Portal Session**:
```typescript
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
)
```

**Usage Example**:
```tsx
import { createCheckoutSession } from '@/lib/stripe/server'

// In API route
const session = await createCheckoutSession({
  priceId: 'price_xxx',
  userId: user.id,
  customerEmail: user.email,
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
  cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
})
```

#### `web/lib/stripe/client.ts`

**Purpose**: Client-side Stripe operations.

**Features**:
- Load Stripe.js
- Client-side payment methods

### Supabase Integration

#### `web/lib/supabase/client.ts`

**Purpose**: Client-side Supabase client.

**Usage**:
```tsx
import { supabase } from '@/lib/supabase/client'

// In a component
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
```

#### `web/lib/supabase/server.ts`

**Purpose**: Server-side Supabase client for server components and API routes.

**Usage**:
```tsx
import { createClient } from '@/lib/supabase/server'

// In server component or API route
const supabase = createClient()
const { data } = await supabase.from('users').select('*')
```

#### `web/lib/supabase/queries.ts`

**Purpose**: Common database query functions.

**Example Functions**:
- `getUserById(id: string)`
- `getUserSubscription(userId: string)`
- `createTransaction(data: TransactionData)`

### Configuration Files

#### `web/config/site.config.ts`

**Purpose**: Site-wide configuration constants.

**Contents**:
```typescript
export const siteConfig = {
  name: "Local Premium Elite",
  description: "Premium subscription-based platform",
  url: process.env.NEXT_PUBLIC_APP_URL,
  // Other config values
}
```

#### `web/config/pricing.ts`

**Purpose**: Pricing tier definitions.

**Example Structure**:
```typescript
export const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    features: ['Feature 1', 'Feature 2'],
  },
  {
    name: 'Premium',
    price: 9.99,
    stripePriceId: 'price_xxx',
    features: ['All Free features', 'Feature 3'],
  },
  {
    name: 'Elite',
    price: 29.99,
    stripePriceId: 'price_yyy',
    features: ['All Premium features', 'Feature 4'],
  },
]
```

### Type Definitions

#### `web/types/database.ts`

**Purpose**: Database schema types from Supabase.

**Usage**:
```typescript
import { Database } from '@/types/database'

type User = Database['public']['Tables']['users']['Row']
```

#### `web/types/stripe.ts`

**Purpose**: Stripe-related type definitions.

#### `web/types/index.ts`

**Purpose**: General application types.

### Configuration Files

#### `web/next.config.js`

**Purpose**: Next.js configuration.

**Common Settings**:
- Image domains
- Environment variables
- Webpack config
- Redirects and rewrites

#### `web/vercel.json`

**Purpose**: Vercel deployment configuration.

**Key Settings**:
- Build commands
- Security headers
- Redirects
- Cron jobs

**Example**:
```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

#### `web/tsconfig.json`

**Purpose**: TypeScript configuration.

**Key Settings**:
- Path aliases (`@/` for root)
- Strict mode enabled
- JSX transform

#### `web/tailwind.config.js`

**Purpose**: Tailwind CSS configuration.

**Customizations**:
- Custom colors
- Font families
- Breakpoints
- Plugins

---

## Android Documentation

### Android Structure

The Android application is located in `/android/`.

#### `android/build.gradle`

**Purpose**: Project-level Gradle configuration.

**Contents**:
- Build script dependencies
- Plugin versions
- Repository configurations

#### `android/app/build.gradle`

**Purpose**: App-level build configuration.

**Key Settings**:
- Application ID
- Version code and name
- Minimum and target SDK versions
- Dependencies

**Example**:
```gradle
android {
    compileSdk 34
    
    defaultConfig {
        applicationId "com.tokyoia.app"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
        }
    }
}
```

---

## Development Workflows

### Backend Development Workflow

1. **Setup Environment**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Run Development Server**:
```bash
cd backend/app
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. **Test API Endpoints**:
```bash
# Visit auto-generated docs
open http://localhost:8000/docs
```

4. **Run Tests**:
```bash
cd backend
pytest
pytest --cov=app  # With coverage
```

5. **Format Code**:
```bash
black app/
isort app/
```

6. **Lint Code**:
```bash
flake8 app/
mypy app/
```

### Web Development Workflow

1. **Setup Environment**:
```bash
cd web
npm install
cp .env.example .env.local
# Edit .env.local with your values
```

2. **Run Development Server**:
```bash
npm run dev
# Open http://localhost:3000
```

3. **Type Check**:
```bash
npm run type-check
```

4. **Lint Code**:
```bash
npm run lint
npm run lint --fix  # Auto-fix
```

5. **Build for Production**:
```bash
npm run build
npm start  # Test production build
```

6. **Run Tests** (if configured):
```bash
npm test
```

### Android Development Workflow

1. **Open in Android Studio**:
   - File → Open → Select `android/` directory

2. **Sync Gradle**:
   - Tools → Android → Sync Project with Gradle Files

3. **Build APK**:
```bash
cd android
./gradlew assembleDebug
```

4. **Run on Device/Emulator**:
   - Click Run button in Android Studio
   - Or: `./gradlew installDebug`

5. **Run Tests**:
```bash
./gradlew test
```

### Full Stack Development Workflow

1. **Start All Services**:
```bash
# Terminal 1: Backend
cd backend/app && uvicorn main:app --reload

# Terminal 2: Web
cd web && npm run dev

# Terminal 3: Android (optional)
cd android && ./gradlew installDebug
```

2. **Make Changes**:
   - Edit code in respective directories
   - Both backend and web support hot reload

3. **Test Integration**:
   - Web calls backend API
   - Android calls backend API
   - Verify end-to-end functionality

---

## Environment Variables

### Required Environment Variables by Component

#### Backend
```bash
# Required
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_KEY=...
STRIPE_SECRET_KEY=sk_...

# Optional
ALLOWED_ORIGINS=http://localhost:3000
DEBUG=true
JWT_SECRET=...
ML_MODELS_PATH=/app/models
```

#### Web
```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Android
```properties
# local.properties
sdk.dir=/path/to/android/sdk

# gradle.properties or environment
API_BASE_URL=http://10.0.2.2:8000  # For Android emulator
STRIPE_PUBLISHABLE_KEY=pk_...
```

### Environment Variable Sources

- Development: `.env.local`, `.env.example`
- Production: Set in hosting platform (Vercel, AWS, etc.)
- CI/CD: GitHub Secrets

---

## API Documentation

The backend provides auto-generated API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

---

## Navigation

- [Main Documentation](README.md)
- [Repository Structure](STRUCTURE.md)
- [Architecture](ARCHITECTURE.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](DEPLOYMENT.md)
